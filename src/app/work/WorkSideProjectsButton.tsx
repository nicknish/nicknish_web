'use client'

import { isSmoothScrollSupported } from '@/utils/smoothScroll'

export interface IWorkSideProjectsButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  projectsSectionElementSelector: string
}

export function WorkSideProjectsButton(props: IWorkSideProjectsButtonProps) {
  const { projectsSectionElementSelector, ...rest } = props

  const handleClick = () => {
    const $projectsSectionEl = document.querySelector(projectsSectionElementSelector)
    if (!$projectsSectionEl) {
      return
    }
    if (isSmoothScrollSupported()) {
      $projectsSectionEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else {
      $projectsSectionEl.scrollIntoView(false)
    }
  }

  return <button {...rest} onClick={handleClick} />
}
