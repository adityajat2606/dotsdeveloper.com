import { Building2, Clock, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

function getEditorialContactTone() {
  return {
    shell: 'bg-[#f4faf8] text-[#1a1a1a]',
    panel: 'rounded-2xl border border-[#cfe8e0] bg-white p-7 shadow-[0_24px_70px_rgba(26,26,26,0.06)] sm:p-8 lg:rounded-3xl',
    soft: 'rounded-xl border border-[#cfe8e0] bg-[#e8f3f1] p-5 transition hover:border-[#1a1a1a]/15',
    muted: 'text-[#5a6562]',
    action:
      'inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#1a1a1a] px-6 text-sm font-semibold text-white transition hover:bg-[#2d2d2d]',
    field:
      'h-12 w-full rounded-lg border border-[#cfe8e0] bg-white px-4 text-sm text-[#1a1a1a] placeholder:text-[#6b7673] outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#1a1a1a]/20',
    textarea:
      'min-h-[160px] w-full rounded-lg border border-[#cfe8e0] bg-white px-4 py-3 text-sm text-[#1a1a1a] placeholder:text-[#6b7673] outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#1a1a1a]/20',
  }
}

const faqs = [
  {
    q: 'How quickly do you reply?',
    a: 'We aim for two business days on general inquiries. Time-sensitive corrections are prioritized the same day when flagged clearly in the subject line.',
  },
  {
    q: 'Can I pitch a story before writing it?',
    a: 'Yes—send a short outline, intended audience, and two links to your best past work. We will let you know if the angle fits our upcoming schedule.',
  },
  {
    q: 'Do you accept syndicated or republished pieces?',
    a: 'Sometimes. Tell us where the piece first appeared and confirm you control republication rights. We prefer exclusives but consider strong reprints case by case.',
  },
]

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const tone = getEditorialContactTone()

  const lanes =
    productKind === 'directory'
      ? [
          { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
          { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
          { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
            { icon: Mail, title: 'Reader & author support', body: 'Accounts, publishing workflow, or reading questions—we route these to the right editor.' },
            { icon: Sparkles, title: 'Partnerships', body: 'Sponsorships, collaborations, and issue-level campaigns with transparent labeling.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
              { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
              { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
            ]
          : [
              { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
              { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
              { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
            ]

  return (
    <div className={`min-h-screen ${tone.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <header className="mb-10 max-w-3xl">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#5a6562]">
            <Link href="/" className="transition hover:text-[#1a1a1a]">
              Homepage
            </Link>
            <span aria-hidden>/</span>
            <span className="text-[#1a1a1a]">Contact</span>
          </nav>
          <h1 className="font-display mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Let&rsquo;s start a conversation</h1>
          <p className={`mt-5 text-base leading-relaxed ${tone.muted}`}>
            Whether you are pitching a story, flagging a correction, or exploring a partnership, this page uses the same mint-and-charcoal system as the rest of {SITE_CONFIG.name}—so nothing feels bolted on.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div className="space-y-6">
            <div className="rounded-2xl border border-[#cfe8e0] bg-[#e8f3f1]/80 p-6 sm:p-8 lg:rounded-3xl">
              <h2 className="font-display text-xl font-semibold text-[#1a1a1a]">Direct lines</h2>
              <p className={`mt-2 text-sm leading-relaxed ${tone.muted}`}>
                Prefer email? Reach the desk directly—we monitor this inbox during business hours.
              </p>
              <a
                href={`mailto:hello@${SITE_CONFIG.domain}`}
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[#cfe8e0] bg-white px-4 py-3 text-sm font-semibold text-[#1a1a1a] transition hover:bg-[#f4faf8]"
              >
                <Mail className="h-4 w-4" />
                hello@{SITE_CONFIG.domain}
              </a>
              <div className="mt-6 flex flex-col gap-4 rounded-xl border border-[#cfe8e0] bg-white/90 p-4 text-sm text-[#5a6562]">
                <div className="flex gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#1a1a1a]" />
                  <div>
                    <p className="font-medium text-[#1a1a1a]">Response window</p>
                    <p className="mt-1">Monday–Friday, 9am–6pm in your local browser timezone when possible.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#1a1a1a]" />
                  <div>
                    <p className="font-medium text-[#1a1a1a]">Corrections</p>
                    <p className="mt-1">Put “Correction” in the subject line and link to the article URL so we can patch quickly.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold text-[#1a1a1a]">What we can help with</h2>
              {lanes.map((lane) => (
                <div key={lane.title} className={tone.soft}>
                  <lane.icon className="h-5 w-5 text-[#1a1a1a]" />
                  <h3 className="mt-3 font-display text-base font-semibold text-[#1a1a1a]">{lane.title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className={tone.panel}>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-[#1a1a1a]">Send a message</h2>
              <p className={`mt-2 text-sm ${tone.muted}`}>All fields are required so we can route your note without extra back-and-forth.</p>
              <form className="mt-6 grid gap-4">
                <input className={tone.field} name="name" placeholder="Your name" autoComplete="name" />
                <input className={tone.field} name="email" type="email" placeholder="Email address" autoComplete="email" />
                <input className={tone.field} name="subject" placeholder="Subject" />
                <textarea className={tone.textarea} name="message" placeholder="How can we help?" />
                <button type="submit" className={tone.action}>
                  Send message
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-[#cfe8e0] bg-[#f4faf8] p-5 sm:p-6">
              <h2 className="font-display text-lg font-semibold text-[#1a1a1a]">Common questions</h2>
              <div className="mt-4 space-y-2">
                {faqs.map((item) => (
                  <details key={item.q} className="group rounded-xl border border-[#cfe8e0] bg-white px-4 py-3">
                    <summary className="cursor-pointer list-none text-sm font-semibold text-[#1a1a1a] [&::-webkit-details-marker]:hidden">
                      <span className="flex items-center justify-between gap-2">
                        {item.q}
                        <span className="text-[#5a6562] transition group-open:rotate-180">⌄</span>
                      </span>
                    </summary>
                    <p className="mt-3 border-t border-[#cfe8e0] pt-3 text-sm leading-relaxed text-[#5a6562]">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
