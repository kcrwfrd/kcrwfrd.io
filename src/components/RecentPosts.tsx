type Post = {
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
}

type RecentPostsProps = {
  posts: Post[]
}

export default function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <section className="py-16 md:py-24">
      <h3 className="mb-12 font-display text-2xl font-semibold text-foreground md:text-3xl">
        Recent Writing
      </h3>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
        {posts.map((post, index) => (
          <article key={index} className="group">
            <div className="mb-4 flex items-center gap-3 text-xs font-medium text-foreground-muted md:text-sm">
              <span className="text-accent">{post.category}</span>
              <span className="text-border">•</span>
              <time>{post.date}</time>
            </div>

            <h4 className="mb-4 font-display text-2xl font-semibold leading-tight text-foreground transition-colors group-hover:text-accent md:text-3xl">
              <a href="#">{post.title}</a>
            </h4>

            <p className="mb-6 font-light leading-relaxed text-foreground-muted">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground-muted">
                {post.readTime}
              </span>
              <a
                href="#"
                className="text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                Read more →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
