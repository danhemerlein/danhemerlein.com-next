import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'

import { generateRichTextParserOptions } from '@/lib/rich-text-helpers'
import { AboutPageType } from '@/types/index'

interface HeroProps {
  aboutPage: AboutPageType
}
const Hero = ({ aboutPage }: HeroProps) => {
  const { contactLineOne, contactLineTwo, bio, heroImage } = aboutPage

  if (!aboutPage) {
    throw new Error('aboutPage is undefined')
  }

  return (
    <div className="flex gap-4">
      <div className="rtc">
        {contactLineOne?.content.map((item: any) => {
          return documentToReactComponents(
            item,
            generateRichTextParserOptions(aboutPage, true),
          )
        })}

        {contactLineTwo?.content.map((item: any) => {
          return documentToReactComponents(
            item,
            generateRichTextParserOptions(aboutPage, true),
          )
        })}

        <Image
          src={heroImage?.url}
          height={500}
          width={500}
          alt={heroImage?.title}
        />
      </div>
      <div className="rtc">
        {bio?.content.map((item: any) => {
          return documentToReactComponents(
            item,
            generateRichTextParserOptions(aboutPage, true),
          )
        })}
      </div>
    </div>
  )
}

export default Hero
