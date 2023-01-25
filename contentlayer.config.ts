// Styled after https://github.com/kfirfitousi/blog
import { defineDocumentType, makeSource, type ComputedFields } from 'contentlayer/source-files'
import { rehypePlugins, remarkPlugins } from './lib/mdx-plugins'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: 'posts/**/*.mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string' },
    tags: { type: 'list', of: { type: 'string' } },
    shareImage: { type: 'json' }, // TODO
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: post => `/blog/${post.slug}`,
    },
  },
}))

export const Job = defineDocumentType(() => ({
  name: 'Job',
  contentType: 'mdx',
  filePathPattern: 'jobs/**/*.mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    startDate: { type: 'date', required: true },
    endDate: { type: 'date' },
    current: { type: 'boolean', required: true },
    jobUrl: { type: 'string' },
    excerpt: { type: 'string' },
    thumbnail: { type: 'json' }, // TODO
    shareImage: { type: 'json' }, // TODO
    images: { type: 'json' }, //TODO
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: job => `/work/${job.slug}`,
    },
  },
}))

export const ContractJob = defineDocumentType(() => ({
  name: 'ContractJob',
  contentType: 'mdx',
  filePathPattern: 'contract-jobs/**/*.mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    startDate: { type: 'date', required: true },
    endDate: { type: 'date' },
    current: { type: 'boolean', required: true },
    jobUrl: { type: 'string' },
    excerpt: { type: 'string' },
    thumbnail: { type: 'json' }, // TODO
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: job => `/work/${job.slug}`,
    },
  },
}))

export const Project = defineDocumentType(() => ({
  name: 'Project',
  contentType: 'mdx',
  filePathPattern: 'projects/**/*.mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    startDate: { type: 'date', required: true },
    endDate: { type: 'date' },
    current: { type: 'boolean', required: true },
    projectUrl: { type: 'string' },
    excerpt: { type: 'string' },
    thumbnail: { type: 'json' }, // TODO
    shareImage: { type: 'json' }, // TODO
    images: { type: 'json' }, // TODO
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: project => `/project/${project.slug}`,
    },
  },
}))

export const PostSeries = defineDocumentType(() => ({
  name: 'PostSeries',
  contentType: 'mdx',
  filePathPattern: 'series/**/*.mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    posts: { type: 'reference', of: Post },
    previewImage: { type: 'json' }, // TODO
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: series => `/series/${series.slug}`,
    },
  },
}))

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post, PostSeries, Job, ContractJob, Project],
  mdx: {
    remarkPlugins,
    rehypePlugins,
  },
})
