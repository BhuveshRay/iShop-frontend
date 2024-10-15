import React, { useContext } from 'react'
import { FaStar } from "react-icons/fa6";
import { Context } from '../../ContextHolder';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../reducers/CartSlice';

export default function ProductBox( {_id: product_id, name, slug, category, image,final_price,original_price,discount_percent}) {
  const {productImageBaseUrl} =useContext(Context);
  const dispatcher = useDispatch();
  return (
    <div className="p-3 rounded-[4px] relative" style={{
      border:'3px solid #F6F7F8'
    }}>
      {
        discount_percent !== 0 ? <div className=' absolute bg-[#ff4858] p-2 top-0 left-0 text-white text-[12px]'>{discount_percent}% off</div> : ''
      }
      
      <img src={process.env.REACT_APP_API_BASE_URL + productImageBaseUrl + "/" +image} className='block mx-auto !w-[240px] !h-[150px]' alt="" />
       <Link to={`/product/${category}/${slug}`}>    {/*//category.slug */}
      <div className='text-center mt-5 font-[600]'>{name}</div>
      <Stars/>
      </Link >
      <div className='text-center flex justify-center gap-2 mt-2'>
        {
          final_price === original_price 
          ? <span className='text-[#FF4858]'>${final_price}</span> :
          <>
          <span className='text-[#FF4858]'>${final_price}</span>
          <del className='text-[#C1C8CE]'>${original_price}</del>
          </>
        }
      </div>
      <button onClick={
        () => dispatcher(addToCart(
        { pId: product_id, price: final_price === original_price ? original_price : final_price}
        ))
        } className='p-2 hover:bg-blue-500 hover:text-white border my-3  mx-auto block'>Add to cart</button>
  </div>
  )
}

function Stars({yellow}){
    let stars =[];
    for(var i=1; i<= 5; i++){
      if(i<=yellow){
        stars.push(<FaStar color='#FFC600'/>);
      }else{
        stars.push(<FaStar color='#C1C8CE'/>);
      }
    }
    
    return <div className='flex justify-center mt-[20px]'>{stars}</div>
  }