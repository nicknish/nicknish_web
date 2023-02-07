'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { HOME_PATH, WORK_PATH, START_PATH } from '../../../constants/urls'

import styles from './Nav.module.css'

export const Nav: React.FC = () => {
  const pathname = usePathname()

  const isBlog = pathname?.includes('/blog') || pathname === '/'
  const isBlogSeries = pathname?.includes('/series')
  const isWork = pathname?.includes('/work')
  const isProject = pathname?.includes('/projects')
  const isStart = pathname?.includes('/start')

  return (
    <nav className="flex w-full max-w-4xl px-4 py-8 mx-auto items-center justify-between dark:text-white-100">
      <NavLogo />
      <div className="text-lg text-right">
        <NavLink href={START_PATH} isActive={isStart}>
          Start Here
        </NavLink>
        <NavLink
          href={HOME_PATH} // This isn't a bug, the Homepage is the blog
          isActive={isBlog || isBlogSeries}
        >
          Blog
        </NavLink>
        <NavLink href={WORK_PATH} isActive={isWork || isProject}>
          Work
        </NavLink>
      </div>
    </nav>
  )
}

function NavLogo() {
  return (
    <Link href={HOME_PATH} className={`${styles.logo} relative text-[22.5px] font-semibold`}>
      nicknish
    </Link>
  )
}

interface INavLinkProps extends LinkProps {
  children: React.ReactNode
  isActive?: boolean
}

function NavLink({ href, isActive, ...linkProps }: INavLinkProps) {
  return (
    <Link
      href={href}
      className={`mx-2 font-bold ${isActive ? 'text-primary-500' : ''}`}
      data-testid={`NavLink--${href}`}
      {...linkProps}
    />
  )
}
