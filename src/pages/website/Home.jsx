import React, { useContext, useEffect, useState } from 'react'
import Container from '../../components/Container'
import { Context } from '../../ContextHolder';
import ProductBox from '../../components/website/ProductBox';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";


export default function Home() {
  const { fetchCategories,fetchProducts,products, categories } =useContext(Context);

  useEffect(
    () => {
      fetchCategories();
      fetchProducts();
    },[]
  )
  
  return (
   <>
   <div className='h-[400px] md:h-[500px] lg:h-[650px] my-2 md:my-6 banner-bg relative'>
   <img src="images/2_corousel.png"  className="h-[400px] absolute lg:h-[100%] right-0 bottom-0"alt="" /></div>
   <Container>
    <BestSeller categories={categories} products={products}/>
   </Container>
     
     <Container>
     <div className='w-full h-[340px] bg-[#2E90E5] relative'>
            <div className='p-10'>
              <div className='text-[42px] text-[#FFFFFF] '>iPhone 6 Plus</div>
              <div className='text-[16px] text-[#FFFFFF] py-3'>Performance and design. Taken right <br />to the edge.</div>
              <div className='text-[14px] w-[75px] text-center fonts-semibold border-b-4 border-[#FFFFFF]-500 text-[#FFFFFF] py-2'>Shop Now</div>
            </div>
            <img src="images/iphone_8.png" alt="" className='absolute bottom-0 md:top-0 right-0 w-[200px] md:w-[365px] h-full ' />
          </div>
          </Container>
      <Container className='grid grid-cols md:grid-cols-3 my-[60px] text-center gap-2'>
        <div>
          <div className='flex justify-center'><img src="images/shipping.svg" alt="" /></div>
          <h1 className='text-2xl font-bold py-2'>FREE SHIPPING</h1>
          <p className='text-[14px] px-2 text-[#22262A]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam, quis nostrud reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
        </div>
        <div>
          <div className='flex justify-center'><img src="images/refund.svg" alt="" /></div>
          <h1 className='text-2xl font-bold py-2'>100% REFUND</h1>
          <p className='text-[14px] px-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam, quis nostrud reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
        </div>
        <div>
          <div className='flex justify-center'><img src="images/support.svg" alt="" /></div>
          <h1 className='text-2xl font-bold py-2'>SUPPORT 24/7</h1>
          <p className='text-[14px] px-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam, quis nostrud reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
        </div>
      </Container>

      <Container>
       <h1 className='font-bold font-5xl flex justify-center'>FEATURED PRODUCTS</h1>
       <Slider  products={products}/>
      </Container>
   </>
   
      )
}



function BestSeller({categories, products}){
  const [selected_cat, setSeletedCat] = useState(null);

  const filteredProducts = selected_cat ? products.filter(prod => prod.category === selected_cat) : products;
  // if(selected_cat !== 0){
  //   products = products.filter(
  //     (prod) => prod.category === selected_cat
  //   )
  // }

  return(
    <div className='p-3'>
    <h3 className='text-[30px] font-[600] text-center my-3 uppercase '>Best Seller</h3>
    <ul className='hidden md:flex justify-center gap-3'>
      <li className='cursor-pointer' onClick={() => setSeletedCat(null)}>All</li>
      {
        categories.map(
          (cat, i) => {
          return <li className='cursor-pointer' onClick={() => setSeletedCat(cat._id)} key={i}>{cat.name}</li>
          }
        )
      }
    </ul>
    <select onChange={(e) => setSeletedCat(e.target.value)} className='md:hidden w-full border p-3 text-center'>
      <option value={null}>All</option>
      {
      categories.map(
          (cat, i) => {
          return <option key={i} value={cat._id}>{cat.name}</option>
          }
        )
      }
    </select>
    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-3 mt-4">
      {
        filteredProducts.map(
          (prod) => {
            return  <ProductBox key={prod._id} {...prod} />
          }
        )
      }
     
    </div>
    </div>
  )
  
}


const Slider = ({ products}) => {
  const { productImageBaseUrl } = useContext(Context);
  const [data, setData] = useState(0);

  const nextData = (flag) => {
    if (flag) {
      if (data === products.length - 3) return false;
      setData(data + 1)
    } else {
      if (data === 0) return false;
      setData(data - 1)
    }
  }
  return (
    <Container className="my-6 z-0 pb-7 ">
    <div className='text-[24px] font-bold relative'>
      <IoIosArrowForward fontSize={50} onClick={() => nextData(true)}  className='r-arrow md:block md:top-[45px] md:right-[120px] z-[9999]'/>
        <IoIosArrowBack  fontSize={50} onClick={() => nextData(false)} className='l-arrow md:block md:top-[45px] md:left-[120px]' />
    </div>
    <div className="max-w-[750px]  md:w-[820px] mx-auto flex overflow-x-hidden mt-[50px] ">
      {
        products.map(
          (d, index) => {
            return (
              <div key={index} className='w-[250px] duration-300 hover:scale-125 m-3 shadow-lg  shrink-0' style={{
                transform: `translateX(-${data * 100}%)`
              }}>
                <div className='grid grid-cols-2 '>
                <div>
                <img src={process.env.REACT_APP_API_BASE_URL+productImageBaseUrl+d.image} className='shadow-lg m-2' alt="" />
                </div> 
                <div>
                <div className='text-[14px] text-[#262626]'>{d.name}</div>
                <div >
                  <span className='text-[#ff4858]'>${d.final_price}</span> $<span className='line-through'>{d.original_price}</span></div>
                </div>
                </div>
 </div>
            )
          }
        )}
    </div>
  </Container>
  )
}

