import { BlogPostListType } from '../types/index'

/**
  @description - removes all special charactes (e.g. "$", "#", "-") and creates a shopify handle-like string
  * @param {string} ex: "$0 - $25"
  * @return {string} ex. "0--25"
*/
export const removeSpecialCharactersAndHandleize = (str: string) => {
  return str
    ?.toLowerCase()
    .replace(/[/\\#,+()$~%.'":*?<>{}]/gi, '')
    .replaceAll('&', '-')
    .replaceAll(' ', '-')
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const createReadableDateFromContentful = (
  dateObj: string | number | Date | undefined,
) => {
  if (!dateObj) {
    return ''
  }

  const d = new Date(dateObj)
  const year = d.getFullYear()
  const month = months[d.getMonth()]
  const day = d.getDate()
  return `${month} ${getNumberWithOrdinal(day)}, ${year}`
}

const getNumberWithOrdinal = (n: string | number) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = Number(n) % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export const readingTime = (str: string) => {
  const wpm = 225
  const words = str.trim().split(/\s+/).length
  return Math.ceil(words / wpm)
}

export const calculateReadingTimeFromContentfulContent = (arr: any[]) => {
  const textNodes = getTextNodes(arr)

  const orderedList = arr?.filter((node) => {
    return node.nodeType === 'ordered-list'
  })

  const content = textNodes?.map((node: { content: any }) => {
    return node.content
  })

  let start = ''

  orderedList[0]?.content?.map((node: { content: any[] }) => {
    if (typeof node.content[0]?.content[0]?.value === 'string') {
      start += node.content[0].content[0].value
    }

    if (Array.isArray(node.content)) {
      const tn = node.content.filter((n) => {
        return n.nodeType !== 'embedded-asset-block'
      })
      tn?.map((n) => {
        n?.content.map((p: any) => {
          start += `${p.value} `
        })
      })
    }
  })

  content
    .flat()
    ?.map((node: { value: string; content: { value: string }[] }) => {
      if (node.value) {
        start += `${node?.value?.trim()} `
      } else if (node.content) {
        start += `${node?.content[0]?.value?.trim()} `
      }
    })

  return readingTime(start)
}

const getTextNodes = (arr: any[]) => {
  return arr.filter((node) => {
    if (
      node.nodeType !== 'embedded-asset-block' ||
      node.nodeType !== 'ordered-list' ||
      node.nodeType !== 'list-item'
    ) {
      return node
    }
  })
}

// capitalizes string and adds a period if nedded
export const altTextHelper = (str: string) => {
  const trim = str.trim()
  const firstLetter = trim.charAt(0).toUpperCase()

  let replaced = trim.replace(trim.charAt(0), firstLetter)

  if (replaced.charAt(replaced.length - 1) !== '.') {
    replaced = replaced.concat('.')
  }

  return replaced
}
