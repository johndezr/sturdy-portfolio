import { atom } from 'nanostores';
import type { Project, ProjectError } from '@/types/project';

interface ProjectState {
  projects: Record<string, Project>;
  error: ProjectError | null;
  loading: boolean;
}

const initialState: ProjectState = {
  projects: {},
  error: null,
  loading: false,
};

export const projectStore = atom<ProjectState>(initialState);
export const selectedProject = atom<Project | null>(null);
export const openProjectDialog = atom<boolean>(false);

export const setProjectError = (error: ProjectError) => {
  projectStore.set({
    ...projectStore.get(),
    error,
  });
};

export const clearProjectError = () => {
  projectStore.set({
    ...projectStore.get(),
    error: null,
  });
};

export const setLoading = (loading: boolean) => {
  projectStore.set({
    ...projectStore.get(),
    loading,
  });
};

export const cacheProject = (project: Project) => {
  const currentState = projectStore.get();
  projectStore.set({
    ...currentState,
    projects: {
      ...currentState.projects,
      [project.slug]: project,
    },
  });
};
