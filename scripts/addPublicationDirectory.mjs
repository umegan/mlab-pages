#!/usr/bin/env node

/**
 * Add Publication Script (Directory-based)
 * Usage:
 *   node scripts/addPublicationDirectory.mjs
 */

import { createInterface } from 'readline';
import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const PUBLICATION_TYPES = ['journal', 'conference', 'workshop', 'thesis'];

async function ensureDirectoryDoesNotExist(dirPath, id) {
  try {
    await fs.access(dirPath);
    throw new Error(`Directory already exists for ID '${id}'. Choose another ID.`);
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return;
    }
    throw error;
  }
}

async function ensurePublicationIdIsUnique(baseDir, id) {
  let entries = [];
  try {
    entries = await fs.readdir(baseDir, { withFileTypes: true });
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return;
    }
    throw error;
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    if (entry.name === id) {
      throw new Error(`Directory already exists for ID '${id}'. Choose another ID.`);
    }

    const nestedPath = join(baseDir, entry.name, id);
    try {
      await fs.access(nestedPath);
      throw new Error(`Directory already exists for ID '${id}'. Choose another ID.`);
    } catch (error) {
      if (error && error.code === 'ENOENT') {
        continue;
      }
      throw error;
    }
  }
}

async function main() {
  console.log('\nAdd Publication Tool\n');
  console.log('----------------------------------------------\n');

  try {
    const idInput = await question('ID (e.g. pub-009): ');
    const id = idInput.trim();
    if (!id) {
      throw new Error('ID is required');
    }

    const title = (await question('Paper title: ')).trim();
    if (!title) {
      throw new Error('Title is required');
    }

    const authors = (await question('Authors (comma separated): ')).trim();
    if (!authors) {
      throw new Error('Authors are required');
    }

    const venue = (await question('Venue (conference/journal): ')).trim();
    if (!venue) {
      throw new Error('Venue is required');
    }

    const yearInput = (await question('Year (e.g. 2024): ')).trim();
    const year = Number.parseInt(yearInput, 10);
    if (Number.isNaN(year) || year < 1900 || year > 2100) {
      throw new Error('Invalid year');
    }

    console.log('\nPublication type:');
    PUBLICATION_TYPES.forEach((type, index) => {
      console.log(`  ${index + 1}. ${type}`);
    });

    const typeIndexInput = (await question('Select number (1-4): ')).trim();
    const type = PUBLICATION_TYPES[Number.parseInt(typeIndexInput, 10) - 1];
    if (!type) {
      throw new Error('Invalid publication type');
    }

    const doi = (await question('DOI (optional): ')).trim();
    const arxiv = (await question('arXiv ID (optional): ')).trim();
    const abstract = (await question('Abstract (optional): ')).trim();

    const tagsInput = (await question('Tech tags (comma separated, optional): ')).trim();
    const tags = tagsInput
      ? tagsInput.split(',').map((tag) => tag.trim()).filter(Boolean)
      : undefined;

    const project = (await question('Project (optional): ')).trim();
    const code_url = (await question('Code URL (optional): ')).trim();
    const data_url = (await question('Data URL (optional): ')).trim();
    const video = (await question('Video URL (optional): ')).trim();
    const award = (await question('Award (optional): ')).trim();

    const draftInput = (await question('Save as draft? (y/N): ')).trim().toLowerCase();
    const draft = draftInput === 'y' || draftInput === 'yes' ? true : undefined;

    const metadata = {
      title,
      authors,
      venue,
      year,
      type,
      ...(doi && { doi }),
      ...(arxiv && { arxiv }),
      ...(abstract && { abstract }),
      ...(tags && tags.length > 0 && { tags }),
      ...(project && { project }),
      ...(code_url && { code_url }),
      ...(data_url && { data_url }),
      ...(video && { video }),
      ...(award && { award }),
      ...(draft && { draft }),
    };

    const publicationsRootDir = join(__dirname, '..', 'features', 'achievements', 'data', 'publications');
    await fs.mkdir(publicationsRootDir, { recursive: true });
    await ensurePublicationIdIsUnique(publicationsRootDir, id);

    const pubDir = join(publicationsRootDir, String(year), id);
    await ensureDirectoryDoesNotExist(pubDir, id);
    await fs.mkdir(pubDir, { recursive: true });

    const metadataPath = join(pubDir, 'metadata.json');
    await fs.writeFile(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`, 'utf8');

    console.log('\nPublication created successfully.\n');
    console.log(`Directory: ${pubDir}`);
    console.log(`Metadata: ${metadataPath}\n`);
    console.log('Next step:');
    console.log('1. Edit metadata.json if needed.');
    console.log('2. Place files (paper/slides/poster) in the same directory if needed.');
    console.log('3. loader.ts updates are automatic.\n');
  } catch (error) {
    console.error(`\nError: ${error.message}`);
  } finally {
    rl.close();
  }
}

main();
