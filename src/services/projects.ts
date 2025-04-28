import type { Project, ProjectError } from '@/types/project';
import {
  projectStore,
  cacheProject,
  setProjectError,
  setLoading,
  clearProjectError,
} from '@/stores/projects';

export class ProjectService {
  static async getProject(slug: string): Promise<Project> {
    // Check cache first
    const cached = projectStore.get().projects[slug];
    if (cached) {
      return cached;
    }

    setLoading(true);
    clearProjectError();

    try {
      const response = await fetch(`/api/projects/${slug}.json`);

      if (!response.ok) {
        const error: ProjectError = {
          message: 'Failed to fetch project data',
          code: 'FETCH_ERROR',
        };

        if (response.status === 404) {
          error.code = 'NOT_FOUND';
          error.message = `Project ${slug} not found`;
        }

        throw error;
      }

      const project = await response.json();
      console.log(project);

      cacheProject(project);
      return project;
    } catch (error) {
      const projectError: ProjectError =
        error instanceof Error
          ? { message: error.message, code: 'FETCH_ERROR' }
          : (error as ProjectError);

      setProjectError(projectError);
      throw projectError;
    } finally {
      setLoading(false);
    }
  }
}
