import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default async function Home() {
  const allPosts = await getAllPosts()

  return (
    <main className="w-full mx-auto max-w-4xl px-5">
      {allPosts.map(({ slug, metadata }) => (
        <Post
          key={slug}
          post={{
            title: metadata.title,
            excerpt: metadata.excerpt,
            date: new Date(metadata.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            category: metadata.tags[0] || 'Article',
          }}
          slug={slug}
        />
      ))}
    </main>
  )
}

type Post = {
  title: string
  excerpt: string
  date: string
  category: string
}

function Post({
  post: { title, excerpt, date, category },
  slug,
}: {
  post: Post
  slug: string
}) {
  return (
    <article className="border-b border-border last:border-none py-16 md:py-24">
      <div className="mb-6 flex items-center gap-3 text-sm font-medium text-foreground-muted">
        <time>{date}</time>
        <span className="text-border">•</span>
        <span className="text-accent">{category}</span>
      </div>

      <h2 className="mb-8 font-display text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
        <Link className="hover:text-accent" href={`/posts/${slug}`}>
          {title}
        </Link>
      </h2>

      <p className="mb-12 max-w-2xl font-light text-xl leading-relaxed text-foreground-muted md:text-2xl md:leading-relaxed">
        {excerpt}
      </p>

      <Link
        href={`/posts/${slug}`}
        className="inline-flex items-center gap-2 font-display text-lg font-medium text-foreground transition-colors hover:text-accent"
      >
        Read article
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
    </article>
  )
}
