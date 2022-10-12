import React, { FC, ReactNode } from 'react'
import { SEOHead, SEOHeadProps } from './seo-head'

interface LayoutProps {
  children: ReactNode
}

export const Layout: FC<LayoutProps & SEOHeadProps> = ({
  pageTitle,
  seoTitle,
  seoDescription,
  altSocialSharingImage,
  children,
}) => (
  <>
    <SEOHead
      pageTitle={pageTitle}
      seoTitle={seoTitle}
      seoDescription={seoDescription}
      altSocialSharingImage={altSocialSharingImage}
    />
    {children}
  </>
)
