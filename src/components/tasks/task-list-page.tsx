import Link from 'next/link'
import { ArrowRight, Building2, FileText, Image as ImageIcon, LayoutGrid, Newspaper, Tag, User } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { TASK_LIST_PAGE_OVERRIDE_ENABLED, TaskListPageOverride } from '@/overrides/task-list-page'

const taskIcons: Record<TaskKey, any> = {
  listing: Building2,
  article: FileText,
  image: ImageIcon,
  profile: User,
  classified: Tag,
  sbm: LayoutGrid,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantShells = {
  'listing-directory': 'bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_24%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]',
  'listing-showcase': 'bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_100%)]',
  'article-editorial':
    'bg-[radial-gradient(circle_at_18%_0%,rgba(232,243,241,0.9),transparent_42%),linear-gradient(180deg,#ffffff_0%,#f4faf8_100%)]',
  'article-journal': 'bg-[linear-gradient(180deg,#fffdf9_0%,#f7f1ea_100%)]',
  'image-masonry': 'bg-[linear-gradient(180deg,#09101d_0%,#111c2f_100%)] text-white',
  'image-portfolio': 'bg-[linear-gradient(180deg,#07111f_0%,#13203a_100%)] text-white',
  'profile-creator': 'bg-[linear-gradient(180deg,#0a1120_0%,#101c34_100%)] text-white',
  'profile-business': 'bg-[linear-gradient(180deg,#f6fbff_0%,#ffffff_100%)]',
  'classified-bulletin': 'bg-[linear-gradient(180deg,#edf3e4_0%,#ffffff_100%)]',
  'classified-market': 'bg-[linear-gradient(180deg,#f4f6ef_0%,#ffffff_100%)]',
  'sbm-curation': 'bg-[linear-gradient(180deg,#fff7ee_0%,#ffffff_100%)]',
  'sbm-library': 'bg-[linear-gradient(180deg,#f7f8fc_0%,#ffffff_100%)]',
} as const

function getArticleCardImage(post: SitePost) {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : null
  const images = content && Array.isArray(content.images) ? content.images : []
  const firstImg = images.find((url): url is string => typeof url === 'string' && url.length > 0)
  return mediaUrl || firstImg || '/placeholder.svg?height=480&width=720'
}

function formatArticleDate(post: SitePost) {
  if (!post.publishedAt) return ''
  return new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export async function TaskListPage({ task, category }: { task: TaskKey; category?: string }) {
  if (TASK_LIST_PAGE_OVERRIDE_ENABLED) {
    return await TaskListPageOverride({ task, category })
  }

  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))
  const { recipe } = getFactoryState()
  const layoutKey = recipe.taskLayouts[task as keyof typeof recipe.taskLayouts] || `${task}-${task === 'listing' ? 'directory' : 'editorial'}`
  const shellClass = variantShells[layoutKey as keyof typeof variantShells] || 'bg-background'
  const Icon = taskIcons[task] || LayoutGrid

  const isDark = ['image-masonry', 'image-portfolio', 'profile-creator'].includes(layoutKey)
  const ui = isDark
    ? {
        muted: 'text-slate-300',
        panel: 'border border-white/10 bg-white/6',
        soft: 'border border-white/10 bg-white/5',
        input: 'border-white/10 bg-white/6 text-white',
        button: 'bg-white text-slate-950 hover:bg-slate-200',
      }
    : layoutKey.startsWith('article') || layoutKey.startsWith('sbm')
      ? {
          muted: 'text-[#5a6562]',
          panel: 'border border-[#cfe8e0] bg-white/95',
          soft: 'border border-[#cfe8e0] bg-[#f4faf8]',
          input: 'border border-[#cfe8e0] bg-white text-[#1a1a1a]',
          button: 'bg-[#1a1a1a] text-white hover:bg-[#2d2d2d]',
        }
      : {
          muted: 'text-slate-600',
          panel: 'border border-slate-200 bg-white',
          soft: 'border border-slate-200 bg-slate-50',
          input: 'border border-slate-200 bg-white text-slate-950',
          button: 'bg-slate-950 text-white hover:bg-slate-800',
        }

  return (
    <div className={`min-h-screen ${shellClass}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Business Directory Listings',
                itemListElement: schemaItems,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: 'Worldwide',
              },
            ]}
          />
        ) : null}
        {task === 'article' || task === 'classified' ? (
          <SchemaJsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ''}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        {layoutKey === 'listing-directory' || layoutKey === 'listing-showcase' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className={`rounded-[2rem] p-7 shadow-[0_24px_70px_rgba(15,23,42,0.07)] ${ui.panel}`}>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] opacity-70"><Icon className="h-4 w-4" /> {taskConfig?.label || task}</div>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-4 max-w-2xl text-sm leading-7 ${ui.muted}`}>Built with a cleaner scan rhythm, stronger metadata grouping, and a structure designed for business discovery rather than editorial reading.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={taskConfig?.route || '#'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.button}`}>Explore results <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/search" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.soft}`}>Open search</Link>
              </div>
            </div>
            <form className={`grid gap-3 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ${ui.soft}`} action={taskConfig?.route || '#'}>
              <div>
                <label className={`text-xs uppercase tracking-[0.2em] ${ui.muted}`}>Category</label>
                <select name="category" defaultValue={normalizedCategory} className={`mt-2 h-11 w-full rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className={`h-11 rounded-xl text-sm font-medium ${ui.button}`}>Apply filters</button>
            </form>
          </section>
        ) : null}

        {layoutKey === 'article-editorial' || layoutKey === 'article-journal' ? (
          <>
            <section className="mb-10 overflow-hidden rounded-2xl border border-[#cfe8e0] bg-[#e8f3f1] lg:rounded-3xl">
              <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div>
                  <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#5a6562]">
                    <Link href="/" className="transition hover:text-[#1a1a1a]">
                      Homepage
                    </Link>
                    <span aria-hidden>/</span>
                    <span className="text-[#1a1a1a]">News</span>
                  </nav>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#cfe8e0] bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5a6562]">
                    <Newspaper className="h-3.5 w-3.5" />
                    Fresh perspectives
                  </div>
                  <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-[#1a1a1a] sm:text-5xl">Stories worth slowing down for</h1>
                  <p className={`mt-5 max-w-2xl text-base leading-relaxed ${ui.muted}`}>
                    Browse reporting, essays, and explainers in one calm reading room. Pick a topic, open a cover line, and keep the same mint-and-charcoal rhythm you see on the homepage.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/create/article"
                      className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold ${ui.button}`}
                    >
                      Submit a story
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-lg border border-[#cfe8e0] bg-white px-5 py-2.5 text-sm font-semibold text-[#1a1a1a] transition hover:bg-[#f4faf8]"
                    >
                      Tip the news desk
                    </Link>
                  </div>
                  <dl className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-t border-[#cfe8e0] pt-6">
                    <div>
                      <dt className={`text-[11px] font-semibold uppercase tracking-wider ${ui.muted}`}>Updated</dt>
                      <dd className="mt-1 font-display text-lg font-semibold text-[#1a1a1a]">Weekly</dd>
                    </div>
                    <div>
                      <dt className={`text-[11px] font-semibold uppercase tracking-wider ${ui.muted}`}>Focus</dt>
                      <dd className="mt-1 font-display text-lg font-semibold text-[#1a1a1a]">Long-form</dd>
                    </div>
                    <div>
                      <dt className={`text-[11px] font-semibold uppercase tracking-wider ${ui.muted}`}>Format</dt>
                      <dd className="mt-1 font-display text-lg font-semibold text-[#1a1a1a]">Editorial</dd>
                    </div>
                  </dl>
                </div>
                <div className={`relative min-h-[200px] rounded-2xl border border-[#cfe8e0] bg-white/80 p-5 shadow-sm sm:min-h-[240px] ${ui.panel}`}>
                  <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${ui.muted}`}>Browse by topic</p>
                  <p className={`mt-2 text-sm leading-relaxed ${ui.muted}`}>Jump to a lane without losing context—filters stay in this card so the feed below stays clean.</p>
                  <form className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center" action={taskConfig?.route || '#'}>
                    <select name="category" defaultValue={normalizedCategory} className={`h-11 w-full rounded-lg px-3 text-sm ${ui.input}`}>
                      <option value="all">All categories</option>
                      {CATEGORY_OPTIONS.map((item) => (
                        <option key={item.slug} value={item.slug}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className={`h-11 shrink-0 rounded-lg px-5 text-sm font-semibold ${ui.button}`}>
                      Apply
                    </button>
                  </form>
                </div>
              </div>
            </section>

            {posts.length ? (
              <section className="mb-10">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-[#1a1a1a]">Cover lines</h2>
                  <span className={`hidden text-sm sm:inline ${ui.muted}`}>Latest three from the wire</span>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {posts.slice(0, 3).map((post) => (
                    <Link
                      key={post.id}
                      href={`${taskConfig?.route || '/articles'}/${post.slug}`}
                      className="group overflow-hidden rounded-2xl border border-[#cfe8e0] bg-white shadow-sm transition hover:border-[#1a1a1a]/20 hover:shadow-md"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f4faf8]">
                        <ContentImage src={getArticleCardImage(post)} alt="" fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                      </div>
                      <div className="p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#5a6562]">{formatArticleDate(post)}</p>
                        <h3 className="font-display mt-2 line-clamp-2 text-lg font-semibold leading-snug text-[#1a1a1a]">{post.title}</h3>
                        {post.summary ? <p className={`mt-2 line-clamp-2 text-sm leading-relaxed ${ui.muted}`}>{post.summary}</p> : null}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="mb-10 rounded-2xl border border-[#cfe8e0] bg-[#f4faf8]/80 px-4 py-4 sm:px-5">
              <p className={`mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] ${ui.muted}`}>Quick topics</p>
              <div className="flex flex-wrap justify-center gap-2">
                {CATEGORY_OPTIONS.slice(0, 10).map((item) => (
                  <Link
                    key={item.slug}
                    href={`${taskConfig?.route || '/articles'}?category=${encodeURIComponent(item.slug)}`}
                    className="rounded-full border border-[#cfe8e0] bg-white px-3 py-1.5 text-xs font-medium text-[#1a1a1a] transition hover:border-[#1a1a1a]/25"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </section>
          </>
        ) : null}

        {layoutKey === 'image-masonry' || layoutKey === 'image-portfolio' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${ui.soft}`}>
                <Icon className="h-3.5 w-3.5" /> Visual feed
              </div>
              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em]">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This surface leans into stronger imagery, larger modules, and more expressive spacing so visual content feels materially different from reading and directory pages.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className={`min-h-[220px] rounded-[2rem] ${ui.panel}`} />
              <div className={`min-h-[220px] rounded-[2rem] ${ui.soft}`} />
              <div className={`col-span-2 min-h-[120px] rounded-[2rem] ${ui.panel}`} />
            </div>
          </section>
        ) : null}

        {layoutKey === 'profile-creator' || layoutKey === 'profile-business' ? (
          <section className={`mb-12 rounded-[2.2rem] p-8 shadow-[0_24px_70px_rgba(15,23,42,0.1)] ${ui.panel}`}>
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className={`min-h-[240px] rounded-[2rem] ${ui.soft}`} />
              <div>
                <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Profiles with stronger identity, trust, and reputation cues.</h1>
                <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This layout prioritizes the person or business surface first, then lets the feed continue below without borrowing the same visual logic used by articles or listings.</p>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'classified-bulletin' || layoutKey === 'classified-market' ? (
          <section className="mb-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className={`rounded-[1.8rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Fast-moving notices, offers, and responses in a compact board format.</h1>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {['Quick to scan', 'Shorter response path', 'Clearer urgency cues'].map((item) => (
                <div key={item} className={`rounded-[1.5rem] p-5 ${ui.soft}`}>
                  <p className="text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {layoutKey === 'sbm-curation' || layoutKey === 'sbm-library' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Curated resources arranged more like collections than a generic post feed.</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>Bookmarks, saved resources, and reference-style items need calmer grouping and lighter metadata. This variant gives them that separation.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.24em] ${ui.muted}`}>Collection filter</p>
              <form className="mt-4 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {intro && task !== 'article' ? (
          <section className={`mb-12 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8 ${ui.panel}`}>
            <h2 className="text-2xl font-semibold text-foreground">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={`mt-4 text-sm leading-7 ${ui.muted}`}>{paragraph}</p>
            ))}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {intro.links.map((link) => (
                <a key={link.href} href={link.href} className="font-semibold text-foreground hover:underline">{link.label}</a>
              ))}
            </div>
          </section>
        ) : null}

        <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
      </main>
      <Footer />
    </div>
  )
}
