import React from 'react'
import Header from '../Branding/Header'
import Footer from '../Branding/Footer'
import Navigation from '../Navigation'
import './style.css'

const Page = ({ children }) => {
  return (
    <div className='page'>
      <Header />
      <Navigation />
      <div className='container-fluid'>
        <div className='mainContent'>{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default Page
