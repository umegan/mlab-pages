import type { ResearchProject } from '../types';

type ResearchProjectModule = { default: ResearchProject };

const projectModules = import.meta.glob('./published/*/index.ts', {
  eager: true,
}) as Record<string, ResearchProjectModule>;

export const researchProjects: ResearchProject[] = Object.values(projectModules)
  .map((moduleValue) => moduleValue.default)
  .sort((a, b) => {
    const orderDiff = (a.sortOrder ?? Number.MAX_SAFE_INTEGER) - (b.sortOrder ?? Number.MAX_SAFE_INTEGER);
    if (orderDiff !== 0) return orderDiff;
    return a.title.localeCompare(b.title, 'ja');
  });

const projectIdSet = new Set<string>();
for (const project of researchProjects) {
  if (projectIdSet.has(project.id)) {
    throw new Error(`Duplicate research project ID: '${project.id}'`);
  }
  projectIdSet.add(project.id);
}

export function getResearchProjectById(id: string): ResearchProject | undefined {
  return researchProjects.find((project) => project.id === id);
}
