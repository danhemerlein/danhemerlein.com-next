/* eslint-disable react/destructuring-assignment */
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import Image from 'next/image'

import { altTextHelper } from './helper-functions'

export const embededAsset = (node, chilren, content) => {
  const img = content.content.links.assets.block.find((i) => {
    return i.sys.id === node.data.target.sys.id
  })

  return (
    <Image
      src={img.url}
      alt={altTextHelper(img?.title)}
      loading="lazy"
      width={500}
      height={500}
    />
  )
}

export const generateRichTextParserOptions = (content, isBlog) => {
  return {
    renderMark: {
      [MARKS.BOLD]: (text) => {
        return <b>{text}</b>
      },
      [MARKS.ITALIC]: (text) => {
        return <em>{text}</em>
      },
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        const isFigCaption =
          (typeof children[0] === 'string' && children[0]?.includes('<<<')) ||
          (children[children.length - 1] === 'string' &&
            children[children.length - 1]?.includes('>>>'))

        if (isFigCaption) {
          children[0] = children[0].replaceAll('<<<', '').replaceAll('>>>', '')
          children[children.length - 1] = children[children.length - 1]
            .replaceAll('<<<', '')
            .replaceAll('>>>', '')
        }

        return <p isFigCaption={isFigCaption}>{children}</p>
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return isBlog ? <h2>{children}</h2> : <h2>{children}</h2>
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        return isBlog ? <h3>{children}</h3> : <h3>{children}</h3>
      },
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        return embededAsset(node, children, content)
      },
      [INLINES.HYPERLINK]: ({ data }, children) => {
        return (
          <a href={data.uri} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        )
      },
    },
  }
}
