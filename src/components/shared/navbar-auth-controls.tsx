'use client'

import Link from 'next/link'
import { ChevronDown, LayoutGrid, LogOut, Plus, User, FileText, Building2, Tag, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

export function NavbarAuthControls() {
  const { user, logout } = useAuth()
  const creatableTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" className="hidden h-10 gap-1 rounded-lg border border-[#1a1a1a]/10 bg-[#1a1a1a] px-4 text-white shadow-[0_12px_28px_rgba(26,26,26,0.18)] hover:bg-[#2d2d2d] sm:flex">
            <Plus className="h-4 w-4" />
            Create
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 border-[#cfe8e0] bg-[#f4faf8]/98 backdrop-blur">
          {creatableTasks.map((task) => {
            const Icon = taskIcons[task.key] || LayoutGrid
            return (
              <DropdownMenuItem key={task.key} asChild>
                <Link href={`/create/${task.key}`}>
                  <Icon className="mr-2 h-4 w-4" />
                  Create {task.label}
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        type="button"
        variant="ghost"
        onClick={logout}
        className="h-10 gap-2 rounded-full border border-transparent px-2 text-[#4a5552] hover:border-[#cfe8e0] hover:bg-[#e8f3f1] hover:text-[#1a1a1a] sm:px-3"
        aria-label={`Sign out ${user?.name ?? ''}`}
      >
        <Avatar className="h-9 w-9 border border-[#cfe8e0]">
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="hidden text-sm font-semibold sm:inline">Sign out</span>
        <LogOut className="hidden h-4 w-4 opacity-70 sm:inline" />
      </Button>
    </>
  )
}
