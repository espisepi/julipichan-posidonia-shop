import dynamic from 'next/dynamic'
import { HomePage } from '@/features/next-teslo'

// TODO: Exportar csv para descargar desde el navegador con el contenido de la BD por si se va a chuparla la base de datos y hacer la descarga del csv todos los días con selenium
// TODO: Poner las categorias como algo generico que se puedan añadir y eliminar, no como hombre,mujer y niño
// TODO: Subir modelos 3D a un producto al igual que se suben imagenes
// TODO: Poner ProductList con Scroll de los modelos 3D

const Blob = dynamic(() => import('@/components/canvas/Blob'), { ssr: false })
const Welcome = dynamic(() => import('@/components/canvas/Welcome'), { ssr: false })

// Dom components go here
export default function Page(props) {
  return <HomePage />
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => <Welcome route='/' />

export async function getStaticProps() {
  return { props: { title: 'Index' } }
}
