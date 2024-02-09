/**
  @description - removes all special charactes (e.g. "$", "#", "-") and creates a shopify handle-like string
  * @param {string} ex: "$0 - $25"
  * @return {string} ex. "0--25"
*/
export const removeSpecialCharactersAndHandleize = (str) => {
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

export const createReadableDateFromContentful = (dateObj) => {
  const d = new Date(dateObj)
  const year = d.getFullYear()
  const month = months[d.getMonth()]
  const day = d.getDate()
  return `${month} ${getNumberWithOrdinal(day)}, ${year}`
}

const getNumberWithOrdinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export const readingTime = (str) => {
  const wpm = 225
  const words = str.trim().split(/\s+/).length
  return Math.ceil(words / wpm)
}

export const calculateReadingTimeFromContentfulContent = (arr) => {
  const textNodes = getTextNodes(arr)

  const orderedList = arr.filter((node) => {
    return node.nodeType === 'ordered-list'
  })

  const content = textNodes.map((node) => {
    return node.content
  })

  let start = ''

  orderedList[0]?.content?.map((node) => {
    if (typeof node.content[0]?.content[0]?.value === 'string') {
      start += node.content[0].content[0].value
    }

    if (Array.isArray(node.content)) {
      const tn = node.content.filter((n) => {
        return n.nodeType !== 'embedded-asset-block'
      })
      tn.map((n) => {
        n.content.map((p) => {
          start += `${p.value} `
        })
      })
    }
  })

  content.flat().map((node) => {
    if (node.value) {
      start += `${node?.value?.trim()} `
    } else if (node.content) {
      start += `${node?.content[0]?.value?.trim()} `
    }
  })

  return readingTime(start)
}

const getTextNodes = (arr) => {
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
export const altTextHelper = (str) => {
  const trim = str.trim()
  const firstLetter = trim.charAt(0).toUpperCase()

  let replaced = trim.replace(trim.charAt(0), firstLetter)

  if (replaced.charAt(replaced.length - 1) !== '.') {
    replaced = replaced.concat('.')
  }

  return replaced
}
