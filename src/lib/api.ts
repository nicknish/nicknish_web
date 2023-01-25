import {
  GET_ALL_PROJECTS,
  GET_ALL_WORK_HISTORY,
  GET_POPULAR_POSTS,
  GET_PROJECT,
  GET_WORK_HISTORY,
} from './queries'
import { fetchGraphQL, processMarkdown } from './utils'

interface IQueryOptions {
  preview: boolean
}

export async function getAllWorkHistoryAndProjects(options: IQueryOptions = { preview: false }) {
  const { preview } = options
  const workHistoryPromise = await fetchGraphQL(GET_ALL_WORK_HISTORY, { preview })
  const projectHistoryPromise = await fetchGraphQL(GET_ALL_PROJECTS, { preview })

  console.log('fetching work history')

  const [workHistory, projectHistory] = await Promise.all([
    await workHistoryPromise.json(),
    await projectHistoryPromise.json(),
  ])

  return {
    workHistory: workHistory.data.workCollection.items,
    projectHistory: projectHistory.data.projectCollection.items,
  }
}

export async function getAllWorkHistory(options: IQueryOptions = { preview: false }) {
  const { preview } = options
  const data = await (await fetchGraphQL(GET_ALL_WORK_HISTORY, { preview })).json()
  return data.data.workCollection.items
}

export async function getWorkHistoryBySlug(
  slug: string,
  options: IQueryOptions = { preview: false }
) {
  const { preview } = options
  const data = await (await fetchGraphQL(GET_WORK_HISTORY, { variables: { slug }, preview })).json()
  const { description, ...rest } = data.data.workCollection.items[0]
  const descriptionHtml = await processMarkdown(description)
  return { ...rest, description: descriptionHtml }
}

export async function getProjects(options: IQueryOptions = { preview: false }) {
  const { preview } = options
  const data = await (await fetchGraphQL(GET_ALL_PROJECTS, { preview })).json()
  return data.data.projectCollection.items
}

export async function getProjectBySlug(slug: string, options: IQueryOptions = { preview: false }) {
  const { preview } = options
  const data = await (await fetchGraphQL(GET_PROJECT, { variables: { slug }, preview })).json()
  const { description, ...rest } = data.data.projectCollection.items[0]
  const descriptionHtml = await processMarkdown(description)
  return { ...rest, description: descriptionHtml }
}

export async function getPopularPosts(options: IQueryOptions = { preview: false }) {
  const { preview } = options
  const data = await (await fetchGraphQL(GET_POPULAR_POSTS, { preview })).json()
  return data.data.popularPostsCollection.items
}

export async function getAllPosts() {}
export async function getPostBySlug(slug: string) {}
export async function getAllSeries() {}
export async function getSeriesBySlug() {}
