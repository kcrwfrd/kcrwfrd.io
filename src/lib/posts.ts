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
  console.log('[getAllPostSlugs] Reading posts from:', postsDirectory)

  if (!fs.existsSync(postsDirectory)) {
    console.log('[getAllPostSlugs] Posts directory does not exist')
    return []
  }

  const entries = fs.readdirSync(postsDirectory, { withFileTypes: true })
  console.log('[getAllPostSlugs] Found entries:', entries.length)

  const slugs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)

  console.log('[getAllPostSlugs] Returning slugs:', slugs)
  return slugs
}

/**
 * Get metadata for all posts
 */
export async function getAllPosts(): Promise<Post[]> {
  console.log('[getAllPosts] Starting to fetch all posts')
  const slugs = getAllPostSlugs()
  console.log('[getAllPosts] Fetching metadata for slugs:', slugs)

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const metadata = await getPostMetadata(slug)
      return { slug, metadata }
    }),
  )

  console.log('[getAllPosts] Fetched posts:', posts.length)

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    return (
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    )
  })

  console.log('[getAllPosts] Sorted posts:', sortedPosts.map(p => `${p.slug} (${p.metadata.date})`))
  return sortedPosts
}

/**
 * Get metadata for a specific post
 */
export async function getPostMetadata(slug: string): Promise<PostMetadata> {
  console.log('[getPostMetadata] Fetching metadata for slug:', slug)
  const { metadata } = await import(`@/../posts/${slug}/index.mdx`)
  console.log('[getPostMetadata] Retrieved metadata:', metadata)
  return metadata
}

/**
 * Check if a post exists
 */
export function postExists(slug: string): boolean {
  const postPath = path.join(postsDirectory, slug, 'index.mdx')
  const exists = fs.existsSync(postPath)
  console.log('[postExists] Checking if post exists:', { slug, postPath, exists })
  return exists
}
