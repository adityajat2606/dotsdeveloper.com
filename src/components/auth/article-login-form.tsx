'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { loadFromStorage, saveToStorage, storageKeys } from '@/lib/local-storage'
import { useToast } from '@/components/ui/use-toast'
import type { User } from '@/types'

type ArticleLoginFormProps = {
  actionClassName: string
  inputClassName: string
}

export function ArticleLoginForm({ actionClassName, inputClassName }: ArticleLoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !password) {
      toast({
        title: 'Missing fields',
        description: 'Enter your email and password to continue.',
        variant: 'destructive',
      })
      return
    }

    await login(trimmed, password)

    const stored = loadFromStorage<User | null>(storageKeys.user, null)
    if (stored?.email === trimmed) {
      saveToStorage(storageKeys.lastLoginSuccessAt, new Date().toISOString())
      toast({ title: 'Signed in', description: 'Welcome back.' })
      router.push('/articles')
      router.refresh()
      return
    }

    toast({
      title: 'Sign-in incomplete',
      description: 'Check your details and try again.',
      variant: 'destructive',
    })
  }

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Welcome back</p>
      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
        <input
          name="email"
          autoComplete="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          className={inputClassName}
          placeholder="Email address"
        />
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          className={inputClassName}
          placeholder="Password"
        />
        <button type="submit" disabled={isLoading} className={actionClassName}>
          {isLoading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <div className="mt-6 flex items-center justify-between text-sm opacity-80">
        <Link href="/forgot-password" className="hover:underline">
          Forgot password?
        </Link>
        <Link href="/register" className="inline-flex items-center gap-2 font-semibold hover:underline">
          <Sparkles className="h-4 w-4" />
          Create account
        </Link>
      </div>
    </>
  )
}
