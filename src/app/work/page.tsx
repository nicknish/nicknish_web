import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'

import { allProjects } from 'contentlayer/generated'
import { formatIsoDate, getDate } from '@/utils/dates'
import { getJobs, sortProjectWorkItemsByStartDate } from '@/lib/jobs-projects'
import { HOME_PATH } from '@/constants/urls'
import siteConfig from '@/config'

import { OutboundLink } from '@/components/common/OutboundLink'
import { WorkItem } from './WorkItem'
import { Button } from '@/components/common/Button'

import HAPPY_IMG from './happy.svg'

export default async function WorkPage() {
  const jobHistory = sortProjectWorkItemsByStartDate(getJobs({ only: 'fulltime' }))
  const contractJobHistory = sortProjectWorkItemsByStartDate(getJobs({ only: 'contract' }))
  const projectHistory = sortProjectWorkItemsByStartDate(allProjects)

  return (
    <main className="px-4">
      <div className="mx-auto max-w-4xl md:grid md:grid-cols-5 md:gap-x-8 items-center">
        <div className="md:col-span-2 mb-8 md:mb-0">
          {/* TODO: Figure out next/image better */}
          <Image
            src={HAPPY_IMG}
            className="mx-auto max-w-100"
            alt="Illustration of man jumping with joy"
            priority
            width={382}
            height={374}
          />
        </div>

        <AboutSection data-testid="WorkSection--about">
          <SectionTitle className="md:text-left text-primary-500">About Me</SectionTitle>
          <div className="text-lg">
            <p className="mb-5">
              Hello! My name is Nick Nish and I{"'"}m a Software Engineer with a particular love for
              Frontend Development.
            </p>
            <p className="mb-5">
              I{"'"}m a passionate creative with a deep love for making great products. Because I
              love design and crafting great user experiences, I consider myself a frontend
              developer first, but I{"'"}m a full-stack developer with JavaScript, React, GraphQL,
              Node, and Ruby on Rails experience.
            </p>
            <p className="mb-5">
              First and foremost, I try to live a life of fulfillment and peace. I meditate, learn
              everyday without fail, and strive to carry joy in everything I do.
            </p>
            <p className="mb-5">
              I also{' '}
              <Link href={HOME_PATH} className="underline">
                write
              </Link>{' '}
              occasionally and build{' '}
              <a href="#projects" className="underline">
                side projects
              </a>
              .
            </p>
          </div>
        </AboutSection>
      </div>

      <Section data-testid="WorkSection--career">
        <SectionTitle>Career</SectionTitle>
        <SectionGrid>
          {jobHistory.map(job => {
            const { title, url, startDate, endDate, current, excerpt } = job
            const startDateFormatted = startDate ? formatIsoDate(startDate, 'MMM yyyy') : startDate
            const endDateFormatted = endDate ? formatIsoDate(endDate, 'MMM yyyy') : endDate

            return (
              <WorkItem
                key={title}
                href={url}
                title={title}
                // TODO
                description={excerpt ?? ''}
                footerSubtitle={getDate(startDateFormatted, endDateFormatted, current)}
              />
            )
          })}
        </SectionGrid>

        <div className="flex mt-6 md:mt-8 justify-center items-center">
          <Button
            component={OutboundLink}
            componentProps={{
              href: siteConfig.resumeUrl,
              target: '_blank',
              rel: 'noopener noreferrer',
            }}
            className="text-lg inline-flex items-center justify-center"
            theme="primary"
            size="small"
          >
            See Resume
            <FaExternalLinkAlt className="align-middle top-[-1px] ml-2 text-sm relative" />
          </Button>
        </div>
      </Section>

      <Section data-testid="WorkSection--contract">
        <SectionTitle id="contract" element="h2">
          Contract Work
        </SectionTitle>
        <SectionGrid gridColumns={Math.floor(contractJobHistory.length / 2)}>
          {contractJobHistory.map(data => {
            const { title, url, startDate, endDate, current, excerpt } = data
            const startDateFormatted = startDate ? formatIsoDate(startDate, 'MMM yyyy') : startDate
            const endDateFormatted = endDate ? formatIsoDate(endDate, 'MMM yyyy') : endDate

            return (
              <WorkItem
                key={title}
                href={url}
                title={title}
                // TODO
                description={excerpt ?? ''}
                footerSubtitle={getDate(startDateFormatted, endDateFormatted, current)}
              />
            )
          })}
        </SectionGrid>
      </Section>

      <Section data-testid="WorkSection--projects">
        <SectionTitle id="projects">Projects</SectionTitle>
        <SectionGrid>
          {projectHistory.map(data => {
            const { title, url, startDate, endDate, current, excerpt } = data
            const startDateFormatted = startDate ? formatIsoDate(startDate, 'MMM yyyy') : startDate
            const endDateFormatted = endDate ? formatIsoDate(endDate, 'MMM yyyy') : endDate

            return (
              <WorkItem
                key={title}
                href={url}
                title={title}
                // TODO
                description={excerpt ?? ''}
                footerSubtitle={getDate(startDateFormatted, endDateFormatted, current)}
              />
            )
          })}
        </SectionGrid>
      </Section>
    </main>
  )
}

function AboutSection(props: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <section className="md:col-span-3 mt-8 md:mt-0 mb-10 md:mb-0 mx-auto max-w-xl" {...props} />
  )
}
function Section(props: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return <section className="my-10 md:my-16 mx-auto max-w-4xl" {...props} />
}

interface ISectionTitleProps extends React.HtmlHTMLAttributes<HTMLHeadingElement> {
  element?: string
}

function SectionTitle(props: ISectionTitleProps) {
  const { className, element, ...rest } = props
  const Element = element ?? 'h1'
  const classNames = {
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    h4: 'text-xl',
  }

  return (
    <Element
      // @ts-ignore
      className={`text-center font-bold mb-8 ${classNames[Element]} ${className ?? ''}`}
      {...rest}
    />
  )
}

interface ISectionGridProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  gridColumns?: number
}

function SectionGrid(props: ISectionGridProps) {
  const { gridColumns = 3, ...rest } = props
  const gridColumnsNo = gridColumns > 4 ? 4 : gridColumns < 2 ? 2 : 3
  const gridColumnClasses: Record<number, string> = {
    2: 'md:grid-cols-2 gap-y-2',
    3: 'md:grid-cols-3 gap-y-3',
    4: 'md:grid-cols-4 gap-y-4',
  }

  return <div className={`grid gap-x-2.5 ${gridColumnClasses[gridColumnsNo]}`} {...rest} />
}
