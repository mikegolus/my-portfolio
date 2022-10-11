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
        <div className="landing-page">
          <div className="hero">
            <div>
              <PrismicRichText
                field={hero_heading}
                components={{ heading1: ({ children }) => <h1>{children}</h1> }}
              />
              <PrismicRichText
                field={hero_subheading}
                components={{ heading4: ({ children }) => <p>{children}</p> }}
              />
            </div>
          </div>
          <div className="content-container">
            <div className="content">
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
        </div>
      </div>
      <style jsx>{`
        .landing-page {
          width: 100%;
        }
        .hero {
          min-height: calc(100vh - 4rem);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6vw;
          background: url(https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2184&q=80);
          background-position: center;
          background-size: cover;
          color: #fff;
          text-align: center;
        }
        .hero h1 {
          margin: 0 0 0.15em;
          font-size: 72px;
        }
        .hero p {
          font-family: var(--serifFont);
          font-size: 32px;
          margin: 0;
        }
        .content-container {
          max-width: 1280px;
          margin: 0 auto;
        }
        .content {
          padding: 4vw;
        }
        @media screen and (max-width: 640px) {
          .hero h1 {
            font-size: 56px;
          }
          .hero p {
            font-size: 24px;
          }
          .content {
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
