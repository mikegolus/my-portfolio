import React from 'react'
import { createClient } from '../../prismicio'
import { PrismicLink, PrismicRichText, PrismicText } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import { AuthorDocument, BookDocument } from '../../types.generated'
import { asText, isFilled } from '@prismicio/helpers'
import { GetStaticPaths, GetStaticProps } from 'next'
import { buildPaths } from '../../utils/build-paths'
import { getFriendlyUrl } from '../../utils/get-friendly-url'
import { useRouter } from 'next/router'
import { SEOHead } from '../../components/seo-head'

interface AuthorPageProps {
  author?: AuthorDocument
}

const AuthorPage = ({ author }: AuthorPageProps) => {
  const router = useRouter()

  if (router.isFallback || !author) {
    return <></>
  }

  const {
    data: {
      page_title,
      seo_title,
      seo_description,
      alternate_social_sharing_image,
      portrait,
      name,
      book,
      bio,
      personal_website,
      facebook,
      twitter,
      instagram,
      good_reads,
      amazon,
      tiktok,
    },
  } = author

  const hasBook = isFilled.contentRelationship<
    'book',
    string,
    BookDocument['data']
  >(book)

  const hasLinks =
    isFilled.link(facebook) ||
    isFilled.link(twitter) ||
    isFilled.link(instagram) ||
    isFilled.link(good_reads) ||
    isFilled.link(amazon) ||
    isFilled.link(tiktok)

  return (
    <>
      <SEOHead
        pageTitle={page_title}
        seoTitle={seo_title}
        seoDescription={seo_description}
        altSocialSharingImage={alternate_social_sharing_image}
      />
      <section>
        <p>
          <PrismicLink href="/">Home</PrismicLink>
        </p>
        <PrismicNextImage field={portrait} />
        <PrismicRichText field={name} />
        <PrismicRichText field={bio} />
        {isFilled.link(personal_website) && (
          <p>
            <PrismicLink field={personal_website}>
              {getFriendlyUrl(personal_website.url || '')}
            </PrismicLink>
          </p>
        )}
        {hasLinks && (
          <p className="links">
            <PrismicLink field={facebook}>Facebook</PrismicLink>
            <PrismicLink field={twitter}>Twitter</PrismicLink>
            <PrismicLink field={instagram}>Instagram</PrismicLink>
            <PrismicLink field={good_reads}>Good Reads</PrismicLink>
            <PrismicLink field={amazon}>Amazon</PrismicLink>
            <PrismicLink field={tiktok}>TikTok</PrismicLink>
          </p>
        )}
        {hasBook && !book.isBroken && (
          <>
            {isFilled.richText(name) && (
              <h2>{`${asText(name)
                .split(' ')
                .pop()}'s contribution to the series`}</h2>
            )}
            <p>
              <PrismicLink href={book.url}>
                <PrismicText field={book.data?.title} />
              </PrismicLink>
              <br />
              {isFilled.richText(book.data?.what_its_retelling) && (
                <>
                  a retelling of{' '}
                  <em>
                    <PrismicText field={book.data?.what_its_retelling} />
                  </em>
                </>
              )}
            </p>
          </>
        )}
        <style jsx>{`
          section {
            max-width: 60ch;
            margin: 4em auto;
          }
          img {
            max-width: 100%;
          }
        `}</style>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<AuthorPageProps> = async ({
  params,
  previewData,
}) => {
  const client = createClient({ previewData })

  if (params) {
    try {
      const author = await client.getByUID('author', params.uid as string, {
        fetchLinks: ['book.title', 'book.what_its_retelling'],
      })
      return {
        props: { author },
        revalidate: 5,
      }
    } catch {}
  }

  return {
    notFound: true,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = createClient()

  const authorPages = await client.getAllByType('author')
  const paths = buildPaths(authorPages)

  return {
    paths,
    fallback: true,
  }
}

export default AuthorPage
