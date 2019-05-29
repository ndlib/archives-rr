import React from 'react'

const FooterInfo = () => {
  return (
    <div className='footerInfo'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='box'>
            <p>Copyright &copy; 2018 University of Notre Dame</p>
            <p><a href='https://www.google.com/maps/place/Theodore+M.+Hesburgh+Library/@41.7023619,-86.2363832,17z/data=!3m1!4b1!4m5!3m4!1s0x8816d29f1af60a29:0x87f74f541c574744!8m2!3d41.7023579!4d-86.2341945'>221 Hesburgh Library, Notre Dame, IN 46556</a> </p>
            <p>Phone <a href='tel:5746316679'>(574) 631-6679</a></p>
          </div>
          <div className='box' />
          <div className='box right'>
            <img src='https://resources.library.nd.edu/frame/images/logo.png' className='flogo' alt='Hesburgh Library Logo' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterInfo
