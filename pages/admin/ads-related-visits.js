import Head from 'next/head'
import { Josefin_Sans } from 'next/font/google'
import CustomTable from '@/components/CustomTable'
import styles from '@/styles/page.module.css'
import { fetchData } from '@/utils/apiHelpers'

const josefinSans = Josefin_Sans({ subsets: ['latin'] })

export async function getServerSideProps() {
    let displayData = null
    const response = await fetchData('get', 'ads-visit')
    if(response.status == 200) {
        displayData = [['time visited', 'utm campaign', 'page']]
        const responseJson = await response.json()
        responseJson.data.forEach(row => displayData.push([row.createdAt, row.utm_campaign, row.page_slug]))
    }
   
    return { props: { displayData } }
  }

const Page = ({displayData}) => {
  return (
    <>
      <Head>
        <title>Admin - View Ads related visits</title>
        <meta name="description" content="Admin - View Ads related visits" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${josefinSans.className}`} dir="ltr">
        <div className={`${styles.section}`}>
          {displayData != null ? <CustomTable viewValues={displayData}/> : 'There was an error fetching ads visit data, please try again'}
        </div>
      </main>
    </>
  )
}

export default Page;
