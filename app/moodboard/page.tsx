import Image from 'next/image'

import { getMoodboard } from '@/lib/api'
import { altTextHelper } from '@/lib/helper-functions'

interface MoodboardImageGroup {
  url: string
  title: string
}

const Page = async () => {
  const moodboard = await getMoodboard()

  const renderGalleryRow = (
    imageGroup: MoodboardImageGroup[],
    index: number,
  ) => {
    const imageOneURL = imageGroup[0].url
    const imageOneTitle = imageGroup[0].title
    let imageTwoURL
    let imageTwoTitle

    const twoImages = imageGroup.length === 2

    if (twoImages) {
      imageTwoURL = imageGroup[1].url
      imageTwoTitle = imageGroup[1].title
    }

    return (
      <div className="grid w-full grid-cols-1 lg:grid-cols-2" key={index}>
        <div className="flex w-full items-end">
          <Image
            src={imageOneURL}
            alt={altTextHelper(imageOneTitle)}
            width={500}
            height={500}
            className="w-full"
          />
        </div>

        {twoImages ? (
          <div className="flex w-full items-end">
            <Image
              src={imageTwoURL}
              alt={altTextHelper(imageTwoTitle)}
              width={500}
              height={500}
              className="w-full"
            />
          </div>
        ) : null}
      </div>
    )
  }

  const imageMatrix = moodboard.reduce((rows, image, index) => {
    return (
      (index % 2 === 0
        ? rows.push([image])
        : rows[rows.length - 1].push(image)) && rows
    )
  }, [])

  return (
    <>
      <h1 className="visually-hidden">moodboard</h1>
      <div className="relative grid grid-cols-1 ">
        {imageMatrix.map((imageGroup, index) => {
          return renderGalleryRow(imageGroup, index)
        })}
      </div>
    </>
  )
}

export default Page
