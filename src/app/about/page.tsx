import Link from 'next/link'
import { ArrowRight, BookOpen, Feather, HeartHandshake, Lightbulb, PenLine, Sparkles, Target } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'

const pillars = [
  {
    icon: BookOpen,
    title: 'Reading first',
    body: 'We treat typography, line length, and whitespace as part of the story—not afterthoughts. Every template is tuned so articles feel like a magazine, not a spreadsheet.',
  },
  {
    icon: PenLine,
    title: 'Writer-friendly',
    body: 'Clear submission paths, predictable formatting, and feedback loops help contributors spend energy on ideas—not fighting the interface.',
  },
  {
    icon: Lightbulb,
    title: 'Ideas over noise',
    body: 'We bias toward depth: explainers, essays, and field notes that reward close attention instead of chasing empty engagement.',
  },
]

const milestones = [
  { year: '2024', title: 'Foundation', detail: 'Launched the editorial stack with a single focus—long-form articles and calm discovery.' },
  { year: '2025', title: 'Community', detail: 'Opened contributor lanes, tightened review workflows, and shipped the mint editorial shell you see today.' },
  { year: '2026', title: 'Momentum', detail: 'Expanding beats in technology, design, and culture while keeping the reading experience intentionally slower.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f4faf8] text-[#1a1a1a]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#cfe8e0] bg-[#e8f3f1]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:flex lg:items-end lg:justify-between lg:gap-12 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6562]">About {SITE_CONFIG.name}</p>
              <h1 className="font-display mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-[3.25rem]">
                A small newsroom energy, built for the open web
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#5a6562]">
                {SITE_CONFIG.name} exists to publish thoughtful articles: explainers that respect your time, opinions backed by reporting, and guides written by people who ship the work. We are not a generic portal—just a focused place to read and write.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="rounded-lg bg-[#1a1a1a] px-6 text-white hover:bg-[#2d2d2d]">
                  <Link href="/articles" className="inline-flex items-center gap-2">
                    Read the latest
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-lg border-[#cfe8e0] bg-white hover:bg-[#f4faf8]">
                  <Link href="/contact">Talk with us</Link>
                </Button>
              </div>
            </div>
            <div className="mt-10 hidden max-w-sm rounded-2xl border border-[#cfe8e0] bg-white/90 p-6 shadow-sm lg:mt-0 lg:block">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#5a6562]">
                <Sparkles className="h-4 w-4" />
                Mission
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#5a6562]">
                Champion clarity: help readers understand what matters and help writers sound like themselves—with editorial craft and modern tooling in balance.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {pillars.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#cfe8e0] bg-white p-6 shadow-sm transition hover:border-[#1a1a1a]/15">
                <item.icon className="h-8 w-8 text-[#1a1a1a]" />
                <h2 className="font-display mt-4 text-xl font-semibold">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#5a6562]">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-[#cfe8e0] bg-white py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6562]">How we work</p>
                <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight">Editorial principles we actually follow</h2>
                <ul className="mt-6 space-y-4 text-sm leading-relaxed text-[#5a6562]">
                  <li className="flex gap-3">
                    <Target className="mt-0.5 h-5 w-5 shrink-0 text-[#1a1a1a]" />
                    <span>
                      <strong className="text-[#1a1a1a]">Accuracy over speed.</strong> We correct quickly, label opinion clearly, and link to primary sources whenever possible.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Feather className="mt-0.5 h-5 w-5 shrink-0 text-[#1a1a1a]" />
                    <span>
                      <strong className="text-[#1a1a1a]">Voice with restraint.</strong> We edit for structure and clarity—not to sand away personality.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-[#1a1a1a]" />
                    <span>
                      <strong className="text-[#1a1a1a]">Readers first.</strong> No dark patterns, no infinite junk drawers—just content and navigation you can trust.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-[#cfe8e0] bg-[#f4faf8] p-6 sm:p-8">
                <h3 className="font-display text-lg font-semibold">Timeline</h3>
                <ol className="mt-6 space-y-6">
                  {milestones.map((m) => (
                    <li key={m.year} className="relative border-l-2 border-[#cfe8e0] pl-6">
                      <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-[#1a1a1a]" />
                      <p className="text-xs font-bold uppercase tracking-wider text-[#5a6562]">{m.year}</p>
                      <p className="font-display mt-1 text-base font-semibold text-[#1a1a1a]">{m.title}</p>
                      <p className="mt-1 text-sm text-[#5a6562]">{m.detail}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-[#cfe8e0] bg-[#e8f3f1] px-6 py-10 text-center sm:px-10">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Want to contribute or collaborate?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#5a6562]">
              Send a short note with links to past work—we read everything and respond within a few business days when there is a fit.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild className="rounded-lg bg-[#1a1a1a] text-white hover:bg-[#2d2d2d]">
                <Link href="/create/article">Start a draft</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-lg border-[#cfe8e0] bg-white hover:bg-[#f4faf8]">
                <Link href="/contact">Email the editors</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
