import type { Asset, Entry, EntryFields } from 'contentful'

export interface TypeMusicProjectFields {
  title?: EntryFields.Symbol
  handle: EntryFields.Symbol
  artist?: EntryFields.Symbol
  role?: EntryFields.Symbol
  wrote?: EntryFields.Boolean
  produced?: EntryFields.Boolean
  performed?: EntryFields.Boolean
  releaseDate?: EntryFields.Symbol
  releaseDateSort: EntryFields.Date
  artwork?: Asset
  order: EntryFields.Integer
  artistWebsite?: EntryFields.Symbol
  spotify?: EntryFields.Symbol
  bandcamp?: EntryFields.Symbol
  apple?: EntryFields.Symbol
  tidal?: EntryFields.Symbol
  amazon?: EntryFields.Symbol
  deezer?: EntryFields.Symbol
  napster?: EntryFields.Symbol
  googlePlay?: EntryFields.Symbol
  soundcloud?: EntryFields.Symbol
  contentTypeId: EntryFields.Symbol
  fields: {}
}

export type TypeMusicProject = Entry<TypeMusicProjectFields>
