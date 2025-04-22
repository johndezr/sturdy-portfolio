export interface Project {
  title: string;
  description: string;
  github?: string;
  link?: string;
  technologies: string[];
  slug: string;
  image?: string;
}

export interface ProjectError {
  message: string;
  code: 'NOT_FOUND' | 'FETCH_ERROR' | 'INVALID_DATA';
}
