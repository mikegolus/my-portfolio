import { PrismicLink, PrismicText, SliceZone } from '@prismicio/react'
import { LandingPageDocument } from '../types.generated'

import { createClient } from '../prismicio'
import { components } from '../slices'

const Page = ({ page, authors }) => {
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

export default Page

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData })

  const page = await client.getSingle('landing_page')
  const authors = await client.getAllByType('author')

  return {
    props: {
      page,
      authors,
    },
    revalidate: 10
  }
}