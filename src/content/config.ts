import { z, defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      github: z.string().optional(),
      link: z.string().optional(),
      technologies: z.array(z.string()),
      content: z.string().optional(),
      status: z.string(),
      featured: z.boolean().default(false),
      slug: z.string(),
      loom: z.string().optional(),
      logo: image(),
      image: z.string().optional(),
    }),
});

const jobs = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/content/jobs' }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    description: z.string(),
    date: z.string(),
    technologies: z.array(z.string()),
    order: z.number().default(0),
  }),
});

const courses = defineCollection({
  loader: file('src/content/courses.json'),
  schema: z.object({
    title: z.string(),
    year: z.string(),
    status: z.string(),
    technologies: z.array(z.string()),
    school: z.string(),
    certificationUrl: z.string().optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/content/posts' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.string(),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  projects: projects,
  jobs: jobs,
  courses: courses,
};
