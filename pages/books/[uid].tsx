import React from 'react'
import { createClient } from '../../prismicio'
import { PrismicLink, PrismicRichText, PrismicText } from '@prismicio/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { AuthorDocument, BookDocument } from '../../types.generated'
import { useRouter } from 'next/router'
import { buildPaths } from '../../utils/build-paths'
import { isFilled } from '@prismicio/helpers'
import { PrismicNextImage } from '@prismicio/next'
import { SEOHead } from '../../components/seo-head'

interface BookPageProps {
  book?: BookDocument
}

const Book = ({ book }: BookPageProps) => {
  const router = useRouter()

  if (router.isFallback || !book) {
    return <></>
  }

  const {
    data: {
      title,
      what_its_retelling,
      synopsis,
      amazon_link,
      cover,
      author,
      page_title,
      seo_title,
      seo_description,
      alternate_social_sharing_image,
    },
  } = book

  const hasAuthor = isFilled.contentRelationship<
    'author',
    string,
    AuthorDocument['data']
  >(author)

  return (
    <>
      <SEOHead
        pageTitle={page_title}
        seoTitle={seo_title}
        seoDescription={seo_description}
        altSocialSharingImage={alternate_social_sharing_image}
      />
      <div className="viewport">
        <div className="content-container">
          <PrismicNextImage field={cover} />
          <PrismicRichText field={title} />
          {isFilled.richText(what_its_retelling) && (
            <p>
              a retelling of{' '}
              <em>
                <PrismicText field={what_its_retelling} />
              </em>
            </p>
          )}
          {hasAuthor && (
            <>
              by{' '}
              <PrismicLink href={author.url}>
                <PrismicText field={author.data?.name} />
              </PrismicLink>
            </>
          )}
          {isFilled.link(amazon_link) && (
            <p>
              <PrismicLink field={amazon_link}>Buy it on Amazon</PrismicLink>
            </p>
          )}
          <PrismicRichText field={synopsis} />
        </div>
      </div>
      <style jsx>{`
        .viewport {
          max-width: 1280px;
          margin: 0 auto;
        }
        .content-container {
          padding: 4vw;
        }
        @media screen and (max-width: 640px) {
          .content-container {
            padding: 6vw;
          }
        }
      `}</style>
    </>
  )
}

export const getStaticProps: GetStaticProps<BookPageProps> = async ({
  params,
  previewData,
}) => {
  const client = createClient({ previewData })

  if (params) {
    try {
      const book = await client.getByUID('book', params.uid as string, {
        fetchLinks: ['author.name'],
      })
      return {
        props: { book },
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

  const bookPages = await client.getAllByType('book')
  const paths = buildPaths(bookPages)

  return {
    paths,
    fallback: true,
  }
}

export default Book
