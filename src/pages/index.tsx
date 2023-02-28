import dynamic from 'next/dynamic';
import { HomePage } from "@/features/next-teslo"


const Blob = dynamic(() => import('@/components/canvas/Blob'), { ssr: false })


// Dom components go here
export default function Page(props) {
  return (
    <HomePage />
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => <Blob route='/' />


export async function getStaticProps() {
  return { props: { title: 'Index' } }
}
