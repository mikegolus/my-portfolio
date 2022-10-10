import { asLink } from '@prismicio/helpers'
import { PrismicDocument } from '@prismicio/types'

export const buildPaths = (
  pages: PrismicDocument<Record<string, any>, string, string>[]
) => {
  return pages.map((page) => asLink(page)).filter((path) => path) as string[]
}
