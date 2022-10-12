import { PrismicLink, PrismicText } from '@prismicio/react'
import { GetStaticProps } from 'next'
import { Layout, Section } from '../../components'
import { createClient } from '../../prismicio'
import { AuthorDocument } from '../../types.generated'

interface AuthorsPageProps {
  authors: AuthorDocument[]
}

const TheAuthorsPage = ({ authors }: AuthorsPageProps) => {
  const hasAuthors = authors.length > 0
  return (
    <Layout>
      <Section>
        <h1>Meet the Authors</h1>
        {hasAuthors && (
          <>
            {authors.map((author) => (
              <p key={author.uid}>
                <PrismicLink href={author.url}>
                  <PrismicText field={author.data.name} />
                </PrismicLink>
              </p>
            ))}
          </>
        )}
      </Section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData })

  try {
    const authors = await client.getAllByType('author')
    return {
      props: {
        authors,
      },
      revalidate: 5,
    }
  } catch {}

  return {
    notFound: true,
  }
}

export default TheAuthorsPage
