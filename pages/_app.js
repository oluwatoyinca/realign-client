import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import '@/styles/globals.css'
import { pageView } from '../utils/gtmHelpers'

export default function App({ Component, pageProps }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const pathToPage = `${pathname}?${searchParams}`
    const handleRouteChange = (pathToPage) => {
      pageView(pathToPage)
    }
    handleRouteChange(pathToPage)
  }, [pathname, searchParams])

  return <Component {...pageProps} />
}
