'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { HOME_URL, WORK_URL, START_HERE_URL } from '../../../constants/urls'

import styles from './Nav.module.css'

export const Nav: React.FC = () => {
  const pathname = usePathname()

  const isBlog = pathname?.includes('/blog') || pathname === '/'
  const isBlogSeries = pathname?.includes('/series')
  const isWork = pathname?.includes('/work')
  const isProject = pathname?.includes('/projects')
  const isStart = pathname?.includes('/start')

  return (
    <nav className="flex w-full max-w-4xl px-4 py-8 mx-auto items-center justify-between">
      <Link
        href={HOME_URL}
        className={`${styles.logo} relative text-[22.5px] font-semibold dark:text-white-100`}
      >
        nicknish
      </Link>
      <div className="text-lg text-right">
        <NavLink href={START_HERE_URL} isActive={isStart}>
          Start Here
        </NavLink>
        <NavLink
          href={HOME_URL} // This isn't a bug, the Homepage is the blog
          isActive={isBlog || isBlogSeries}
        >
          Blog
        </NavLink>
        <NavLink href={WORK_URL} isActive={isWork || isProject}>
          Work
        </NavLink>
      </div>
    </nav>
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
      className={`mx-2 black-50 font-bold ${
        isActive ? 'text-primary-500' : 'text-black-100 dark:text-white-100'
      }`}
      data-testid={`NavLink--${href}`}
      {...linkProps}
    />
  )
}
