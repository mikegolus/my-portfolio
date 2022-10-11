import Link from 'next/link'
import { PrismicLink, PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '../prismicio'

import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider
      internalLinkComponent={({ href, ...props }) => (
        <Link href={href}>
          <a {...props} />
        </Link>
      )}
    >
      <PrismicPreview repositoryName={repositoryName}>
        <header>
          <PrismicLink href="/">A Classic Retold</PrismicLink>
        </header>
        <Component {...pageProps} />
      </PrismicPreview>
      <style jsx>{`
        header {
          position: sticky;
          top: 0;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          height: calc(4rem);
          border-bottom: 1px solid #ccc;
          font-family: var(--serifFont);
          font-size: 24px;
          background: #fff;
        }
      `}</style>
    </PrismicProvider>
  )
}

export default MyApp
