import React from 'react'
import Head from 'next/head'
import * as prismicH from '@prismicio/helpers'
import { createClient } from '../../prismicio'
import { PrismicLink, PrismicRichText, PrismicText } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import { AuthorDocument, BookDocument } from '../../types.generated'

interface AuthorPageProps {
  author: AuthorDocument
}

const AuthorPage = ({ author }: AuthorPageProps) => {
  console.log(author)
  return (
  <>
    <Head>
      {author.data.page_title && <title>{author.data.page_title}</title>}
      {author.data.seo_title && <meta name="og:title" content={author.data.seo_title} />}
      {author.data.seo_title && <meta name="og:title" content={author.data.seo_title} />}
      {author.data.seo_description && <meta name="description" content={author.data.seo_description} />}
      {author.data.seo_description && <meta name="og:description" content={author.data.seo_description} />}
      {prismicH.isFilled.image(author.data.alternate_social_sharing_image) && <meta name="og:image" content={author.data.alternate_social_sharing_image.url} />}
    </Head>
    <section>
      <PrismicLink href="/">Home</PrismicLink>
      <PrismicNextImage field={author.data.portrait} />
      <PrismicRichText field={author.data.name} />
      {prismicH.isFilled.contentRelationship<'book', string, BookDocument['data']>(author.data.book) && 
        <>
          <div>
            <PrismicLink href={author.data.book.url}>
              <PrismicText field={author.data.book.data?.title} />
            </PrismicLink>
          </div>
          <div>
            a retelling of <em><PrismicText field={author.data.book.data?.what_its_retelling} /></em>
          </div>
        </>
      }
      <PrismicRichText field={author.data.bio} />
      {prismicH.isFilled.link(author.data.personal_website) && <p><PrismicLink field={author.data.personal_website}>{getFriendlyUrl(author.data.personal_website.url || '')}</PrismicLink></p>}
      <p className="links">
        <PrismicLink field={author.data.facebook}>Facebook</PrismicLink>
        <PrismicLink field={author.data.twitter}>Twitter</PrismicLink>
        <PrismicLink field={author.data.instagram}>Instagram</PrismicLink>
        <PrismicLink field={author.data.good_reads}>Good Reads</PrismicLink>
        <PrismicLink field={author.data.amazon}>Amazon</PrismicLink>
        <PrismicLink field={author.data.tiktok}>TikTok</PrismicLink>
      </p>
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
)}

export default AuthorPage

// Fetch content from prismic
export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData })

  const author = await client.getByUID('author', params.uid, {
    fetchLinks: ['book.title', 'book.what_its_retelling'],
  })

  return {
    props: {
      author
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

const getFriendlyUrl = (url: string) => {
  let newUrl = url
  if (url.startsWith('https://')) {
    const https = 'https://';
    newUrl = url.slice(https.length)
  }

  if (url.startsWith('http://')) {
    const http = 'http://';
    newUrl = url.slice(http.length)
  }

  if (newUrl.endsWith('/')) {
    newUrl = newUrl.slice(0, -1)
  }

  return newUrl;
}