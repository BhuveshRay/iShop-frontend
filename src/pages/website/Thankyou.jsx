import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/Container'

export default function Thankyou() {
  return (
      <div className=" flex h-screen  items-center justify-center bg-gray-100   ">
        <Container>
  <div className="bg-white w-[600px] h-[400px] flex flex-col  justify-center items-center rounded-lg shadow-md p-6 ">
    <h1 className="text-3xl font-bold text-blue-600 mb-4">Thank You for Your Purchase!</h1>
    <p className="text-gray-600 mb-2"> We have received your order and it's being processed.</p>
    <p className="text-gray-600 mb-6"> You will receive a confirmation email shortly.</p>
    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" ><Link to={"/"}>Go home</Link></button>
  </div>
  </Container>
</div>

  )
}
