const POST_GRAPHQL_FIELDS = `
  slug
  title
  coverImage {
    url
  }
  date
  author {
    name
    picture {
      url
    }
  }
  excerpt
  content {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
`
const fetchGraphQL = async (query: string, preview = false): Promise<any> =>
  fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ['posts'] },
    },
  ).then((response) => response.json())

const extractPost = (fetchResponse: any): any =>
  fetchResponse?.data?.postCollection?.items?.[0]

const extractPostEntries = (fetchResponse: any): any[] =>
  fetchResponse?.data?.postCollection?.items

export const getPreviewPostBySlug = async (
  slug: string | null,
): Promise<any> => {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true,
  )
  return extractPost(entry)
}

export const getAllPosts = async (isDraftMode: boolean): Promise<any[]> => {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC, preview: ${
        isDraftMode ? 'true' : 'false'
      }) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode,
  )
  return extractPostEntries(entries)
}

export const getPostAndMorePosts = async (
  slug: string,
  preview: boolean,
): Promise<any> => {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
        preview ? 'true' : 'false'
      }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  )
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
        preview ? 'true' : 'false'
      }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  )
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  }
}

// code projects
const codeProjectBase = `
  items {
    sys {
      id
    }

    title
    link
    timelineLaunchDate

    description {
      json
    }

    image {
      url
      title
    }

    isListLink
    isTopLink
    isBottomLink
    highlight

    workExperience
    portfolios
    passionProject
    freelance
  }
`

const extractCodeProjectEntries = (fetchResponse: any): any[] =>
  fetchResponse?.data?.codeProjectCollection?.items

export const getAllCodeProjects = async (
  isDraftMode: boolean,
): Promise<any[]> => {
  const entries = await fetchGraphQL(
    `query {
      codeProjectCollection(order: order_ASC preview: ${
        isDraftMode ? 'true' : 'false'
      }) {
       ${codeProjectBase}
      }
    }`,
    isDraftMode,
  )
  return extractCodeProjectEntries(entries)
}

// music projects
const musicSysBase = `
  sys {
    id
  }

  performed
  produced
  wrote

  artist
  role
  handle
  title
  artwork {
    title
    url
  }
`

const musicProjectBase = `
  items {
    ${musicSysBase}

    releaseDate

    spotify
    bandcamp
    apple
    tidal
    amazon
    deezer
    napster
    googlePlay
    soundcloud
  }
`

const extractMusicProjectEntries = (fetchResponse: any): any[] =>
  fetchResponse?.data?.musicProjectCollection?.items

export const getAllMusicProjects = async (
  isDraftMode: boolean,
): Promise<any[]> => {
  const entries = await fetchGraphQL(
    `query {
      musicProjectCollection(order: order_ASC preview: ${
        isDraftMode ? 'true' : 'false'
      }) {
       ${musicProjectBase}
      }
    }`,
    isDraftMode,
  )
  return extractMusicProjectEntries(entries)
}

// blog

const blogSysBase = `
  sys {
    id
    publishedAt
  }

  title
  description
  handle
  published

  coverImage {
    title
    url
  }
`

const blogBase = `
  items {
    ${blogSysBase}

    content {
      json
      links {
        assets {
          block {
            title
            url
            sys {
              id
            }
          }
        }
      }
    }
  }
`

const extractBlogEntries = (fetchResponse: any): any[] =>
  fetchResponse?.data?.blogPostCollection?.items

export const getAllBlog = async (isDraftMode: boolean): Promise<any[]> => {
  const entries = await fetchGraphQL(
    `query {
      blogPostCollection(order: published_DESC preview: ${
        isDraftMode ? 'true' : 'false'
      },limit: 10) {
       ${blogBase}
      }
    }`,
    isDraftMode,
  )
  return extractBlogEntries(entries)
}

// mooboard

const moodboardBase = `
  sys {
    id
  }

  imagesCollection {
    total
    items {
      title
      url
    }
  }
`

const extractMoodboardEntries = (fetchResponse: any): any[] => {
  return fetchResponse?.data?.moodboard?.imagesCollection.items
}

export const getMoodboard = async (isDraftMode: boolean): Promise<any[]> => {
  const entries = await fetchGraphQL(
    `query {
      moodboard(id: "5qaYjs8UZbaw8ZFihn1Y3w" preview: ${
        isDraftMode ? 'true' : 'false'
      }) {
       ${moodboardBase}
      }
    }`,
    isDraftMode,
  )
  return extractMoodboardEntries(entries)
}

// about

const imageBase = `
  title
  url

  sys {
    id
  }
`

const aboutBase = `
  sys {
    id
  }

  heroImage {
    ${imageBase}
  }

  heroImagePrime {
    ${imageBase}
  }

  aboutPageImage {
    ${imageBase}
  }

  aboutPageImagePrime {
    ${imageBase}
  }

  contactLineOne {
    json
  }
  contactLineTwo {
    json
  }

  bio {
    json
  }

`

const extractAboutPage = (fetchResponse: any): any[] => {
  return fetchResponse?.data?.aboutPage
}

export const getAboutPage = async (isDraftMode: boolean): Promise<any[]> => {
  const entries = await fetchGraphQL(
    `query {
      aboutPage(id: "4s79WxHDy7QgVK7V8qomFM" preview: ${
        isDraftMode ? 'true' : 'false'
      }) {
       ${aboutBase}
      }
    }`,
    isDraftMode,
  )
  return extractAboutPage(entries)
}
