import { useRef, forwardRef, useImperativeHandle, FC } from 'react'

interface Props {
    children: React.ReactNode;
}

export type Ref = HTMLDivElement;

const Layout = forwardRef<Ref, Props>(({ children, ...props }, ref) => {
  const localRef = useRef()

  useImperativeHandle(ref, () => localRef.current)

  return (
    // <div
    //   {...props}
    //   ref={localRef}
    //   className='absolute top-0 left-0 z-10 w-screen h-screen overflow-hidden dom bg-zinc-900 text-gray-50'>
    //   {children}
    // </div>
    <div
    id="layout-god-not-touch-never-forever"
      {...props}
      ref={localRef}>
        {children}
    </div>
  )
})
Layout.displayName = 'Layout'

export default Layout
