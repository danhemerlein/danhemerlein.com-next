import type { Asset, Entry, EntryFields } from 'contentful'

export interface TypeMoodboardFields {
  images?: Asset[]
  contentTypeId: EntryFields.Symbol
  fields: {}
}

export type TypeMoodboard = Entry<TypeMoodboardFields>
