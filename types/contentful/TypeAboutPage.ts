import type { Asset, Entry, EntryFields } from 'contentful'

export interface TypeAboutPageFields {
  heroImage?: Asset
  heroImagePrime?: Asset
  aboutPageImage?: Asset
  aboutPageImagePrime?: Asset
  resume?: Asset
  name: EntryFields.Symbol
  contactLineOne?: EntryFields.RichText
  contactLineTwo?: EntryFields.RichText
  bio?: EntryFields.RichText
}

export type TypeAboutPage = Entry<TypeAboutPageFields>
