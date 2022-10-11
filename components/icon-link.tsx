import styled from '@emotion/styled'
import { PrismicLink } from '@prismicio/react'
import { LinkField } from '@prismicio/types'
import * as Icons from '../tokens/social-icons'

export interface IconLinkProps {
  icon:
    | 'facebook'
    | 'twitter'
    | 'instagram'
    | 'good-reads'
    | 'amazon'
    | 'tiktok'
  field: LinkField
}

export const IconLink = ({ icon, field }: IconLinkProps) => (
  <>
    <StyledPrismicLink field={field}>
      {icon === 'facebook' && <Icons.FacebookIcon />}
      {icon === 'twitter' && <Icons.TwitterIcon />}
      {icon === 'instagram' && <Icons.InstagramIcon />}
      {icon === 'good-reads' && <Icons.GoodReadsIcon />}
      {icon === 'amazon' && <Icons.AmazonIcon />}
      {icon === 'tiktok' && <Icons.TikTokIcon />}
    </StyledPrismicLink>
  </>
)

const StyledPrismicLink = styled(PrismicLink)({
  display: 'block',
  borderRadius: '50%',
  border: '1px solid #ccc',
  width: 48,
})
