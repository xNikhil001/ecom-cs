import styles from "./Layout.module.css"

export default function Footer(){
  return(
    <>
      <footer className={styles.footer}>
        <p>Copyright © {new Date().getFullYear()} ECOMMERCE</p>
      </footer>
    </>
  )
}