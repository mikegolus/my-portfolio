import { createClient } from '../prismicio'
import { GetStaticProps } from 'next'
import { HomePageDocument } from '../types.generated'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import { Layout } from '../components/layout'
import styled from '@emotion/styled'
import { CodepenIcon } from '../tokens'
import Image from 'next/image'
import { keyframes } from '@emotion/react'

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
            <Title>Frontend and Design System Engineer</Title>
          </Text>
        </Header>
        <Body>
          <Section>
            <Copy>
              <Bio>
                <PrismicRichText field={bio} />
              </Bio>
              <Work>
                <Project>
                  <ProjectLabel>Personal Project</ProjectLabel>
                  <ProjectHeading>
                    <a
                      target="_blank"
                      href="https://whichday.io"
                      rel="noreferrer"
                    >
                      WhichDay.io
                    </a>
                  </ProjectHeading>
                  <p>
                    Last December, after some less than successful attempts to
                    plan holiday get-togethers, I created an app that provides
                    easily shareable calendars to help people find which days
                    everyone is available.
                  </p>
                </Project>
                <Project>
                  <ProjectLabel>Client Project</ProjectLabel>
                  <ProjectHeading>
                    <a
                      target="_blank"
                      href="https://aclassicretold.com"
                      rel="noreferrer"
                    >
                      A Classic Retold
                    </a>
                  </ProjectHeading>
                  <p>
                    A website I built with Next.js and Prismic for a group of
                    authors to promote their joint novel series. Before the
                    release of each book the website provided countdowns and
                    preorder options to pair with social media efforts.
                  </p>
                </Project>
                <Project>
                  <ProjectLabel>Personal Project</ProjectLabel>
                  <ProjectHeading>
                    <a
                      target="_blank"
                      href="https://prettierperiodictable.com"
                      rel="noreferrer"
                    >
                      Prettier Periodic Table
                    </a>
                  </ProjectHeading>
                  <p>
                    Due to the popularity of my css periodic table on codepen, I
                    built this hobby project to become familiar with AWS
                    DynamoDB and the Framer Motion library for smooth UI
                    animations and transitions.
                  </p>
                </Project>
                <Project>
                  <ProjectLabel>Client Project</ProjectLabel>
                  <ProjectHeading>
                    <a
                      target="_blank"
                      href="https://www.worldofvindor.com"
                      rel="noreferrer"
                    >
                      World of Vindor
                    </a>
                  </ProjectHeading>
                  <p>
                    Intending to provide a more unique experience, for this
                    project I focused on creating immersive soundscapes and
                    smooth transitions between views.
                  </p>
                </Project>
              </Work>
            </Copy>
          </Section>
        </Body>
        <Footer>
          <IconLink field={codepen} data-tooltip="Codepen">
            <CodepenIcon />
          </IconLink>
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

const Copy = styled.div({
  fontSize: 'clamp(2rem, 1.2rem + 2vw, 3rem)',
  lineHeight: '1.25em',
  maxWidth: '38ch',
})

const Bio = styled.p({
  margin: 0,
  width: '100%',
})

const Work = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--pagePadding)',
  marginBottom: '2rem',
})

const Project = styled.div({
  display: 'grid',
  gap: 4,
  border: '0.5px solid var(--borderColor)',
  borderRadius: 8,
  padding: 'var(--pagePadding)',
  '& p': {
    fontSize: '0.875rem',
    lineHeight: '1.4em',
    margin: 0,
    fontFamily: 'var(--sansSerif)',
    opacity: 0.85,
  },
})

const ProjectLabel = styled.div({
  fontSize: '0.75rem',
  lineHeight: '1em',
  marginBottom: '0.25em',
  color: 'var(--textColorLight)',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
})

const ProjectHeading = styled.div({
  fontSize: '1.25rem',
  lineHeight: '1.5em',
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
