import create from 'zustand'
import { persist } from 'zustand/middleware'

/* The user cart is persisted using zustand persist middleware as per documentation to save state to localStorage, so the state is not lost when page is reloaded or navigated to other page*/

const userCart = create(persist((set,get)=>({
  cart: [],
  addToCart: (payload) =>{
    set((state)=>{
      // check if item exists in cart
      const exists = state.cart.find((item)=>item.id === payload.id)
      
      if(exists){
        /*check if payload has selected quantity*/
        if(payload.hasOwnProperty("sqty")){
          // if exists the increase the quantity by the selected quantity
          exists.qty = exists.qty + payload.sqty
        }else{
          // if not then increase quantity by 1
          exists.qty++
        }
        // return the updated state
        return {
          ...state,
          cart: [...state.cart]
        }
      }else{
        // if item doesn't exist then add to cart
        // new object is created to separate selected quantity from regular incremental quantity
        const obj = {
          id:payload.id,
          title:payload.title,
          price:payload.price,
          qty:payload.sqty
        }
        return {
          ...state,
          cart: [...state.cart,obj]
        }
      }
    })
  },
  decrement: (payload)=>{
    set((state)=>{
      const exists = state.cart.find((item)=>item.id === payload.id)
      if(exists.qty <= 1){
        // decrement quantity but not less than 1
        exists.qty = 1
      }else{
        exists.qty--
      }
      return {
        ...state,
        cart: [...state.cart]
      }
    })
  },
  remove: (payload)=>{
    set((state)=>{
      /* cart is filtered and returns new cart after removing the specific item from cart and the cart state is updated */
      const newCart = state.cart.filter((item)=>item.id !== payload.id)
      return {
        ...state,
        cart: newCart
      }
    })
  }
}),{name:'myCart'}))

export default userCart