import React, { FC, ReactNode } from 'react'
import styled from '@emotion/styled'

interface ViewportProps {
  children: ReactNode
}

export const Viewport: FC<ViewportProps> = ({ children }) => (
  <StyledViewport>{children}</StyledViewport>
)

const StyledViewport = styled.main({
  display: 'flex',
  width: '100%',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'stretch',
  isolation: 'isolate',
})
