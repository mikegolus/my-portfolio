import { PrismicLink, PrismicRichText, PrismicText } from '@prismicio/react'
import { BookDocument, LandingPageDocument } from '../types.generated'

import { createClient } from '../prismicio'
import { GetStaticProps } from 'next'
import { isFilled } from '@prismicio/helpers'
import { PrismicNextImage } from '@prismicio/next'
import Image from 'next/image'
import { Fireflies, Section, Layout } from '../components'

interface LandingPageProps {
  page: LandingPageDocument
  books: BookDocument[]
}

const LandingPage = ({ page, books }: LandingPageProps) => {
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

  const hasBooks = books.length > 0

  return (
    <Layout
      pageTitle={page_title}
      seoTitle={seo_title}
      seoDescription={seo_description}
      altSocialSharingImage={alternate_social_sharing_image}
    >
      <div className="hero-container">
        <div className="hero">
          <Fireflies quantity={25} />
          <div>
            <PrismicRichText
              field={hero_heading}
              components={{
                heading1: ({ children }) => <h1>{children}</h1>,
              }}
            />
            <PrismicRichText
              field={hero_subheading}
              components={{ heading4: ({ children }) => <p>{children}</p> }}
            />
            <PrismicLink href="/" className="button">
              <span>Preorder the entire series</span>
            </PrismicLink>
          </div>
        </div>
      </div>
      <Section>
        <h2>About the Series</h2>
        <PrismicRichText field={about_the_series} />
      </Section>

      {hasBooks && (
        <Section>
          <h2>The Books</h2>
          <div className="books">
            {books.map((book) => (
              <PrismicLink href={book.url} key={book.uid}>
                <div className="book">
                  <div className="book-image">
                    {isFilled.image(book.data.cover) ? (
                      <PrismicNextImage field={book.data.cover} />
                    ) : (
                      <Image
                        src="https://images.prismic.io/classics-retold/422a9d0d-12fa-42aa-982f-00b7c9103c28_book-cover-placeholder.jpg"
                        layout="fill"
                        objectFit="cover"
                        alt="Book Cover Placeholder"
                      />
                    )}
                  </div>
                  <span className="book-title">
                    <PrismicText field={book.data.title} />
                  </span>
                  <br />
                  {isFilled.richText(book.data.what_its_retelling) && (
                    <PrismicText field={book.data.what_its_retelling} />
                  )}
                </div>
              </PrismicLink>
            ))}
          </div>
        </Section>
      )}
      <style jsx>{`
        .hero-container {
          position: relative;
          min-height: calc(100vh - 4rem);
          display: flex;
          padding: 0 2vw 2vw;
        }
        .hero {
          position: relative;
          flex: 1;
          background: url(https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2184&q=80);
          background-position: center;
          background-size: cover;
          padding: 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          inset: 1.5rem;
          border: 1px solid #fff;
          mix-blend-mode: overlay;
          pointer-events: none;
        }
        .hero::after {
          content: '';
          position: absolute;
          inset: 1rem;
          border: 3px solid #fff;
          mix-blend-mode: overlay;
          pointer-events: none;
        }
        .hero h1 {
          margin: 0 0 0.15em;
          font-size: 64px;
        }
        .hero p {
          font-family: var(--serifFont);
          font-size: 28px;
          margin: 0 0 2rem;
        }
        .content-container {
          max-width: 1280px;
          margin: 0 auto;
        }
        .content {
          padding: 4vw;
        }
        .book {
          color: var(--fontColor);
        }
        .books {
          display: grid;
          grid-template-columns: repeat(3, minmax(0px, 1fr));
          gap: 4rem;
        }
        @media screen and (max-width: 768px) {
          .books {
            grid-template-columns: repeat(2, minmax(0px, 1fr));
            gap: 2rem;
          }
        }
        @media screen and (max-width: 360px) {
          .books {
            grid-template-columns: repeat(1, minmax(0px, 1fr));
          }
        }
        .book-image {
          position: relative;
          padding-bottom: 150%;
          background: #ccc;
          margin-bottom: 0.5rem;
        }
        .book-title {
          color: var(--linkColor);
          font-family: var(--serifFont);
          font-size: 1.5rem;
        }
        @media screen and (max-width: 640px) {
          .hero h1 {
            font-size: 48px;
          }
          .hero p {
            font-size: 20px;
          }
          .content {
            padding: 6vw;
          }
        }
      `}</style>
    </Layout>
  )
}

export default LandingPage

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData })

  try {
    const page = await client.getSingle('landing_page')
    const books = await client.getAllByType('book')
    return {
      props: {
        page,
        books,
      },
      revalidate: 5,
    }
  } catch {}

  return {
    notFound: true,
  }
}
