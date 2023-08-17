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
        <Section>
          <Bio>
            <PrismicRichText field={bio} />
          </Bio>
        </Section>
        <Footer>
          <div>&copy; 2023</div>
          <div>
            <IconLink field={codepen}>
              <CodepenIcon />
            </IconLink>
          </div>
        </Footer>
      </Page>
      <ImageContainer>
        <Image
          alt=""
          layout="fill"
          objectFit="cover"
          src="/paris-mountain-state-park.jpg"
        />
      </ImageContainer>
    </Layout>
  )
}

const Page = styled.main({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 1fr auto',
  gridTemplateAreas: '"header" "section" "footer"',
  minHeight: '100vh',
  '@media screen and (min-width:768px)': {
    paddingRight: '33.33vw',
  },
})

const ImageContainer = styled.div({
  position: 'fixed',
  zIndex: -1,
  right: 0,
  top: 0,
  bottom: 0,
  width: '33.33vw',
  '@media screen and (max-width:767px)': {
    width: '100vw',
    opacity: 0.15,
  },
})

const Header = styled.header({
  gridArea: 'header',
  padding: 'var(--pagePadding)',
})

const Section = styled.section({
  gridArea: 'section',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px var(--pagePadding)',
})

const Bio = styled.div({
  fontSize: 'clamp(1.5rem, 1.25rem + 1.1111vw, 2.25rem)',
  lineHeight: '1.25em',
  maxWidth: '38ch',
})

const Footer = styled.footer({
  position: 'sticky',
  zIndex: 1,
  bottom: 0,
  gridArea: 'footer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: 'var(--sansSerif)',
  lineHeight: '20px',
  padding: 'var(--pagePadding)',
  backgroundColor: 'var(--pageBackgroundColor)',
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
