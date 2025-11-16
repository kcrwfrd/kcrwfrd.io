export default function Home() {
  const featuredPost = {
    title: 'On the Nature of Time and Memory',
    excerpt:
      'An exploration of how our perception of time shapes the stories we tell ourselves, and how memory becomes the architecture of identity.',
    date: 'March 15, 2024',
    readTime: '12 min read',
    category: 'Essay',
  }

  const recentPosts = [
    {
      title: 'The Silence Between Notes',
      excerpt:
        'What jazz taught me about the spaces we leave unfilled, and why restraint is the highest form of expression.',
      date: 'March 8, 2024',
      readTime: '8 min read',
      category: 'Reflection',
    },
    {
      title: 'Walking Through Cities at Dawn',
      excerpt:
        'There is something about the early morning light that reveals a city in its most honest state, before the performance begins.',
      date: 'February 28, 2024',
      readTime: '6 min read',
      category: 'Travel',
    },
    {
      title: 'The Art of Slow Reading',
      excerpt:
        'In an age of information overload, returning to the deliberate pace of deep reading feels like an act of rebellion.',
      date: 'February 18, 2024',
      readTime: '10 min read',
      category: 'Literature',
    },
  ]

  return (
    <main className="mx-auto max-w-4xl px-5">
      {/* Featured Article */}
      <article className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-3 text-sm font-medium text-foreground-muted">
            <span className="text-accent">{featuredPost.category}</span>
            <span className="text-border">•</span>
            <time>{featuredPost.date}</time>
            <span className="text-border">•</span>
            <span>{featuredPost.readTime}</span>
          </div>

          <h2 className="mb-8 font-display text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {featuredPost.title}
          </h2>

          <p className="mb-12 max-w-2xl font-light text-xl leading-relaxed text-foreground-muted md:text-2xl md:leading-relaxed">
            {featuredPost.excerpt}
          </p>

          <a
            href="#"
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
          </a>
        </div>
      </article>

      {/* Newsletter Section */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="mb-4 font-display text-3xl font-semibold text-foreground md:text-4xl">
            Subscribe to the Journal
          </h3>
          <p className="mb-8 font-light text-lg leading-relaxed text-foreground-muted">
            Receive new essays and reflections directly in your inbox. No spam,
            just thoughtful writing.
          </p>
          <form className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-sm border border-border bg-surface px-6 py-4 text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
            <button
              type="submit"
              className="rounded-sm bg-foreground px-8 py-4 font-medium text-background transition-all hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
