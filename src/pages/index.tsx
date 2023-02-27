import { HomePage } from "@/features/next-teslo"




// Dom components go here
export default function Page(props) {
  return (
    <HomePage></HomePage>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
//Page.canvas = (props) => <Welcome scale={0.5} route='/blob' position-y={0} />

export async function getStaticProps() {
  return { props: { title: 'Index' } }
}
