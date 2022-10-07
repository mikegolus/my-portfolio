import React from 'react'
import Head from 'next/head'
import * as prismicH from '@prismicio/helpers'
import { createClient } from '../../prismicio'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import { AuthorDocument } from '../../types.generated'

interface AuthorPageProps {
  author: AuthorDocument
}

const AuthorPage = ({ author }: AuthorPageProps) => (
  <>
    <Head>
      {author.data.page_title && <title>{author.data.page_title}</title>}
      {author.data.seo_title && <meta name="og:title" content={author.data.seo_title} />}
      {author.data.seo_title && <meta name="og:title" content={author.data.seo_title} />}
      {author.data.seo_description && <meta name="description" content={author.data.seo_description} />}
      {author.data.seo_description && <meta name="og:description" content={author.data.seo_description} />}
      {/* {author.data.alternate_social_sharing_image && <meta name="og:image" content={author.data.alternate_social_sharing_image.src} />} */}
    </Head>
    <section>
      <PrismicLink href="/">Home</PrismicLink>
      {author.data.portrait && <PrismicNextImage field={author.data.portrait} />}
      {author.data.name && <PrismicRichText field={author.data.name} />}
      {author.data.bio && <PrismicRichText field={author.data.bio} />}
      {/* {author.data.personal_website && <p><PrismicLink field={author.data.personal_website}>{getFriendlyUrl(author.data.personal_website.url)}</PrismicLink></p>} */}
      {(author.data.facebook || author.data.twitter || author.data.instagram || author.data.good_reads || author.data.amazon || author.data.tiktok) &&
        <p className="links">
          {author.data.facebook && <PrismicLink field={author.data.facebook}>Facebook</PrismicLink>}
          {author.data.twitter && <PrismicLink field={author.data.twitter}>Twitter</PrismicLink>}
          {author.data.instagram && <PrismicLink field={author.data.instagram}>Instagram</PrismicLink>}
          {author.data.good_reads && <PrismicLink field={author.data.good_reads}>Good Reads</PrismicLink>}
          {author.data.amazon && <PrismicLink field={author.data.amazon}>Amazon</PrismicLink>}
          {author.data.tiktok && <PrismicLink field={author.data.tiktok}>TikTok</PrismicLink>}
        </p>
      }
      <style jsx>{`
          section {
            max-width: 600px;
            margin: 4em auto;
          }
          img {
            max-width: 100%;
          }
          .links {
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
          }
      `}</style>
    </section>
  </>
)

export default AuthorPage

// Fetch content from prismic
export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData })

  const author = await client.getByUID('author', params.uid)

  return {
    props: {
      pageTitle: author.data.page_title,
      seoTitle: author.data.seo_title,
      seoDescription: author.data.seo_description,
      altSocialSharingImage: author.data.alternate_social_sharing_image,
      name: author.data.name,
      bio: author.data.bio,
      portrait: author.data.portrait,
      personalWebsite: author.data.personal_website,
      facebook: author.data.facebook,
      twitter: author.data.twitter,
      instagram: author.data.instagram,
      goodReads: author.data.good_reads,
      amazon: author.data.amazon,
      tiktok: author.data.tiktok
    },
    revalidate: 10
  }
}

// Define Paths
export async function getStaticPaths() {
  const client = createClient()

  const authorPages = await client.getAllByType('author')

  return {
    paths: authorPages.map((author) => prismicH.asLink(author)),
    fallback: true,
  }
}

// const getFriendlyUrl = (url) => {
//   let newUrl = url
//   if (url.startsWith('https://')) {
//     const https = 'https://';
//     newUrl = url.slice(https.length)
//   }

//   if (url.startsWith('http://')) {
//     const http = 'http://';
//     newUrl = url.slice(http.length)
//   }

//   if (newUrl.endsWith('/')) {
//     newUrl = newUrl.slice(0, -1)
//   }

//   return newUrl;
// }