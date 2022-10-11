import { isFilled } from '@prismicio/helpers'
import { PrismicLink, PrismicText } from '@prismicio/react'
import { GetStaticProps } from 'next'
import { createClient } from '../../prismicio'
import { BookDocument } from '../../types.generated'

interface BooksPageProps {
  books: BookDocument[]
}

const TheBooksPage = ({ books }: BooksPageProps) => {
  const hasBooks = books.length > 0
  return (
    <>
      <div className="viewport">
        <div className="content-container">
          <div className="content">
            <h1>The Books</h1>
            {hasBooks && (
              <div className="books">
                {books.map((book) => (
                  <PrismicLink href={book.url} key={book.uid}>
                    <div className="book">
                      <div className="book-image"></div>
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
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .viewport {
          max-width: 1280px;
          margin: 0 auto;
        }
        .content-container {
          flex: 1;
          align-self: center;
          padding: 4vw 4vw 4vw 2vw;
        }
        .content {
          margin: 0 auto;
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
          .viewport {
            display: block;
          }
          .portrait-container {
            position: relative;
            top: unset;
            padding: 6vw 6vw 0;
            max-height: 60vh;
          }
          .content-container {
            padding: 6vw;
          }
        }
      `}</style>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData })

  try {
    const books = await client.getAllByType('book')
    return {
      props: {
        books,
      },
      revalidate: 5,
    }
  } catch {}

  return {
    notFound: true,
  }
}

export default TheBooksPage
