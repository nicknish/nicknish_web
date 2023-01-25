import { remark } from 'remark'
import remarkHtml from 'remark-html'

export async function fetchGraphQL(
  query: string,
  options: { variables?: Record<string, any>; preview: boolean } = { variables: {}, preview: false }
) {
  const { preview, variables } = options
  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENV}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({
        query,
        variables: {
          ...variables,
          preview,
        },
      }),
    }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch data for query: ${query}`)
  }

  return res
}

export async function processMarkdown(markdown: string) {
  return await (await remark().use(remarkHtml).process(markdown)).toString()
}
