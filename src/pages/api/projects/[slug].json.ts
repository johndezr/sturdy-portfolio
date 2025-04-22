import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map((project) => ({
    params: { slug: project.data.slug },
  }));
}

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;

  if (!slug) {
    return new Response(
      JSON.stringify({
        error: 'Slug is required',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  try {
    // Get all projects and find the matching one
    const allProjects = await getCollection('projects');
    const project = allProjects.find((p) => p.id === slug);

    if (!project) {
      return new Response(
        JSON.stringify({
          error: 'Project not found',
          debug: `Requested slug: ${slug}`,
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        ...project.data,
        slug: project.slug,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        debug: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
