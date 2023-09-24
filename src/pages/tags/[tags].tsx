import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { TagPage as TagPageTeslo } from '@/features/next-teslo'

interface Props {
  tags: string[]
}

const TagPage: NextPage<Props> = ({ tags }) => {
  return <TagPageTeslo tags={tags} />
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { tags = [] } = params as { tags: string[] }

  // if ( tags.length === 0 ) {
  //     return {
  //         redirect: {
  //             destination: '/',
  //             permanent: true
  //         }
  //     }
  // }

  return {
    props: {
      tags,
    },
  }
}

export default TagPage
