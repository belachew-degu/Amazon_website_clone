import React, { useEffect } from 'react'
import Banner from '../components/Home/Banner'
import Product from '../components/Home/Product'
import axios from 'axios'

function Home() {
    // useEffect(() => {
    // async function ProductData(){
    //     let data = await axios.get("https://fakestoreapi.com/products")
    //     console.log(data)
    // }
    // ProductData()
    // }, [])
  return (
    <div>
        <Banner />
        <div className='w-full -mt-10 xl:-mt-36 py-10'>
        <Product />
        </div>
    </div>
  )
}

export default Home