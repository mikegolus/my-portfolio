import React from 'react'
import Head from 'next/head'
import * as prismicH from '@prismicio/helpers'
import { createClient } from '../../prismicio'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'

const AuthorPage = ({
  pageTitle,
  seoTitle,
  seoDescription,
  altSocialSharingImage,
  name,
  bio,
  portrait,
  personalWebsite,
  facebook,
  twitter,
  instagram,
  goodReads,
  amazon,
  tiktok,
}) => (
<>
  <Head>
    {pageTitle && <title>{pageTitle}</title>}
    {seoTitle && <meta name="og:title" content={seoTitle} />}
    {seoTitle && <meta name="og:title" content={seoTitle} />}
    {seoDescription && <meta name="description" content={seoDescription} />}
    {seoDescription && <meta name="og:description" content={seoDescription} />}
    {altSocialSharingImage && <meta name="og:image" content={altSocialSharingImage.src} />}
  </Head>
  <section>
    <PrismicLink href="/">Home</PrismicLink>
    {portrait && <PrismicNextImage field={portrait} />}
    {name && <PrismicRichText field={name} />}
    {bio && <PrismicRichText field={bio} />}
    {personalWebsite && <p><PrismicLink field={personalWebsite}>{getFriendlyUrl(personalWebsite.url)}</PrismicLink></p>}
    {(facebook || twitter || instagram || goodReads || amazon || tiktok) &&
      <p className="links">
        {facebook && <PrismicLink field={facebook}>Facebook</PrismicLink>}
        {twitter && <PrismicLink field={twitter}>Twitter</PrismicLink>}
        {instagram && <PrismicLink field={instagram}>Instagram</PrismicLink>}
        {goodReads && <PrismicLink field={goodReads}>Good Reads</PrismicLink>}
        {amazon && <PrismicLink field={amazon}>Amazon</PrismicLink>}
        {tiktok && <PrismicLink field={tiktok}>TikTok</PrismicLink>}
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
export async function getStaticProps({ params, previewData }) {
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

const getFriendlyUrl = (url) => {
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