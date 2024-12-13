import { BlogPostType } from '@/types'

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

// MY CODE

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

const extractCodeProjectEntries = (fetchResponse: any): any[] => {
  return fetchResponse?.data?.codeProjectCollection?.items
}

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
  return extractCodeProjectEntries(entries).map((entry: any) => {
    return {
      ...entry,
      description: entry.description.json,
      image: entry.image,
    }
  })
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
const blogHomeBase = `
  items {
    sys {
      id
      publishedAt
    }

    title
    handle
    published

  }
`

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

// const extractBlogEntries = (fetchResponse: any): any[] => {
//   return fetchResponse?.data?.blogPostCollection?.items
// }

// export const getAllBlogList = async (): Promise<any[]> => {
//   const entries = await fetchGraphQL(
//     `query {
//         blogPostCollection(order: published_DESC) {
//           ${blogHomeBase}
//         }
//       }`,
//   )

//   return extractBlogEntries(entries)
// }

// export const getAllBlog = async (): Promise<any[]> => {
//   const pageSize = 10
//   const allBlogPosts = []
//   let skip = 0

//   while (true) {
//     const entries = await fetchGraphQL(
//       `query {
//         blogPostCollection(order: published_DESC, limit: ${pageSize}, skip: ${skip}) {
//           ${blogBase}
//         }
//       }`,
//     )

//     if (entries?.data?.blogPostCollection?.items?.length === 0) {
//       break
//     }

//     allBlogPosts.push(...extractBlogEntries(entries))
//     skip += pageSize
//   }

//   return allBlogPosts
// }

// const extractBlogEntry = (fetchResponse: any): BlogPostType => {
//   return fetchResponse?.data?.blogPostCollection?.items[0]
// }

// export const getBlogPostByHandle = async (
//   handle: string,
// ): Promise<BlogPostType> => {
//   const entry = await fetchGraphQL(
//     `query {
//       blogPostCollection(where: { handle: "${handle}" },  limit: 1) {
//         ${blogBase}
//       }
//     }`,
//   )
//   return extractBlogEntry(entry)
// }

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

export const getMoodboard = async (): Promise<any[]> => {
  const entries = await fetchGraphQL(
    `query {
      moodboard(id: "5qaYjs8UZbaw8ZFihn1Y3w") {
       ${moodboardBase}
      }
    }`,
  )
  return extractMoodboardEntries(entries)
}

// about
const imageBase = `
  title
  url
`

const aboutBase = `
  sys {
    id
  }
  name
  heroImage {
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

const extractAboutPage = (fetchResponse: any) => {
  return {
    ...fetchResponse?.data?.aboutPage,
    heroImage: fetchResponse?.data?.aboutPage.heroImage,
    contactLineOne: fetchResponse?.data?.aboutPage.contactLineOne.json,
    contactLineTwo: fetchResponse?.data?.aboutPage.contactLineTwo.json,
    bio: fetchResponse?.data?.aboutPage.bio.json,
  }
}

export const getAboutPage = async (): Promise<any> => {
  const entries = await fetchGraphQL(
    `query {
      aboutPage(id: "4s79WxHDy7QgVK7V8qomFM") {
       ${aboutBase}
      }
    }`,
  )

  return extractAboutPage(entries)
}
