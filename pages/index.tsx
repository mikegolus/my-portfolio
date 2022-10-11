import { PrismicLink, PrismicRichText, PrismicText } from '@prismicio/react'
import {
  AuthorDocument,
  BookDocument,
  LandingPageDocument,
} from '../types.generated'

import { createClient } from '../prismicio'
import { GetStaticProps } from 'next'
import { SEOHead } from '../components/seo-head'
import { isFilled } from '@prismicio/helpers'

interface LandingPageProps {
  page: LandingPageDocument
  authors: AuthorDocument[]
  books: BookDocument[]
}

const LandingPage = ({ page, authors, books }: LandingPageProps) => {
  const {
    data: {
      hero_heading,
      hero_subheading,
      about_the_series,
      page_title,
      seo_title,
      seo_description,
      alternate_social_sharing_image,
    },
  } = page

  const hasAuthors = authors.length > 0
  const hasBooks = books.length > 0

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
          <PrismicRichText field={hero_heading} />
          <PrismicRichText
            field={hero_subheading}
            components={{ heading4: ({ children }) => <p>{children}</p> }}
          />
          <PrismicRichText field={about_the_series} />

          {hasBooks && (
            <>
              <h3>The Books</h3>
              {books.map((book) => (
                <p key={book.uid}>
                  <PrismicLink href={book.url}>
                    <PrismicText field={book.data.title} />
                  </PrismicLink>
                  <br />
                  {isFilled.richText(book.data.what_its_retelling) && (
                    <PrismicText field={book.data.what_its_retelling} />
                  )}
                </p>
              ))}
            </>
          )}

          {hasAuthors && (
            <>
              <h3>Meet the Authors</h3>
              {authors.map((author) => (
                <p key={author.uid}>
                  <PrismicLink href={author.url}>
                    <PrismicText field={author.data.name} />
                  </PrismicLink>
                </p>
              ))}
            </>
          )}
        </div>
      </div>
      <style jsx>{`
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

export default LandingPage

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData })

  try {
    const page = await client.getSingle('landing_page')
    const authors = await client.getAllByType('author')
    const books = await client.getAllByType('book')
    return {
      props: {
        page,
        authors,
        books,
      },
      revalidate: 5,
    }
  } catch {}

  return {
    notFound: true,
  }
}
