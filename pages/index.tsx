import { SliceZone } from '@prismicio/react'
import { LandingPageDocument } from '../types.generated'

import { createClient } from '../prismicio'
import { components } from '../slices'

interface PageProps {
  page: LandingPageDocument
  previewData: LandingPageDocument
}

const Page = ({ page }: PageProps) => {
  return <SliceZone slices={page.data.slices} components={components} />
}

export default Page

export async function getStaticProps({ previewData }: PageProps) {
  const client = createClient({ previewData })

  const page = await client.getSingle('landing_page')

  return {
    props: {
      page,
    }
  }
}