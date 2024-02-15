import type { Asset, Entry } from 'contentful'

export interface TypeMoodboardFields {
  images?: Asset[]
}

export type TypeMoodboard = Entry<TypeMoodboardFields>
