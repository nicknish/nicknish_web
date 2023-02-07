import Link from 'next/link'
import { FaChevronLeft, FaExternalLinkAlt } from 'react-icons/fa'

import { MDXBlock } from '@/components/common/content/MDXBlock'
import { DynamicProseBlock } from '../common/content/DynamicProseBlock'
import { OutboundLink } from '../common/Tracking'
import { Image } from '../common/Image'

import { WORK_PATH } from '../../constants/urls'
import { PageLayout } from './PageLayout'
import { ProseContainer } from '../common/content/ProseContainer'

export enum ShowTypes {
  PROJECT = 'project',
  WORK = 'work',
}

interface IShowProps {
  title: string
  description: string
  date: string
  external_url?: string
  type: ShowTypes
  image?: { url: string; description?: string }
}

export const Show = ({
  title,
  description,
  date,
  external_url,
  type,
  image,
}: IShowProps): JSX.Element => {
  const { backUrl, backLinkText, headerText } = prepareShowData(type)

  return (
    <PageLayout>
      <ProseContainer
        element={'header'}
        className="md:text-lg max-w-prose mx-auto mt-8 mb-12"
        data-testid="ShowHeader"
      >
        <div>
          <Link
            href={backUrl}
            className="inline-flex items-center p-1 pl-0 mb-8"
            data-testid="ShowBackLink"
          >
            <FaChevronLeft className="mr-1 align-middle" />
            <span>{backLinkText}</span>
          </Link>
        </div>
        <h1 className="text-5xl font-bold mb-3">{title}</h1>
        <div className="text-lg">
          <span className="text-black-60 dark:text-white-80">{date}</span>
          {external_url && (
            <OutboundLink
              href={external_url}
              className="inline-flex items-center ml-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>See it here</span>
              <FaExternalLinkAlt className="text-sm ml-2" />
            </OutboundLink>
          )}
        </div>
      </ProseContainer>

      {image && (
        <div className="my-12">
          <figure className="">
            <Image
              className="w-full h-auto"
              src={image.url}
              alt={image.description ?? ''}
              width="800"
              height="300"
            />
          </figure>
        </div>
      )}

      <div className="md:text-lg max-w-prose mx-auto">
        <h3 className="text-2xl font-bold mb-4">{headerText}</h3>
        <DynamicProseBlock>
          <MDXBlock code={description} />
        </DynamicProseBlock>
      </div>
    </PageLayout>
  )
}

function prepareShowData(type: ShowTypes) {
  const isProject = type === ShowTypes.PROJECT

  const backUrl = WORK_PATH
  const backLinkText = `Back to work`
  const headerText = `${isProject ? 'Project' : 'Role'} Description`

  return { backUrl, backLinkText, headerText }
}
