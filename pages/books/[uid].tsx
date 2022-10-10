import React from 'react'
import { createClient } from '../../prismicio'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { BookDocument } from '../../types.generated'
import { useRouter } from 'next/router'
import { buildPaths } from '../../utils/build-paths'

interface BookPageProps {
  book?: BookDocument
}

const Book = ({ book }: BookPageProps) => {
  const router = useRouter()

  if (router.isFallback || !book) {
    return <></>
  }

  const {
    data: { title, synopsis },
  } = book

  return (
    <section>
      <PrismicLink href="/">Home</PrismicLink>
      <PrismicRichText field={title} />
      <PrismicRichText field={synopsis} />
      <style jsx>{`
        section {
          margin: 4em auto;
          text-align: center;
        }
      `}</style>
    </section>
  )
}

export const getStaticProps: GetStaticProps<BookPageProps> = async ({
  params,
  previewData,
}) => {
  const client = createClient({ previewData })

  if (params) {
    try {
      const book = await client.getByUID('book', params.uid as string)
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
