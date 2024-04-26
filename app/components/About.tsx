import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'

import { getAboutBlock } from '@/lib/api'
import { generateRichTextParserOptions } from '@/lib/rich-text-helpers'

const About = async () => {
  const aboutBlock = await getAboutBlock()
  const { bio, firstImage, secondImage } = aboutBlock

  return (
    <div className="mx-auto mb-[90px] max-w-[1210px]">
      <Image
        src={firstImage.url}
        className="aspect-square w-[570px] object-cover"
        width={570}
        height={570}
        alt={firstImage.title}
      />
      <div className="mx-auto my-[90px] max-w-[700px] text-justify text-base">
        {bio?.content?.map((item: any) => {
          return documentToReactComponents(
            item,
            generateRichTextParserOptions(bio),
          )
        })}
      </div>
      <Image
        src={secondImage.url}
        className="ml-auto aspect-square w-[570px] object-cover"
        width={570}
        height={570}
        alt={secondImage.title}
      />
    </div>
  )
}

export default About
