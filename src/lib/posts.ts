import fs from 'node:fs'
import path from 'node:path'

const postsDirectory = path.join(process.cwd(), 'posts')

export type PostMetadata = {
  title: string
  date: string
  excerpt: string
  tags: string[]
}

export type Post = {
  slug: string
  metadata: PostMetadata
}

/**
 * Get all post slugs from the posts directory
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const entries = fs.readdirSync(postsDirectory, { withFileTypes: true })

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
}

/**
 * Get metadata for all posts
 */
export async function getAllPosts(): Promise<Post[]> {
  const slugs = getAllPostSlugs()

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const metadata = await getPostMetadata(slug)
      return { slug, metadata }
    }),
  )

  // Sort posts by date (newest first)
  return posts.sort((a, b) => {
    return (
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    )
  })
}

/**
 * Get metadata for a specific post
 */
export async function getPostMetadata(slug: string): Promise<PostMetadata> {
  const { metadata } = await import(`@/../posts/${slug}/index.mdx`)
  return metadata
}

/**
 * Check if a post exists
 */
export function postExists(slug: string): boolean {
  const postPath = path.join(postsDirectory, slug, 'index.mdx')
  return fs.existsSync(postPath)
}
