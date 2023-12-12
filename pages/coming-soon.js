import { useEffect } from 'react'
import Head from 'next/head'
import { Josefin_Sans } from 'next/font/google'

import { fetchData } from '@/utils/apiHelpers'
import CustomTable from '@/components/CustomTable'
import NotifyForm from '@/components/NotifyForm'
import styles from '@/styles/page.module.css'

const VALID_UTM_CAMPAIGN = 'real_camp_123'
const CONST_COMPARE = {
  'passion-test': [
      'This is the first reason',
      'This is the second reason',
      'This is the third reason',
      'This is the fourth reason',
      'This is the fifth reason'
  ],
  'talent-test': [
      'This is the first reason',
      'This is the second reason',
      'This is the third reason',
      'This is the fourth reason',
      'This is the fifth reason'
  ]
}

const josefinSans = Josefin_Sans({ subsets: ['latin'] })

export async function getServerSideProps(context) {
  const pathname = context.resolvedUrl.split('?')[0]
  const utm_campaign = Object.hasOwn(context.query, 'utm_campaign') ? context.query.utm_campaign : null
  
  return { props: { pathname, utm_campaign } }
}

const Page = ({pathname, utm_campaign}) => {
  useEffect(() => {
    const recordVisit = async () => {
      await fetchData('post', 'ads-visit', {utm_campaign, page: pathname})
    }
    if (utm_campaign != null && utm_campaign.slice(0, 13) == VALID_UTM_CAMPAIGN && performance.getEntriesByType("navigation")[0].type == 'navigate') recordVisit()
  }, [])

  return (
    <>
      <Head>
        <title>New Tests coming soon!</title>
        <meta name="description" content="Two new Career Tests coming soon!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${josefinSans.className}`} dir="ltr">
        <div className={`${styles.glow} ${styles.topglow}`}></div>
        <div className={`${styles.glow} ${styles.btglow}`}></div>
        <div className={`${styles.section} ${styles.first}`}>
          <span>Two brand new Career Tests</span>
          <span className={styles.jumbo}>Coming Soon</span>
          <span className={styles.tiny}>Scroll to learn which is perfect for you</span>
        </div>
        <div className={styles.arr}><h1>&#8595;</h1></div>
        <div className={styles.section}>
          <span>A Career following your <span className={styles.maxbold}>PASSION</span>?</span>
          <h1 className={styles.divider}><span>O R</span></h1>
          <span>A Career following your <span className={styles.maxbold}>TALENTS</span>?</span>
        </div>
        <div className={styles.arr}><h1>&#8595;</h1></div>
        <div className={styles.section}><CustomTable compareValues={CONST_COMPARE}/> </div>
        <div className={styles.arr}><h1>&#8595;</h1></div>
        <div className={styles.section}><NotifyForm/></div>
      </main>
    </>
  )
}

export default Page
