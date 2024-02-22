import type { Asset, Entry, EntryFields } from 'contentful'

export interface TypeAboutPageFields {
  heroImage?: Asset
  heroImagePrime?: Asset
  aboutPageImage?: Asset
  aboutPageImagePrime?: Asset
  resume?: Asset
  name?: EntryFields.Symbol
  contactLineOne?: any
  contactLineTwo?: any
  bio?: any
  contentTypeId?: EntryFields.Symbol
  fields?: {}
}
