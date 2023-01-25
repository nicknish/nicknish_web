import { WORK_URL } from '../../constants/urls'

import { FaChevronLeft, FaExternalLinkAlt } from 'react-icons/fa'

import Image from 'next/image'
import Link from 'next/link'

export enum ShowTypes {
  PROJECT = 'project',
  WORK = 'work',
}

interface IShowProps {
  path?: string
  title: string
  description: string
  date: string
  external_url?: string
  type: ShowTypes
  image?: { url: string; description?: string }
}

export const Show = ({
  path,
  title,
  description,
  date,
  external_url,
  type,
  image,
}: IShowProps): JSX.Element => {
  const { backUrl, backLinkText, headerText } = prepareShowData(type)

  return (
    <div className="px-4 max-w-3xl mx-auto">
      <header className="mb-6" data-testid="ShowHeader">
        <div>
          <Link
            href={backUrl}
            className="inline-flex items-center p-1 pl-0"
            data-testid="ShowBackLink"
          >
            <FaChevronLeft className="mr-1 align-middle" />
            <span>{backLinkText}</span>
          </Link>
        </div>
        <h1 className="text-5xl font-bold mt-5 mb-3">{title}</h1>
        <div className="text-lg">
          <span className="text-black-80 dark:text-white-80">{date}</span>
          {external_url && (
            <a
              href={external_url}
              className="inline-flex items-center ml-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>See it here</span>
              <FaExternalLinkAlt className="text-sm ml-2" />
            </a>
          )}
        </div>
      </header>

      {image && (
        <div className="container mb-8">
          <figure className="">
            <Image
              src={image.url}
              alt={image.description ?? ''}
              className=""
              width="800"
              height="300"
            />
          </figure>
        </div>
      )}

      <div className="container">
        <h3 className="text-2xl font-bold mb-4">{headerText}</h3>
        <div className="content" dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  )
}

const prepareShowData = (type: ShowTypes) => {
  const isProject = type === ShowTypes.PROJECT

  const backUrl = WORK_URL
  const backLinkText = `Back to work`
  const headerText = `${isProject ? 'Project' : 'Role'} Description`

  return { backUrl, backLinkText, headerText }
}

export default Show
