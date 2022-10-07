import React from 'react'
import * as prismicH from '@prismicio/helpers'
import { createClient } from '../../prismicio'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import { BookDocument } from '../../types.generated'

interface BookProps {
  book: BookDocument
}

const Book = ({ book }: BookProps) => (
  <section>
    <PrismicLink href="/">Home</PrismicLink>
    {book.data.title && <PrismicRichText field={book.data.title}/>}
    {book.data.synopsis && <PrismicRichText field={book.data.synopsis}/>}
    <style jsx>{`
      section {
        margin: 4em auto;
        text-align: center;
      }
    `}</style>
  </section>
)

// Fetch content from prismic
export async function getStaticProps({ params, previewData }: any) {
  const client = createClient({ previewData })

  const book = await client.getByUID('book', params.uid)

  return {
    props: { book },
  }
}

// Define Paths
export async function getStaticPaths() {
  const client = createClient()

  const bookPages = await client.getAllByType('book')

  return {
    paths: bookPages.map((book) => prismicH.asLink(book)),
    fallback: true,
  }
}

export default Book