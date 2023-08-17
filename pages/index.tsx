import { createClient } from '../prismicio'
import { GetStaticProps } from 'next'
import { HomePageDocument } from '../types.generated'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import { Layout } from '../components/layout'
import styled from '@emotion/styled'
import { CodepenIcon } from '../tokens'
import Image from 'next/image'

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
      codepen,
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
        <Body>
          <Section>
            <Bio>
              <PrismicRichText field={bio} />
            </Bio>
          </Section>
        </Body>
        <Footer>
          <div>&copy; 2023</div>
          <div>
            <IconLink field={codepen}>
              <CodepenIcon />
            </IconLink>
          </div>
        </Footer>
      </Page>
    </Layout>
  )
}

const Page = styled.main({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gridTemplateRows: 'min-content minmax(0,1fr) min-content',
  height: '100%',
  minHeight: '100%',
})

const Header = styled.header({
  padding: 'var(--pagePadding)',
  borderBottom: '1px solid var(--borderColor)',
})

const Body = styled.div({
  display: 'grid',
  overflowY: 'auto',
})

const Section = styled.section({
  display: 'grid',
  placeContent: 'center',
  padding: '0px var(--pagePadding)',
})

const Bio = styled.div({
  fontSize: 'clamp(2rem, 1.2rem + 2vw, 3rem)',
  lineHeight: '1.25em',
  maxWidth: '38ch',
})

const Footer = styled.footer({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: 'var(--sansSerif)',
  lineHeight: '20px',
  padding: 'var(--pagePadding)',
  backgroundColor: 'var(--pageBackgroundColor)',
  borderTop: '1px solid var(--borderColor)',
})

const IconLink = styled(PrismicLink)({
  display: 'block',
  width: 32,
  margin: -6,
  padding: 6,
  opacity: 0.65,
  color: 'var(--textColor)',
  '&:hover': {
    opacity: 1,
  },
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
