import Link from 'next/link'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import styles from "./Layout.module.css"

/* Layout Component is used to display common component like Navbar & Footer on every page*/

export default function Layout({children}){
  return(
    <>
      <Head>
        <title>E-COMMERCE</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Buy the products at best price!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.container}>{children}</main>
      <Footer />
    </>
  )
}