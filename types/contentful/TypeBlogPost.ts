import type { Asset, Entry, EntryFields } from 'contentful'

export interface TypeBlogPostFields {
  title: EntryFields.Symbol
  description?: EntryFields.Symbol
  handle: EntryFields.Symbol
  content: EntryFields.RichText
  published: EntryFields.Date
  coverImage: Asset
}

export type TypeBlogPost = Entry<TypeBlogPostFields>
