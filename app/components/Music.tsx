'use client'
import Image from 'next/image'

import { MusicProjectType } from '@/types'

// import { UseModal } from '../hooks/UseModal'

interface MusicProps {
  allMusicProjects: MusicProjectType[]
}

const Music = ({ allMusicProjects }: MusicProps) => {
  // const { toggleModal } = UseModal()

  return (
    <>
      <div className="grid grid-cols-4 gap-10">
        <div className="min-h-[128px] border border-l-0 border-r-0 border-solid py-2">
          <span className="text-4xl uppercase">music</span>
          <p className="flex flex-col text-base">
            <span>
              production
              <span className="bg-vin-rouge inline-flex h-4 w-4 rounded-full bg-vinRouge"></span>
            </span>

            <span>
              songwriting
              <span className="inline-flex h-4 w-4 rounded-full bg-red"></span>
            </span>

            <span>
              performance
              <span className="inline-flex h-4 w-4 rounded-full bg-lochmara"></span>
            </span>
          </p>
        </div>

        {allMusicProjects.map((project: MusicProjectType, key: number) => {
          const {
            wrote,
            produced,
            performed,
            title,
            artist,
            releaseDate,
            artwork,
          } = project
          return (
            <div
              className="flex min-h-[128px] flex-col items-start border border-l-0 border-r-0 border-solid py-2 transition-colors hover:text-red focus:text-red"
              key={project?.sys?.id}
            >
              <button>
                <Image
                  src={artwork?.url}
                  alt={artwork?.title}
                  height={400}
                  width={400}
                  className="h-full w-full"
                ></Image>
              </button>
              <div className="mt-2 flex w-full items-center justify-between">
                <p className="text-base">{title}</p>
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
              <p className="text-sm">{artist}</p>
              <p className="text-sm">{releaseDate}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Music
