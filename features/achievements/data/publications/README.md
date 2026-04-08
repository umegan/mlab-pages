# Publications Directory

Each publication is stored as one directory under this path.

## Structure

```text
publications/
  pub-001/
    metadata.json
    paper.pdf        (optional)
    slides.pdf       (optional)
    poster.jpg       (optional)
    bibtex.bib       (optional)
    README.md
  pub-002/
    ...
```

## Required File

- `metadata.json`

## Add a New Publication

1. Create a new directory (for example: `pub-009`) under `features/achievements/data/publications/`.
2. Add `metadata.json` with required fields.
3. Optionally add files such as `paper.pdf`, `slides.pdf`, `poster.jpg`, `bibtex.bib`.

The achievements page is updated automatically by `features/achievements/data/loader.ts`.
You do not need to edit `loader.ts` manually.

## Optional CLI

```bash
node scripts/addPublicationDirectory.mjs
```

This command creates the directory and `metadata.json` interactively.
