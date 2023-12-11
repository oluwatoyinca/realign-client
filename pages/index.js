import Head from 'next/head'
import Link from 'next/link'
import { Josefin_Sans } from 'next/font/google'
import styles from '@/styles/page.module.css'

const josefinSans = Josefin_Sans({ subsets: ['latin'] })

const Page = () => {
  return (
    <>
      <Head>
        <title>Landing</title>
        <meta name="description" content="Landing Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.home} ${josefinSans.className}`}>
          <Link href="/coming-soon">Coming Soon</Link>
          <Link href="/coming-soon?utm_campaign=real_camp_123_passion_ad">Coming Soon via Passion Ad</Link>
          <Link href="/coming-soon?utm_campaign=real_camp_123_talent_ad">Coming Soon via Talent Ad</Link>
          <Link href="/admin/campaign-conversions">Admin - Campaign Conversions</Link>
          <Link href="/admin/ads-related-visits">Admin - Ads Related Visit</Link>
      </main>
    </>
  )
}

export default Page;
