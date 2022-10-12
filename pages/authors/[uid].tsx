import React from 'react'
import { createClient } from '../../prismicio'
import { PrismicLink, PrismicRichText, PrismicText } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import { AuthorDocument, BookDocument } from '../../types.generated'
import { asText, isFilled } from '@prismicio/helpers'
import { GetStaticPaths, GetStaticProps } from 'next'
import { buildPaths } from '../../utils/build-paths'
import { getFriendlyUrl } from '../../utils/get-friendly-url'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { IconLink } from '../../components/icon-link'
import { Layout } from '../../components'

interface AuthorPageProps {
  author?: AuthorDocument
}

const AuthorPage = ({ author }: AuthorPageProps) => {
  const router = useRouter()

  if (router.isFallback || !author) {
    return <></>
  }

  const {
    data: {
      page_title,
      seo_title,
      seo_description,
      alternate_social_sharing_image,
      portrait,
      name,
      book,
      bio,
      personal_website,
      facebook,
      twitter,
      instagram,
      good_reads,
      amazon,
      tiktok,
    },
  } = author

  const hasBook = isFilled.contentRelationship<
    'book',
    string,
    BookDocument['data']
  >(book)

  const hasLinks =
    isFilled.link(facebook) ||
    isFilled.link(twitter) ||
    isFilled.link(instagram) ||
    isFilled.link(good_reads) ||
    isFilled.link(amazon) ||
    isFilled.link(tiktok)

  return (
    <Layout
      pageTitle={page_title}
      seoTitle={seo_title}
      seoDescription={seo_description}
      altSocialSharingImage={alternate_social_sharing_image}
    >
      <div className="author-content">
        <div className="portrait-container">
          <div className="portrait">
            {isFilled.image(portrait) ? (
              <PrismicNextImage
                field={portrait}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <Image
                src="https://images.prismic.io/classics-retold/e60f73a3-b06b-4935-b0ef-555ab6ec7aeb_placeholder-portrait.jpg"
                layout="fill"
                objectFit="cover"
                alt="Placeholder Portrait"
              />
            )}
          </div>
        </div>
        <div className="content-container">
          <div className="content">
            <div className="heading">
              {isFilled.richText(name) && (
                <h1>
                  <PrismicText field={name} />
                </h1>
              )}
              {isFilled.link(personal_website) && (
                <PrismicLink field={personal_website}>
                  {getFriendlyUrl(personal_website.url || '')}
                </PrismicLink>
              )}
            </div>
            <PrismicRichText field={bio} />
            {hasLinks && (
              <div className="links">
                <IconLink field={facebook} icon="facebook" />
                <IconLink field={twitter} icon="twitter" />
                <IconLink field={instagram} icon="instagram" />
                <IconLink field={good_reads} icon="good-reads" />
                <IconLink field={amazon} icon="amazon" />
                <IconLink field={tiktok} icon="tiktok" />
              </div>
            )}
            {hasBook && !book.isBroken && (
              <>
                {isFilled.richText(name) && (
                  <h2>{`${asText(name)
                    .split(' ')
                    .pop()}'s contribution to the series`}</h2>
                )}
                <PrismicLink href={book.url}>
                  <div className="book">
                    <div className="cover-container">
                      <div className="cover">
                        <Image
                          src="https://images.prismic.io/classics-retold/422a9d0d-12fa-42aa-982f-00b7c9103c28_book-cover-placeholder.jpg"
                          layout="fill"
                          objectFit="cover"
                          alt="Book Cover Placeholder"
                        />
                      </div>
                    </div>
                    <div className="book-content">
                      <h3>
                        <PrismicText field={book.data?.title} />
                      </h3>
                      {isFilled.richText(book.data?.what_its_retelling) && (
                        <>
                          a retelling of{' '}
                          <em>
                            <PrismicText
                              field={book.data?.what_its_retelling}
                            />
                          </em>
                        </>
                      )}
                    </div>
                  </div>
                </PrismicLink>
              </>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .author-content {
          display: flex;
          flex: 1;
          padding: 4vh 6vw;
        }
        .portrait-container {
          position: sticky;
          z-index: -1;
          top: 4rem;
          flex: 1;
          padding: 0 2vw 0 0;
        }
        .portrait {
          position: relative;
          height: 100%;
          overflow: hidden;
        }
        .content-container {
          flex: 1;
          align-self: center;
          padding: 0 0 0 2vw;
        }
        .content {
          max-width: 68ch;
          margin: 0 auto;
        }
        .links {
          display: flex;
          gap: 1rem;
          margin: 2rem 0;
        }
        .heading {
          margin-bottom: 2rem;
        }
        h1 {
          margin: 0 0 0.25em;
        }
        .book {
          display: flex;
          border: 1px solid #ccc;
          color: var(--fontColor);
        }
        .cover-container {
          width: 6em;
          background: #ccc;
          margin: -1px 0 -1px -1px;
        }
        .cover {
          position: relative;
          padding-bottom: 150%;
        }
        .book-content {
          padding: 2rem;
          align-self: center;
        }
        h3 {
          margin: 0;
        }
        @media screen and (max-width: 640px) {
          .author-content {
            display: block;
            flex: unset;
            padding: 4vh 6vw;
          }
          .portrait-container {
            position: relative;
            top: unset;
            padding: 0 0 100%;
            margin-bottom: 6vh;
          }
          .portrait {
            position: absolute;
            inset: 0;
          }
          .content-container {
            padding: 0;
          }
        }
      `}</style>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<AuthorPageProps> = async ({
  params,
  previewData,
}) => {
  const client = createClient({ previewData })

  if (params) {
    try {
      const author = await client.getByUID('author', params.uid as string, {
        fetchLinks: ['book.title', 'book.what_its_retelling'],
      })
      return {
        props: { author },
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

  const authorPages = await client.getAllByType('author')
  const paths = buildPaths(authorPages)

  return {
    paths,
    fallback: true,
  }
}

export default AuthorPage
