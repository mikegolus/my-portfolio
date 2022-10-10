import { PrismicLink, PrismicText, SliceZone } from '@prismicio/react'
import { AuthorDocument, LandingPageDocument } from '../types.generated'

import { createClient } from '../prismicio'
import { components } from '../slices'
import { GetStaticProps } from 'next'

interface LandingPageProps {
  page: LandingPageDocument
  authors: AuthorDocument[]
}

const LandingPage = ({ page, authors }: LandingPageProps) => {
  return (
    <>
      <SliceZone slices={page.data.slices} components={components} />
      <section>
        {authors.map((author) => (
          <div key={author.uid}>
            <PrismicLink href={author.url}>
              <PrismicText field={author.data.name} />
            </PrismicLink>
          </div>
        ))}
      </section>
      <style jsx>{`
        section {
          max-width: 600px;
          margin: 4em auto;
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
    return {
      props: {
        page,
        authors,
      },
      revalidate: 5,
    }
  } catch {}

  return {
    notFound: true,
  }
}
