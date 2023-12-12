import Head from 'next/head'
import { Josefin_Sans } from 'next/font/google'
import CustomTable from '@/components/CustomTable'
import styles from '@/styles/page.module.css'
import { fetchData } from '@/utils/apiHelpers'

const josefinSans = Josefin_Sans({ subsets: ['latin'] })

export async function getServerSideProps() {
  let displayData = null
  const response = await fetchData('get', 'conversions')
  if(response.status == 200) {
      displayData = [['name', 'email', 'product choice', 'status', 'notes']]
      const responseJson = await response.json()
      responseJson.data.forEach(row => displayData.push([row.name, row.email, row.product_choice, row.status, row.notes]))
  }
  
  return { props: { displayData } }
}

const Page = ({displayData}) => {
  return (
    <>
      <Head>
        <title>Admin - View Campaign Conversions</title>
        <meta name="description" content="Admin - View Campaign Conversion" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${josefinSans.className}`} dir="ltr">
        <div className={`${styles.section}`}>
          {displayData != null ? <CustomTable viewValues={displayData} editableValues={['status', 'notes']}/> : 'There was an error fetching conversion data, please try again'}
        </div>
      </main>
    </>
  )
}

export default Page;
