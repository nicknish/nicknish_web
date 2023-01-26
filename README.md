# nicknish.co

This portfolio version is built with NextJS, a static site generator. In this project, we use the
JAMStack architecture using React, GraphQL, and Markdown files.

To get acquainted, check out the `package.json` first or use one of these commands:

```bash
npm run dev   # run development server with React Fast Refresh
npm run build # create production build with app and netlify functions
npm run start # start server for testing build site
```

## Environment Variables

In production, some functionality (e.g. newsletter signup and contact form) will require secrets
such as API keys. However, in development these features should work in a "developer mode" without
hitting production endpoints.

To test these features hitting production endpoints, duplicate the `.env.local.example` file with
`cp .env.local.example .env.local` and update the values.

## TODO

- [ ] Move Projects and Work to Contentlayer
- [ ] Fix Post Series
- [ ] Fix Contact page with lambda functions
- [ ] Make Start page
- [ ] Figure out images in Contentlayer
- [ ] Fix SEO for Posts, Projects, Work, etc.
- [ ] Fix light and dark mode for website
- [ ] Remove siteConfig and replace it with a constants file
- [ ] Fix `post.body.raw`
- [ ] Fix Popular Posts
- [ ] Redesign Homepage
- [ ] Fix Outbound Link tracking
- [ ] Fix WorkItem drop shadows
- [ ] Update Resume link
- [ ] Fix code block highlight styling
