export interface Post {
  title: string;
  slug: string;
  pubDate: string;
  image: string;
  tags: string[];
  description: string;
  excerpt: string;
  status: 'draft' | 'done';
}
