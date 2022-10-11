import Link from 'next/link'
import { PrismicLink, PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '../prismicio'

import '../styles/globals.css'
import type { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => {
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
          <nav>
            <div className="logo">
              <PrismicLink href="/">A Classic Retold</PrismicLink>
            </div>
            <ul>
              <li>
                <PrismicLink href="/">Home</PrismicLink>
              </li>
              <li>
                <PrismicLink href="/books">The Books</PrismicLink>
              </li>
            </ul>
            <ul>
              <li>
                <PrismicLink href="/authors">The Authors</PrismicLink>
              </li>
              <li>
                <PrismicLink href="/get-in-touch">Get In Touch</PrismicLink>
              </li>
            </ul>
          </nav>
        </header>
        <Component {...pageProps} />
        <footer>
          <div className="footer-content">
            <div className="copyright">
              &copy;2022 A Classic Retold. All rights reserved.
            </div>
            <PrismicLink
              href="https://www.takeshape.rocks"
              className="ts-logo-wrapper"
            >
              <div className="ts-logo"></div>
              <div className="made-by">Website by TAKE SHAPE</div>
            </PrismicLink>
          </div>
        </footer>
      </PrismicPreview>
      <style jsx>{`
        header {
          position: sticky;
          top: 0;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 4rem;
          font-family: var(--serifFont);
          background: #fff;
        }
        nav {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 1280px;
          width: 100%;
        }
        header .logo {
          text-align: center;
          font-size: 24px;
        }
        header ul {
          display: flex;
          flex: 1;
          justify-content: space-evenly;
          margin: 0;
          padding: 0;
        }
        header li {
          list-style: none;
          text-align: center;
          font-size: 18px;
          font-style: italic;
          white-space: nowrap;
        }
        header li a {
          color: var(--fontColor);
          display: inline-block;
          padding: 0.4em 1.5em;
          border: 1px solid transparent;
          transition: 250ms;
        }
        header li a:hover {
          border-color: #ccc;
        }
        header ul:first-of-type {
          order: -1;
        }
        footer {
          background: #202020;
          padding: 3vw;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }
        .footer-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }
      `}</style>
    </PrismicProvider>
  )
}

export default MyApp
