import Link from 'next/link'
import Head from 'next/head'
import styles from "./Navbar.module.css"
import userCart from '../store/cart'
import {useEffect,useState} from 'react'

export default function Navbar(){
  // get cart state from zustand
  const cart = userCart((state)=>state.cart)
  const [myCart,setCart] = useState([])
  useEffect(()=>{
    // add cart to local state to eliminate Nextjs render error
    setCart(cart)
  },[cart])
  return(
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/"><a className={styles.logo}>ECOMMERCE</a></Link>
          <div className="">
            <Link href="/cart">
            {/*calculate total quantity in cart and display when greater than zero*/}
              <a className={styles.cart}>
                Cart
               { myCart.length > 0 && <div className={styles.cart_count}>
                  {myCart.reduce((prev,next)=>{
                    return prev+next.qty
                   },0)}
                </div> }
              </a>
            </Link>
          </div>
        </nav>
      </header>
    </>
  )
}