import React from 'react'
import Footer from '../../components/website/Footer'
import Header from '../../components/website/Header'
import { Outlet } from 'react-router-dom'

export default function Main() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}
