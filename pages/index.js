import styles from '../styles/Home.module.css'
import {useEffect,useState} from 'react'
import productStore from '../store'
import userCart from '../store/cart'

export default function Home() {
  /* get products and state from store */
  const products = productStore((state)=>state.products)
  const getProducts = productStore((state)=>state.getProducts)
  const cart = userCart((state)=>state.cart)
  const addToCart = userCart((state)=>state.addToCart)
  
  // set quantity onChange 
  const [qty,setQty] = useState(1)
  useEffect(()=>{
    // fetch products from api and save to store
    getProducts()
  },[])
  return (
    <>
      <div className={styles.home_container}>
        { products && products.map((item)=>{
          return(
            <div className={styles.product} key={item.id}>
              <div className={styles.product_top}>
                <img src={item.image} alt={item.title} width="80px" height="80px" className={styles.product_img}/>
                <div className={styles.product_top_info}>
                  <h4 className={styles.product_title}>{item.title}</h4>
                  <p className={styles.product_category}>
                    {item.category}
                  </p>
                </div>
                <div className={styles.product_desc}>
                  {item.description}
                </div>
              </div>
              <div className={styles.product_bottom}>
                <p className={styles.product_price}>₹{item.price}</p>
                <div className={styles.add_to_cart}>
                  <select name="" className={styles.select_qty} onChange={(e)=>setQty(e.target.value)}>
                    { [...Array(5)].map((_,index) => <option key={index+1} value={index+1}>{index+1}</option>)}
                  </select>
                  <button className={styles.button} onClick={()=>addToCart({id:item.id,title:item.title,price:item.price,qty:1,sqty:+qty})}>Add to cart</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
