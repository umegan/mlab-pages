#!/usr/bin/env node

/**
 * Import publications from CSV and create:
 * features/achievements/data/publications/YYYY/pub-XXX/metadata.json
 *
 * Usage:
 *   node scripts/importPublicationsFromCsv.mjs
 *   node scripts/importPublicationsFromCsv.mjs research_data.csv
 *   node scripts/importPublicationsFromCsv.mjs --csv research_data.csv --dry-run
 *   node scripts/importPublicationsFromCsv.mjs --csv research_data.csv --draft
 */

import { promises as fs } from 'fs';
import { join, resolve } from 'path';

const REQUIRED_HEADERS = {
  title: '標題',
  authors: '著者・共著者',
  venue: '掲載誌名',
  date: '発行・発表の年月',
  kind: '形態種別',
};

function normalizeHeader(value) {
  return value.replace(/^\uFEFF/, '').trim();
}

function parseArgs(argv) {
  let csvPath = 'research_data.csv';
  let dryRun = false;
  let asDraft = false;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === '--dry-run') {
      dryRun = true;
      continue;
    }
    if (arg === '--draft') {
      asDraft = true;
      continue;
    }
    if (arg === '--csv' && i + 1 < argv.length) {
      csvPath = argv[i + 1];
      i += 1;
      continue;
    }
    if (arg.startsWith('--csv=')) {
      csvPath = arg.slice('--csv='.length);
      continue;
    }
    if (!arg.startsWith('--')) {
      csvPath = arg;
    }
  }

  return { csvPath, dryRun, asDraft };
}

function parseCsv(content) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  const text = content.replace(/\r\n/g, '\n');
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];

    if (ch === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === ',' && !inQuotes) {
      row.push(field);
      field = '';
      continue;
    }

    if (ch === '\n' && !inQuotes) {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      continue;
    }

    field += ch;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function buildHeaderIndex(headerRow) {
  const index = new Map();
  headerRow.forEach((value, i) => {
    index.set(normalizeHeader(value), i);
  });
  return index;
}

function extractYear(dateValue) {
  const match = dateValue.match(/(19|20)\d{2}/);
  if (!match) return null;
  return Number.parseInt(match[0], 10);
}

function mapPublicationType(kindValue) {
  const value = kindValue.trim();

  if (value.includes('学術論文') || value.includes('論文誌')) return 'journal';
  if (value.includes('国際会議') || value.includes('国内会議') || value.includes('会議')) return 'conference';
  if (value.includes('ワークショップ')) return 'workshop';
  if (value.includes('学位') || value.includes('博士') || value.includes('修士')) return 'thesis';

  const lower = value.toLowerCase();
  if (lower.includes('journal')) return 'journal';
  if (lower.includes('conference')) return 'conference';
  if (lower.includes('workshop')) return 'workshop';
  if (lower.includes('thesis')) return 'thesis';

  return 'conference';
}

function validateHeaders(indexMap) {
  const missing = Object.values(REQUIRED_HEADERS).filter((name) => !indexMap.has(name));
  if (missing.length > 0) {
    throw new Error(`Missing required CSV headers: ${missing.join(', ')}`);
  }
}

function rowValue(row, indexMap, headerName) {
  const idx = indexMap.get(headerName);
  if (idx === undefined) return '';
  return (row[idx] ?? '').trim();
}

function toMetadataRows(rows, headerIndex, asDraft) {
  const results = [];

  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i];
    if (!row || row.length === 0 || row.every((v) => !String(v).trim())) {
      continue;
    }

    const title = rowValue(row, headerIndex, REQUIRED_HEADERS.title);
    const authors = rowValue(row, headerIndex, REQUIRED_HEADERS.authors);
    const venue = rowValue(row, headerIndex, REQUIRED_HEADERS.venue);
    const dateRaw = rowValue(row, headerIndex, REQUIRED_HEADERS.date);
    const kindRaw = rowValue(row, headerIndex, REQUIRED_HEADERS.kind);
    const year = extractYear(dateRaw);

    if (!title || !authors || !venue || !year || !kindRaw) {
      throw new Error(`Row ${i + 1} has missing required values`);
    }

    const metadata = {
      title,
      authors,
      venue,
      year,
      type: mapPublicationType(kindRaw),
      ...(asDraft ? { draft: true } : {}),
    };

    results.push(metadata);
  }

  return results;
}

async function pathExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}

async function collectExistingPublicationIds(baseDir) {
  const ids = new Set();
  let topLevelEntries = [];

  try {
    topLevelEntries = await fs.readdir(baseDir, { withFileTypes: true });
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return ids;
    }
    throw error;
  }

  for (const entry of topLevelEntries) {
    if (!entry.isDirectory()) continue;

    const topLevelPath = join(baseDir, entry.name);
    if (await pathExists(join(topLevelPath, 'metadata.json'))) {
      ids.add(entry.name);
      continue;
    }

    const nestedEntries = await fs.readdir(topLevelPath, { withFileTypes: true });
    for (const nestedEntry of nestedEntries) {
      if (!nestedEntry.isDirectory()) continue;
      const nestedPath = join(topLevelPath, nestedEntry.name);
      if (await pathExists(join(nestedPath, 'metadata.json'))) {
        ids.add(nestedEntry.name);
      }
    }
  }

  return ids;
}

function nextPublicationNumber(existingIds) {
  let maxId = 0;
  for (const id of existingIds) {
    const match = id.match(/^pub-(\d+)$/);
    if (!match) continue;
    const numericId = Number.parseInt(match[1], 10);
    if (numericId > maxId) maxId = numericId;
  }
  return maxId + 1;
}

function publicationIdFromNumber(number) {
  return `pub-${String(number).padStart(3, '0')}`;
}

async function main() {
  try {
    const { csvPath, dryRun, asDraft } = parseArgs(process.argv.slice(2));
    const absoluteCsvPath = resolve(process.cwd(), csvPath);
    const publicationsDir = resolve(
      process.cwd(),
      'features',
      'achievements',
      'data',
      'publications',
    );

    const csvContent = await fs.readFile(absoluteCsvPath, 'utf8');
    const rows = parseCsv(csvContent);
    if (rows.length === 0) {
      throw new Error(`CSV is empty: ${absoluteCsvPath}`);
    }

    const headerIndex = buildHeaderIndex(rows[0]);
    validateHeaders(headerIndex);
    const metadataRows = toMetadataRows(rows, headerIndex, asDraft);

    await fs.mkdir(publicationsDir, { recursive: true });
    const existingIds = await collectExistingPublicationIds(publicationsDir);
    let nextNumber = nextPublicationNumber(existingIds);
    const planned = [];

    for (const metadata of metadataRows) {
      let id = publicationIdFromNumber(nextNumber);
      while (existingIds.has(id)) {
        nextNumber += 1;
        id = publicationIdFromNumber(nextNumber);
      }

      const targetDir = join(publicationsDir, String(metadata.year), id);
      planned.push({ id, targetDir, metadata });
      existingIds.add(id);
      nextNumber += 1;
    }

    if (dryRun) {
      console.log(`Dry run: ${planned.length} publications will be created from ${absoluteCsvPath}`);
      for (const item of planned) {
        console.log(`- ${item.id} (${item.metadata.year}): ${item.metadata.title}`);
      }
      return;
    }

    for (const item of planned) {
      await fs.mkdir(item.targetDir, { recursive: true });
      await fs.writeFile(
        join(item.targetDir, 'metadata.json'),
        `${JSON.stringify(item.metadata, null, 2)}\n`,
        'utf8',
      );
    }

    console.log(`Created ${planned.length} publications from ${absoluteCsvPath}`);
    console.log(`Destination: ${publicationsDir}`);
    if (asDraft) {
      console.log('All created metadata include "draft": true');
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
