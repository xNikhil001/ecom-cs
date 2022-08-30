import create from 'zustand'

const productStore = create((set) => ({
  products: [],
  getProducts: async() =>{
    const url = "https://fakestoreapi.com/products";
    const data = await fetch(url).then(data=>data.json())
    set({products:data})
  }
}))

export default productStore