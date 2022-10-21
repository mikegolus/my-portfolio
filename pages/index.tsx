import { createClient } from '../prismicio'
import { GetStaticProps } from 'next'
import { HomePageDocument } from '../types.generated'
import { PrismicRichText } from '@prismicio/react'
import { Layout } from '../components/layout'
import styled from '@emotion/styled'

interface HomePageProps {
  page: HomePageDocument
}

const HomePage = ({ page }: HomePageProps) => {
  const {
    data: {
      name,
      bio,
      page_title,
      seo_title,
      seo_description,
      alternate_social_sharing_image,
    },
  } = page

  return (
    <Layout
      pageTitle={page_title}
      seoTitle={seo_title}
      seoDescription={seo_description}
      altSocialSharingImage={alternate_social_sharing_image}
    >
      <Page>
        <Header>
          <PrismicRichText field={name} />
        </Header>
        <Section>
          <Bio>
            <PrismicRichText field={bio} />
          </Bio>
        </Section>
        <Footer>&copy; 2022</Footer>
      </Page>
    </Layout>
  )
}

const Page = styled.main({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 1fr auto',
  gridTemplateAreas: '"header" "section" "footer"',
  minHeight: '100vh',
  padding: '1.25rem',
})

const Header = styled.header({
  gridArea: 'header',
})

const Section = styled.section({
  gridArea: 'section',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const Bio = styled.div({
  fontSize: 'clamp(2rem, 1.2rem + 2vw, 3rem)',
  lineHeight: '1.25em',
  maxWidth: '36ch',
})

const Footer = styled.footer({
  gridArea: 'footer',
  fontFamily: 'var(--sansSerifFont)',
})

export default HomePage

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData })

  try {
    const page = await client.getSingle('home_page')
    return {
      props: {
        page,
      },
      revalidate: 5,
    }
  } catch {}

  return {
    notFound: true,
  }
}
