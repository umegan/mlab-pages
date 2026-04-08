# Claude Agent Memo — Matsuoka Lab Website

## Project Overview

Research lab website for the Robot Vision and Spatial AI (Matsuoka) Laboratory. A React + TypeScript SPA built with Vite, Tailwind CSS v4, and shadcn/ui. Bilingual (Japanese primary, English secondary). No backend — all data is hardcoded.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 18 |
| Language | TypeScript (strict) |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 + custom CSS vars |
| Animations | `motion/react` (formerly Framer Motion) |
| Components | shadcn/ui (40+ primitives in `components/ui/`) |
| Icons | `lucide-react` |

### Design Tokens (hardcoded hex — do not use CSS vars for these)
- Background (cream): `#F9F5F0`
- Secondary (beige): `#F2EAD3`
- Primary text/border (dark green): `#344F1F`
- Accent/CTA (orange): `#F4991A`

---

## Project Structure

```
App.tsx                            # Root — state-based routing
features/
  home/components/                 # Hero, ResearchAxes, FutureLab, NewsModern
  about/                           # AboutPage.tsx
  news/
    data/loader.ts                 # ← Edit this to add/modify news data
    data/items/news-XXX/           # Per-item directories (metadata.json + images)
    types.ts                       # NewsItem, NewsMetadata, NewsCategory
    NewsPage.tsx
  achievements/
    data/loader.ts                 # ← Edit this to add/modify publications
    data/publications/pub-XXX/     # Per-item directories
    types.ts                       # Publication, PublicationType
    AchievementsPage.tsx
  members/
    data/membersData.ts            # ← Edit this to add/modify members
    types.ts                       # Member, MemberRole
    MembersPage.tsx
  research/ResearchPage.tsx
  contact/ContactPage.tsx
components/
  layout/Navbar.tsx                # Receives onNavigate + currentPage props
  layout/Footer.tsx
  ui/                              # shadcn/ui primitives
  common/ImageWithFallback.tsx
styles/globals.css                 # Tailwind v4 theme
scripts/
  addNewsDirectory.mjs             # Interactive CLI to scaffold news entries
  addPublicationDirectory.mjs      # Interactive CLI to scaffold publications
guidelines/                        # 15+ markdown dev guides
```

---

## Routing

**Not URL-based.** Routing is a `useState` + `switch` in `App.tsx`:

```tsx
const [currentPage, setCurrentPage] = useState('home');
// Pages: 'home' | 'about' | 'news' | 'research' | 'achievements' | 'members' | 'contact'
```

Both `Navbar` and `Footer` receive `onNavigate` callback to change page. There is no React Router or browser history integration.

---

## Data Patterns

### News
- Source of truth: `features/news/data/loader.ts` — a hardcoded `Record<string, NewsMetadata>` map
- Directory `data/items/news-XXX/` holds `metadata.json` (backup) and images
- Categories: `'Publication' | 'Event' | 'Award' | 'Press' | 'Recruit' | 'Other'`
- Loader API: `getAllNews()`, `getNewsById(id)`, `getNewsByCategory(cat)`, `getNewsByTag(tag)`, `getNewsByYear(year)`

### Publications
- Source of truth: `features/achievements/data/loader.ts`
- Directory `data/publications/pub-XXX/` holds `metadata.json`, optional PDF, slides, poster
- Types: `'journal' | 'conference' | 'workshop' | 'thesis'`
- Loader API: `getAllPublications()`, `filterByYear()`, `filterByTags()`, `filterByType()`, `getAwardPublications()`

### Members
- Source of truth: `features/members/data/membersData.ts` — a simple TypeScript array
- Roles: `'professor' | 'postdoc' | 'doctor' | 'master' | 'bachelor' | 'alumni'`

**Rule:** When adding data, update `loader.ts` (news/achievements) or `membersData.ts` (members). The CLI scripts scaffold directories but still require manual updates to the loader.

---

## Key Conventions

### Animation pattern (use consistently)
```tsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
>
```

### Component state pattern
- Local `useState` for UI state (filters, search, open/closed)
- `useMemo` for derived/filtered lists
- No global state (no Redux, Zustand, Context)

### Page component structure
1. Import data loader functions
2. `useState` for filter/search state
3. `useMemo` for filtered results
4. Render filters UI + content

### Navigation props (layout components)
```tsx
<Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
<Footer onNavigate={setCurrentPage} />
```

---

## Dev Commands

```bash
npm run dev          # Dev server at http://localhost:5173 (Vite HMR)
npm run build        # Production build → dist/
npm run preview      # Serve production build locally
npm run lint         # ESLint
npm run type-check   # TypeScript check

# Data scaffolding CLIs
node scripts/addNewsDirectory.mjs
node scripts/addPublicationDirectory.mjs
```

---

## Known Gaps / TODOs

- Contact form submission is not implemented (alert placeholder only)
- No URL-based routing — browser back/forward and direct links do not work
- Images use Unsplash placeholder URLs; no image optimization layer
- `components/sections/` and `components/figma/` contain legacy/deprecated components
- `FILES_TO_DELETE.md` lists files pending removal

---

## Files to Read First for Any Task

| Goal | File |
|------|------|
| Understand routing | `App.tsx` |
| Add/edit news | `features/news/data/loader.ts`, `features/news/types.ts` |
| Add/edit publications | `features/achievements/data/loader.ts`, `features/achievements/types.ts` |
| Add/edit members | `features/members/data/membersData.ts` |
| Change global theme | `styles/globals.css` |
| Change navigation | `components/layout/Navbar.tsx` |
| Understand a page | `features/<name>/<Name>Page.tsx` |
