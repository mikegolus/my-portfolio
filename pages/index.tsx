import { createClient } from '../prismicio'
import { GetStaticProps } from 'next'
import { HomePageDocument } from '../types.generated'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import { Layout } from '../components/layout'
import styled from '@emotion/styled'
import { CodepenIcon } from '../tokens'
import Image from 'next/image'
import { keyframes } from '@emotion/react'
import Link from 'next/link'
import { PeriodicTableIcon } from '../tokens/icons/periodic-table-icon'

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
          <Avatar>
            <Image src="/mike.jpg" alt="Mike" layout="fill" />
          </Avatar>
          <Text>
            <Name>
              <PrismicRichText field={name} />
            </Name>
            <Title>Design System Guru + Frontend Dev</Title>
          </Text>
        </Header>
        <Body>
          <Section>
            <Bio>
              <PrismicRichText field={bio} />
            </Bio>
          </Section>
        </Body>
        <Footer>
          <IconLink field={codepen} data-tooltip="Codepen">
            <CodepenIcon />
          </IconLink>
          <AltIconLink
            href="https://prettierperiodictable.com"
            target="_blank"
            data-tooltip="Prettier Periodic Table"
            rel="noreferrer"
          >
            <PeriodicTableIcon />
          </AltIconLink>
        </Footer>
      </Page>
    </Layout>
  )
}

const rotate = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
})

const Page = styled.main({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gridTemplateRows: 'min-content minmax(0,1fr) min-content',
  height: '100%',
  minHeight: '100%',
  paddingTop: 'env(safe-area-inset-top)',
})

const Header = styled.header({
  paddingBlock: 'calc(var(--pagePadding) / 1.5)',
  paddingInlineStart: 'calc(var(--pagePadding) + env(safe-area-inset-left))',
  paddingInlineEnd: 'calc(var(--pagePadding) + env(safe-area-inset-right))',
  borderBottom: '0.5px solid var(--borderColor)',
  lineHeight: '1rem',
  display: 'flex',
  gap: '0.875rem',
  alignItems: 'center',
})

const Avatar = styled.div({
  position: 'relative',
  borderRadius: '50%',
  overflow: 'hidden',
  width: 44,
  height: 44,
  flexShrink: 0,
  boxShadow: '0 0 1px 0 rgba(0,0,0,1)',
  animation: `${rotate} 12s linear infinite`,
})

const Text = styled.div({
  display: 'flex',
  flex: 1,
  flexWrap: 'wrap',
  alignItems: 'baseline',
  gap: '0.3rem 2rem',
  whiteSpace: 'nowrap',
})

const Name = styled.div({
  marginRight: 'auto',
})

const Title = styled.div({
  fontSize: '0.95rem',
  color: 'var(--textColorLight)',
})

const Body = styled.div({
  position: 'relative',
  display: 'grid',
  overflowY: 'auto',
})

const Section = styled.section({
  display: 'grid',
  placeContent: 'center',
  paddingInlineStart: 'calc(var(--pagePadding) + env(safe-area-inset-left))',
  paddingInlineEnd: 'calc(var(--pagePadding) + env(safe-area-inset-right))',
})

const Bio = styled.div({
  fontSize: 'clamp(2rem, 1.2rem + 2vw, 3rem)',
  lineHeight: '1.25em',
  maxWidth: '38ch',
})

const Footer = styled.footer({
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  fontFamily: 'var(--sansSerif)',
  lineHeight: '24px',
  paddingBlock: 'var(--pagePadding)',
  paddingInlineStart: 'calc(var(--pagePadding) + env(safe-area-inset-left))',
  paddingInlineEnd: 'calc(var(--pagePadding) + env(safe-area-inset-right))',
  backgroundColor: 'var(--pageBackgroundColor)',
  borderTop: '0.5px solid var(--borderColor)',
})

const IconLink = styled(PrismicLink)({
  display: 'block',
  margin: -6,
  padding: 6,
  opacity: 0.65,
  color: 'var(--textColor)',
  '& svg': {
    width: 24,
    height: 24,
  },
  '&:hover': {
    opacity: 1,
  },
})

const AltIconLink = styled.a({
  display: 'block',
  margin: -6,
  padding: 6,
  opacity: 0.65,
  color: 'var(--textColor)',
  '& svg': {
    width: 24,
    height: 24,
  },
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
