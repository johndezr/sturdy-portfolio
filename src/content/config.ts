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
  loader: file('src/content/jobs.json'),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    description: z.string(),
    date: z.string(),
    technologies: z.array(z.string()),
    order: z.number().default(0),
    features: z.array(z.string()),
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

const articles = defineCollection({
  loader: file('src/content/articles.json'),
  schema: z.object({
    title: z.string(),
    link: z.string(),
  }),
});

const bookshelf = defineCollection({
  loader: file('src/content/bookshelf.json'),
  schema: z.object({
    title: z.string(),
    cover: z.string(),
    author: z.string(),
    caption: z.string(),
  }),
});

export const collections = {
  projects: projects,
  jobs: jobs,
  courses: courses,
  articles: articles,
  bookshelf: bookshelf,
};
