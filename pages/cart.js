import styles from '../styles/Cart.module.css'
import {useEffect,useState} from 'react'
import userCart from '../store/cart'

export default function Cart() {
  // get all the state & functions from store as per zustand documentation
  const cart = userCart((state)=>state.cart)
  const addToCart = userCart((state)=>state.addToCart)
  const decrement = userCart((state)=>state.decrement)
  const remove = userCart((state)=>state.remove)
    
  const [myCart,setCart] = useState([])
  useEffect(()=>{
    // add cart to local state to prevent Nextjs render error
    setCart(cart)
  },[cart])
  
  // return if cart is empty
  if(myCart.length <= 0){
    return (<div className={styles.pre_render}>
      <p>Your cart is empty</p>
    </div>)
  }
  return (
    <>
      <div className={styles.cart_container}>
        <h3 className="">My Cart</h3>
        <div className={styles.cart_div}>
        {myCart.map((item)=>(
        <div className={styles.cart_card} key={item.id}>
          <div className={styles.card_top}>
            <p className="">{item.title}</p>
            <p className={styles.card_price}>₹{item.price}</p>
          </div>
          <div className={styles.card_bottom}>
            <div className={styles.btn_container}>
              <button className={styles.qty_btn} onClick={()=>decrement(item)}>-</button>
              <span className="">{item.qty}</span>
              <button className={styles.qty_btn} onClick={()=>addToCart(item)}>+</button>
            </div>
            <button className={styles.remove_btn} onClick={()=>remove(item)}>Remove</button>
          </div>
        </div>
     ))}
      </div>
        <div className={styles.total_price}>
        {/*Calculate total price from the cart*/}
        <p className="">Total: {myCart.reduce((prev,curr)=>prev+curr.price*curr.qty,0).toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR'
          })}
        </p>
      </div>
      </div>
    </>
  )
}
