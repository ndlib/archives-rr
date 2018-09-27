import React from 'react'
import FooterLinks from './footerLinks'
import FooterInfo from './footerInfo'
import './style.css'
const Footer = () => {
  return (
    <div className='footer no-print'>
      <FooterLinks/>
      <FooterInfo/>
    </div>
  )
}

export default Footer
