import * as Contentful from './contentful'

interface SysProps {
  id: string
}

interface ImageProps {
  title: string
  url: string
}

interface BlogSysProps {
  id: string
  publishedAt?: string
}

export type BlogPostType = Contentful.TypeBlogPostFields & {
  sys: BlogSysProps
  content: any
}

export type BlogPostListType = {
  sys: BlogSysProps
  title: string
  handle: string
  published: string
}

export type CodeProjectType = Contentful.TypeCodeProjectFields & {
  sys: SysProps
  description: any
  image: ImageProps
}

export type MusicProjectType = Contentful.TypeMusicProjectFields & {
  sys: SysProps
  artwork: ImageProps
}

export type AboutPageType = Contentful.TypeAboutPageFields & {
  sys: SysProps
  contactLineOne: any
  contactLineTwo: any
  bio: any
  heroImage: ImageProps
}
