import Image from 'next/image'

import { getEditorialBlock } from '@/lib/api'

import Button from './Button'
interface EditorialBlock {
  title: string
  subtitle: string
  ctaText: string
  image: {
    url: string
    title: string
  }
}

const EditorialBlock = ({
  title,
  subtitle,
  image,
  ctaText,
}: EditorialBlock) => (
  <div>
    <Image
      src={image.url}
      className="aspect-square w-full object-cover"
      width={600}
      height={600}
      alt={image.title}
    />
    <h2 className="mt-2 text-lg">{title}</h2>
    <p className="text-base">{subtitle}</p>
    <Button styles="mt-2" cta={ctaText} />
  </div>
)

const TwoUpEditorial = async () => {
  const editorial = await getEditorialBlock()
  const {
    title,
    subtext,
    ctaText,
    image,
    secondTitle,
    secondSubtitle,
    secondImage,
    secondCtaText,
  } = editorial

  return (
    <div className="mx-auto my-[90px] grid max-w-[1210px] grid-cols-2 gap-[70px]">
      <EditorialBlock
        title={title}
        subtitle={subtext}
        image={image}
        ctaText={ctaText}
      />
      <EditorialBlock
        title={secondTitle}
        subtitle={secondSubtitle}
        image={secondImage}
        ctaText={secondCtaText}
      />
    </div>
  )
}

export default TwoUpEditorial
