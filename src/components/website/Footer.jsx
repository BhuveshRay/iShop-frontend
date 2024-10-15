import React from 'react'
import Container from '../Container'
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
export default function Footer() {
  return (
    <Container >
      <div className='py-10 mt-5 border-y-2 border-gray-300 grid grid-cols-2 sm:grid-cols-3 mt-[10px] gap-4 py-5'>
        <div  className='px-[20px]'>
          <img src="images/ishop.svg" alt="ishop logo" />
          <p className='text-[#22262A] text-[12px] mt-3 '>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.Since the 1500s, when an unknown printer.</p>
        </div>
        <div className='text-[#22262A] px-[20px]'>
          <h1 className='text-xl font-bold'>Follow Us</h1>
          <p className='text-[12px] mt-3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been </p>
          <div className='flex py-4 gap-5'>
          <FaFacebookF className='text-sky-800'/>
          <FaTwitter className='text-sky-500'/>
          </div>
        </div >
        <div className='text-[#22262A] px-[20px]' >
          <h1 className='text-xl font-bold'>Contact Us</h1>
          <p className='text-[12px] mt-3'>iShop: address @building 124 Call us now: 0123-456-789 Email: support@whatever.com </p>
        </div>
      </div>

      <div className='p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 text-[#22262A] mt-5 border-b-2 border-gray-300'>
        <div className='py-3'> 
          <h1 className='text-xl font-bold py-2'>Infomation</h1>
          <ul>
            <li>About Us</li>
            <li>Infomation</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div className='py-3'>
          <h1 className='text-xl font-bold py-2'>Service</h1>
          <ul>
            <li>About Us</li>
            <li>Infomation</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className='py-3'>
          <h1 className='text-xl font-bold py-2'>Extras</h1>
          <ul>
            <li>About Us</li>
            <li>Infomation</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className='py-3'>
          <h1 className='text-xl font-bold py-2'>My Account</h1>
          <ul>
            <li>About Us</li>
            <li>Infomation</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className='py-3'>
          <h1 className='text-xl font-bold py-2'>Userful Links</h1>
          <ul>
            <li>About Us</li>
            <li>Infomation</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className='py-3'>
           <h1 className='text-xl font-bold py-2'>Our Offers</h1>
          <ul>
            <li>About Us</li>
            <li>Infomation</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>
      <div className='flex flex-row-reverse gap-2 mt-4 mb-[100px] pr-3'> 
        <img src="images/visa.svg" alt="" />
        <img src="images/Paypal.svg" alt="" />
        <img src="images/master_card.svg" alt="" />
        <img src="images/Western_union.svg" alt="Western logo" />
      </div>
    </Container>
  )
}
