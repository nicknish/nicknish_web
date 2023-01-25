// TODO: Look into image optimization
export const WORK_INFO = `
fragment WorkInfo on Work {
    title
    slug
    startDate
    endDate
    current
    description
    excerpt
    url
    imagesCollection {
      items {
        description
        url
      }
    }
}`

// TODO: Look into image optimization
export const PROJECT_INFO = `
fragment ProjectInfo on Project {
    title
    slug
    startDate
    endDate
    current
    description
    excerpt
    imagesCollection {
      items {
        description
        url
      }
    }
}
`
