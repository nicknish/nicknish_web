import Link from 'next/link'
import React from 'react'
import { FaGithubAlt, FaLinkedin, FaTwitter } from 'react-icons/fa'
import {
  NEWSLETTER_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  TWITTER_URL,
  RESUME_URL,
} from '../../../constants/urls'

type SocialMediaLinks<T> = Record<'github' | 'twitter' | 'linkedin', T>

const socialMediaUrls: SocialMediaLinks<string> = {
  github: GITHUB_URL,
  linkedin: LINKEDIN_URL,
  twitter: TWITTER_URL,
}

const ICONS: SocialMediaLinks<React.ReactElement> = {
  github: <FaGithubAlt />,
  twitter: <FaTwitter />,
  linkedin: <FaLinkedin />,
}

export const Footer = () => {
  return (
    <footer className="w-full py-9 px-5 md:mt-9 text-center text-black-30 dark:text-white-70">
      <nav className="mb-3">
        <ul className="flex items-center justify-center p-0 m-0 list-none">
          {Object.keys(socialMediaUrls).map(key => (
            <li className="inline-flex" key={key}>
              <Link
                href={socialMediaUrls[key as keyof SocialMediaLinks<string>]}
                className="inline-block text-2xl p-2 m-1 text-black-30 dark:text-white-100"
              >
                {ICONS[key as keyof SocialMediaLinks<React.ReactElement>]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="flex justify-center max-w-xl mx-auto mb-7 text-center">
        <Link className="mx-2 no-underline black-40 dark:white-80" href={NEWSLETTER_URL}>
          Newsletter
        </Link>
        <Link className="mx-2 no-underline black-40 dark:white-80" href={RESUME_URL}>
          Resume
        </Link>
      </nav>

      <div>&copy; Nick Nish {new Date().getFullYear()}</div>
    </footer>
  )
}
