import type { Asset, Entry, EntryFields } from 'contentful'

export interface TypeCodeProjectFields {
  title?: EntryFields.Symbol
  link?: EntryFields.Symbol
  timelineLaunchDate?: EntryFields.Symbol
  description?: EntryFields.RichText
  image?: Asset
  isListLink?: EntryFields.Boolean
  isTopLink?: EntryFields.Boolean
  isBottomLink?: EntryFields.Boolean
  highlight?: EntryFields.Boolean
  workExperience?: EntryFields.Boolean
  portfolios?: EntryFields.Boolean
  passionProject?: EntryFields.Boolean
  freelance?: EntryFields.Boolean
  order: EntryFields.Integer
  contentTypeId: EntryFields.Symbol
  fields: {}
}

export type TypeCodeProject = Entry<TypeCodeProjectFields>
