import { notFound } from 'next/navigation'
import { getAllPostSlugs, getPostMetadata } from '@/lib/posts'

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const metadata = await getPostMetadata(slug)

  return {
    title: metadata.title,
    description: metadata.excerpt,
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  try {
    // Dynamically import the MDX file
    const { default: Post, metadata } = await import(
      `@/../posts/${slug}/index.mdx`
    )

    return (
      <article className="mx-auto w-full max-w-4xl px-5">
        {/* Post Header */}
        <header className="mb-12 border-b border-border pb-8">
          <div className="mb-6 flex items-center gap-3 text-sm font-medium text-foreground-muted">
            <time>
              {new Date(metadata.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {metadata.tags && metadata.tags.length > 0 && (
              <>
                <span className="text-border">•</span>
                <span className="text-accent">{metadata.tags[0]}</span>
              </>
            )}
          </div>

          <h1 className="mb-8 font-display text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {metadata.title}
          </h1>

          {metadata.excerpt && (
            <p className="max-w-2xl font-light text-xl leading-relaxed text-foreground-muted md:text-2xl md:leading-relaxed">
              {metadata.excerpt}
            </p>
          )}
        </header>

        {/* Post Content */}
        <div className="prose-custom">
          <Post />
        </div>
      </article>
    )
  } catch (error) {
    notFound()
  }
}
