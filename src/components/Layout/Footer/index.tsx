import Link, { LinkProps } from 'next/link'
import React from 'react'
import { FaGithubAlt, FaLinkedin, FaTwitter } from 'react-icons/fa'

import siteConfig from '@/config'
import { IOutboundLinkProps, OutboundLink } from '@/components/common/Tracking/OutboundLink'
import { CONTACT_PATH } from '@/constants/urls'

type SocialMediaLinks<T> = Record<'github' | 'twitter' | 'linkedin', T>

const socialMediaUrls: SocialMediaLinks<string> = {
  github: siteConfig.githubUrl,
  linkedin: siteConfig.linkedinUrl,
  twitter: siteConfig.twitterUrl,
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

      <nav className="flex justify-center gap-x-3 max-w-xl mx-auto mb-7 text-center">
        <FooterTextLink type="OutboundLink" linkProps={{ href: siteConfig.newsletterUrl }}>
          Newsletter
        </FooterTextLink>
        <FooterTextLink type="OutboundLink" linkProps={{ href: siteConfig.resumeUrl }}>
          Resume
        </FooterTextLink>
        <FooterTextLink type="default" linkProps={{ href: CONTACT_PATH }}>
          Contact
        </FooterTextLink>
      </nav>

      <div>&copy; Nick Nish {new Date().getFullYear()}</div>
    </footer>
  )
}

interface IFooterTextLinkProps {
  type: 'default'
  linkProps: LinkProps
  children: React.ReactNode
}
interface IFooterTextOutboundLinkProps {
  type: 'OutboundLink'
  linkProps: IOutboundLinkProps
  children: React.ReactNode
}

function FooterTextLink(props: IFooterTextLinkProps | IFooterTextOutboundLinkProps) {
  const { type, linkProps, ...rest } = props
  const className = 'no-underline black-40 dark:white-80'

  if (type === 'OutboundLink') {
    return (
      <OutboundLink
        {...linkProps}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      />
    )
  }

  return <Link className={className} {...linkProps} {...rest} />
}
