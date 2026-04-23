import { FileText } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { LOGIN_PAGE_OVERRIDE_ENABLED, LoginPageOverride } from '@/overrides/login-page'
import { ArticleLoginForm } from '@/components/auth/article-login-form'

function getLoginConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#f4faf8] text-[#1a1a1a]',
      panel: 'border border-[#cfe8e0] bg-white shadow-[0_24px_70px_rgba(26,26,26,0.06)]',
      side: 'border border-[#cfe8e0] bg-[#e8f3f1]',
      muted: 'text-[#4a5552]',
      action:
        'inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#1a1a1a] px-6 text-sm font-semibold text-white transition hover:bg-[#2d2d2d] disabled:opacity-60',
      input: 'h-12 rounded-lg border border-[#cfe8e0] bg-white px-4 text-sm text-[#1a1a1a] placeholder:text-[#6b7673]',
      icon: FileText,
      title: 'Sign in to publish and read',
      body: 'Draft ideas, follow authors, and keep your reading list in sync across sessions.',
    }
  }
  return {
    shell: 'bg-[#f8fbff] text-slate-950',
    panel: 'border border-slate-200 bg-white',
    side: 'border border-slate-200 bg-slate-50',
    muted: 'text-slate-600',
    action:
      'inline-flex h-12 w-full items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60',
    input: 'h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm',
    icon: FileText,
    title: 'Sign in',
    body: 'Access your workspace.',
  }
}

export default function LoginPage() {
  if (LOGIN_PAGE_OVERRIDE_ENABLED) {
    return <LoginPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getLoginConfig(productKind)
  const Icon = config.icon

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
          <div className={`rounded-2xl p-8 lg:rounded-3xl ${config.side}`}>
            <Icon className="h-8 w-8" />
            <h1 className="font-display mt-5 text-4xl font-semibold tracking-[-0.04em]">{config.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-4">
              {['Editorial typography tuned for long reads', 'A calmer article-first layout', 'Your session stays on this device'].map((item) => (
                <div key={item} className="rounded-xl border border-[#1a1a1a]/10 bg-white/60 px-4 py-3 text-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-2xl p-8 lg:rounded-3xl ${config.panel}`}>
            <ArticleLoginForm actionClassName={config.action} inputClassName={config.input} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
