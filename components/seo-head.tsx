import { isFilled } from '@prismicio/helpers'
import { ImageField, KeyTextField } from '@prismicio/types'
import Head from 'next/head'

export interface SEOHeadProps {
  pageTitle?: KeyTextField
  seoTitle?: KeyTextField
  seoDescription?: KeyTextField
  altSocialSharingImage?: ImageField
}

export const SEOHead = ({
  pageTitle,
  seoTitle,
  seoDescription,
  altSocialSharingImage,
}: SEOHeadProps) => (
  <Head>
    {isFilled.keyText(pageTitle) && <title>{pageTitle}</title>}
    {isFilled.keyText(seoTitle) && <meta name="og:title" content={seoTitle} />}
    {isFilled.keyText(seoDescription) && (
      <>
        <meta name="description" content={seoDescription} />
        <meta name="og:description" content={seoDescription} />
      </>
    )}
    {isFilled.image(altSocialSharingImage) && (
      <meta name="og:image" content={altSocialSharingImage.url} />
    )}
  </Head>
)
