// TODO: Move to contentlayer

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'

import { createPath, HOME_URL, PROJECT_URL, RESUME_URL, WORK_URL } from '@/constants/urls'
import { formatDate, getDate } from '@/utils/dates'
import { getAllWorkHistoryAndProjects } from '@/lib/api'

import { WorkItem } from './WorkItem'
import { Button } from '@/components/common/Button'

import HAPPY_IMG from './happy.svg'

export default async function WorkPage() {
  // TODO: Break this up in several promises and use Suspense boundaries for faster perf
  const { workHistory, projectHistory } = await getAllWorkHistoryAndProjects()

  return (
    <main className="px-4">
      <div className="my-8 md:my-16">
        {/* TODO: Figure out next/image better */}
        <Image src={HAPPY_IMG} className="mx-auto max-w-100 md:max-w-[400px]" alt="TODO" priority />
      </div>

      <AboutSection data-testid="WorkSection--about">
        <SectionTitle>About Me</SectionTitle>
        <div className="text-lg">
          <p className="mb-5">
            Hello! My name is Nick Nish and I{"'"}m a Software Engineer with a particular love for
            Frontend Development.
          </p>
          <p className="mb-5">
            I{"'"}m a passionate creative with a deep love for making great products. Because I love
            design and crafting great user experiences, I consider myself a frontend developer
            first, but I{"'"}m a full-stack developer with JavaScript, React, GraphQL, Node, and
            Ruby on Rails experience.
          </p>
          <p className="mb-5">
            First and foremost, I try to live a life of fulfillment and peace. I meditate, learn
            everyday without fail, and strive to carry joy in everything I do.
          </p>
          <p className="mb-5">
            I also{' '}
            <Link href={HOME_URL} className="underline">
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

      <Section data-testid="WorkSection--career">
        <SectionTitle>Career</SectionTitle>
        <SectionGrid>
          {workHistory.map(data => {
            const { title, slug, startDate, endDate, current, excerpt } = data
            const startDateFormatted = startDate ? formatDate(startDate) : startDate
            const endDateFormatted = endDate ? formatDate(endDate) : endDate

            return (
              <WorkItem
                key={title}
                href={createPath(WORK_URL, slug)}
                title={title}
                description={excerpt}
                footerSubtitle={getDate(startDateFormatted, endDateFormatted, current)}
              />
            )
          })}
        </SectionGrid>

        <div className="flex mt-6 md:mt-8 justify-center items-center">
          <Button
            linkProps={{ href: RESUME_URL }}
            // TODO: Outbound link
            // component={OutboundLink}
            className="text-lg inline-flex items-center justify-center"
            theme="primary"
            size="small"
          >
            See Resume{' '}
            <FaExternalLinkAlt className="align-middle top-[-1px] ml-2 text-sm relative" />
          </Button>
        </div>
      </Section>

      <Section data-testid="WorkSection--projects">
        <SectionTitle id="projects">Projects</SectionTitle>
        <SectionGrid>
          {projectHistory.map(data => {
            const { title, slug, startDate, endDate, current, excerpt } = data
            const startDateFormatted = startDate ? formatDate(startDate) : startDate
            const endDateFormatted = endDate ? formatDate(endDate) : endDate

            return (
              <WorkItem
                key={title}
                href={createPath(PROJECT_URL, slug)}
                title={title}
                description={excerpt}
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
  return <section className="my-10 md:my-16 mx-auto max-w-xl" {...props} />
}
function Section(props: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return <section className="my-10 md:my-16 mx-auto max-w-4xl" {...props} />
}
function SectionTitle(props: React.HtmlHTMLAttributes<HTMLHeadingElement>) {
  return <h1 className="text-4xl text-center font-bold mb-8" {...props} />
}
function SectionGrid(props: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return <div className="grid md:grid-cols-3 gap-x-2.5 gap-y-3" {...props} />
}
