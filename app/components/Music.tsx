'use client'
import cn from 'classnames'
import Image from 'next/image'

import { TypeMusicProjectFields } from '@/types/contentful'

import { UseModal } from '../hooks/UseModal'

import MusicKey from './MusicKey'

interface MusicProps {
  allMusicProjects: TypeMusicProjectFields[]
}

const Music = ({ allMusicProjects }: MusicProps) => {
  const { toggleModal } = UseModal()

  return (
    <>
      <h2 className="my-4 flex font-extrabold">music</h2>

      <MusicKey />

      {allMusicProjects.map((project, key) => {
        const { wrote, produced, performed, title, artist, releaseDate } =
          project
        return (
          <div
            className={cn(
              'flex items-start justify-between gap-2 border-b border-l border-r border-solid border-ink px-4 py-2 first-of-type:border-t',
              key === 0 && 'border-t',
            )}
            key={project?.sys?.id}
          >
            <button
              onClick={() => toggleModal(project)}
              className="flex gap-4 text-left transition-colors hover:text-red"
            >
              <Image
                src={project?.artwork?.url}
                alt={project?.artwork?.title}
                height={400}
                width={400}
                className="h-full w-24"
              ></Image>

              <span className="block">
                <span className="my-2 block font-bold">{title}</span>
                <span className="italic">by</span>
                &nbsp;{artist}&nbsp;
                <span>
                  <span className="italic">released</span>
                  &nbsp;{releaseDate}
                </span>
              </span>
            </button>

            <div className="flex gap-2">
              {wrote && <div className="h-4 w-4 rounded-full bg-red"></div>}
              {produced && (
                <div className="bg-vin-rouge h-4 w-4 rounded-full bg-vinRouge"></div>
              )}
              {performed && (
                <div className="h-4 w-4 rounded-full bg-lochmara"></div>
              )}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Music
