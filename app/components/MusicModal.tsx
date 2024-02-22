'use client'
import ReactModal from 'react-modal'
import cn from 'classnames'
import Image from 'next/image'

import { UseModal } from '../hooks/UseModal'

const Modal = () => {
  const { isModalOpen, toggleModal, project } = UseModal()

  if (!project) return null
  const { title, artwork, artist } = project
  const linkKeys = [
    'spotify',
    'bandcamp',
    'apple',
    'tidal',
    'amazon',
    'deezer',
    'napster',
    'googlePlay',
    'soundcloud',
  ]

  const linkArray = [] as { title: string; link: string }[]

  linkKeys.map((key) => {
    if (project[key] !== null) {
      linkArray.push({
        title: key,
        link: project[key],
      })
    }
  })

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={() => toggleModal(null)}
      className={{
        base: cn(
          'transition-cubic-bezier relative flex min-h-[32rem] w-[32rem] items-center justify-center  bg-reverse p-4 font-lack text-ink opacity-0 duration-500 lg:p-24',
        ),
        afterOpen: '!translate-y-0 !opacity-100',
        beforeClose: '!translate-y-full',
      }}
      overlayClassName="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-ink bg-opacity-50 z-50 p-4 lg:p-24 opacity-100"
    >
      <div className="flex w-full flex-col">
        <Image
          src={artwork.url}
          alt={artwork.title}
          height={400}
          width={400}
          className="h-full w-full"
        ></Image>
        <div className="flex justify-between">
          <div>
            <p className="my-1">{title}</p>
            <p className="my-1">{artist}</p>
          </div>
          <div>
            <p className="my-1">{project?.releaseDate}</p>
          </div>
        </div>

        {linkArray.map((link) => {
          return (
            <a
              key={link.link}
              className="my-1 cursor-pointer text-center  lowercase italic underline decoration-dotted underline-offset-2 transition-colors hover:text-red focus:text-red"
              target="_blank"
              href={link.link}
            >
              {link.title}
            </a>
          )
        })}
      </div>
    </ReactModal>
  )
}
export default Modal
