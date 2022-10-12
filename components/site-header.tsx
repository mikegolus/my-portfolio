import styled from '@emotion/styled'
import { PrismicLink } from '@prismicio/react'

export const SiteHeader = () => {
  return (
    <StyledSiteHeader>
      <Nav>
        <Logo href="/">A Classic Retold</Logo>
        <NavGroup>
          <LinkContainer>
            <Link href="/">Home</Link>
          </LinkContainer>
          <LinkContainer>
            <Link href="/books">The Books</Link>
          </LinkContainer>
        </NavGroup>
        <NavGroup>
          <LinkContainer>
            <Link href="/authors">The Authors</Link>
          </LinkContainer>
          <LinkContainer>
            <Link href="/get-in-touch">Get In Touch</Link>
          </LinkContainer>
        </NavGroup>
      </Nav>
    </StyledSiteHeader>
  )
}

const StyledSiteHeader = styled.header({
  flexShrink: 0,
  position: 'sticky',
  top: 0,
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '4rem',
  fontFamily: 'var(--serifFont)',
  background: '#fff',
})

const Nav = styled.nav({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: 1280,
  width: '100%',
})

const Logo = styled(PrismicLink)({
  textAlign: 'center',
  fontSize: 24,
})

const NavGroup = styled.ul({
  display: 'flex',
  flex: 1,
  justifyContent: 'space-evenly',
  margin: 0,
  padding: 0,
  '&:first-of-type': {
    order: -1,
  },
  '@media screen and (max-width: 768px)': {
    display: 'none',
  },
})

const LinkContainer = styled.li({
  listStyle: 'none',
  textAlign: 'center',
  fontSize: 18,
  fontStyle: 'italic',
  whiteSpace: 'nowrap',
})

const Link = styled(PrismicLink)({
  display: 'inline-block',
  color: 'var(--fontColor)',
  padding: '0.4em 1.5em',
  border: '1px solid transparent',
  transition: '250ms',
  '&:hover': {
    borderColor: '#ccc',
  },
})
