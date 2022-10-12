import styled from '@emotion/styled'
import { PrismicLink } from '@prismicio/react'

export const MadeBy = () => (
  <StyledMadeBy href="https://www.takeshape.rocks">
    <Logo />
    <Text>Website by TAKE SHAPE</Text>
  </StyledMadeBy>
)

const TRANSITION_DURATION_MS = '150ms'

const StyledMadeBy = styled(PrismicLink)({
  position: 'relative',
  display: 'block',
  fontSize: 24,
  lineHeight: 1,
  opacity: 0.6,
  color: '#fff',
  transition: TRANSITION_DURATION_MS,
  '@media (hover: hover)': {
    '&:hover, &:active': { opacity: 1, color: '#fff' },
  },
})

const Logo = styled.div({
  display: 'inline-block',
  width: '1em',
  height: '1em',
  transform: 'rotate(45deg)',
  color: '#fff',
  verticalAlign: 'middle',
  marginRight: 8,
  '&::before': {
    content: '""',
    position: 'absolute',
    boxSizing: 'border-box',
    left: 0,
    bottom: 0,
    width: '0.84em',
    height: '0.84em',
    border: '0.1em solid',
    transition: TRANSITION_DURATION_MS,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    boxSizing: 'border-box',
    right: 0,
    top: 0,
    width: '0.56em',
    height: '0.56em',
    border: '0.28em solid',
    transition: TRANSITION_DURATION_MS,
  },
})

const Text = styled.div({
  display: 'inline-block',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
  fontSize: 12,
  fontWeight: 'bold',
  paddingLeft: 4,
})
