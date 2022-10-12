import styled from '@emotion/styled'
import { MadeBy } from './made-by'

export const SiteFooter = () => (
  <StyledSiteFooter>
    <FooterContent>
      <div>&copy;2022 A Classic Retold. All rights reserved.</div>
      <MadeBy />
    </FooterContent>
  </StyledSiteFooter>
)

const StyledSiteFooter = styled.footer({
  display: 'flex',
  background: '#202020',
  padding: '3vw',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
})

const FooterContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'center',
})
