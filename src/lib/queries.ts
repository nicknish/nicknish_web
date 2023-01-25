import { PROJECT_INFO, WORK_INFO } from './fragments'

export const GET_ALL_CONTRACT_WORK_HISTORY = `
query AllContractWorkHistory($preview: Boolean!) {
    workCollection(
        where: { freelanceWork: true }
        order: startDate_DESC
        preview: $preview
    ) {
        items {
            ...WorkInfo
        }
    }
}
${WORK_INFO}`

export const GET_PROJECT = `
query Project($slug: String!, $preview: Boolean!) {
    projectCollection(
        where: { slug: $slug }
        preview: $preview
    ) {
        items {
            ...ProjectInfo
        }
    }
}
${PROJECT_INFO}`

export const GET_ALL_PROJECTS = `
query AllProjectHistory($preview: Boolean!) {
    projectCollection(
        order: startDate_DESC
        preview: $preview
    ) {
        items {
            ...ProjectInfo
        }
    }
}
${PROJECT_INFO}`

export const GET_WORK_HISTORY = `
query WorkHistory($slug: String!, $preview: Boolean!) {
    workCollection(
        where: { slug: $slug }
        limit: 1
        preview: $preview
    ) {
        items {
            ...WorkInfo
        }
    }
}
${WORK_INFO}`

export const GET_ALL_WORK_HISTORY = `
query AllWorkHistory($preview: Boolean!) {
    workCollection(
        where: { freelanceWork_not: true }
        order: startDate_DESC
        preview: $preview
    ) {
        items {
            ...WorkInfo
        }
    }
}
${WORK_INFO}`

export const GET_POPULAR_POSTS = `
query PopularPosts($preview: Boolean!) {
    popularPostsCollection(where: { title: "Blog Index Popular Posts" }, preview: $preview) {
        items {
            postsCollection {
                items {
                    ... on ContentType2WKn6YEnZewu2ScCkus4As {
                        slug
                        date
                        description
                        body
                      }
                }
            }
        }
    }
}`
