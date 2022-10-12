import React, { FC, ReactNode } from 'react'
import styled from '@emotion/styled'

interface SectionProps {
  children: ReactNode
  isFullWidth?: boolean
}

export const Section: FC<SectionProps> = ({ children, isFullWidth }) => (
  <StyledSection>
    <ContentWrapper>
      {isFullWidth ? (
        children
      ) : (
        <BoundedContent isFullWidth={isFullWidth}>{children}</BoundedContent>
      )}
    </ContentWrapper>
  </StyledSection>
)

const StyledSection = styled.section({
  padding: '0 2vw',
})

const ContentWrapper = styled.div({
  padding: '4vh 4vw',
})

const BoundedContent = styled.div<{
  isFullWidth?: boolean
}>(({ isFullWidth }) => ({
  ...(!isFullWidth && { maxWidth: 1024, margin: '0 auto' }),
}))
