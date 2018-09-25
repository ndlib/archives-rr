import React from 'react'
import './style.css'
const Footer = () => {
  return (
    <div className='footer no-print'>
      <div className='footerLinks'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='box'>
              <ul>
                <li><a href='https://nd.service-now.com/nd_portal?id=sc_cat_item&sys_id=1198d67ddb4a7240de73f5161d961936&lib_list_problem=lib_list_web_content' target='_blank' rel="noopener noreferrer">Website Feedback</a></li>
                <li><a href='http://library.nd.edu/library-policies' target='_blank' rel="noopener noreferrer">Library Policies</a></li>
                <li><a href='http://librarygiving.nd.edu' target='_blank' rel="noopener noreferrer">Library Giving</a></li>
                <li><a href='http://library.nd.edu/'>Jobs</a></li>
                <li><a href='https://wiki.nd.edu/display/libintranet/Home' target='_blank' rel="noopener noreferrer">Hesnet</a></li>
                <li><a href='https://nd.service-now.com/nd_portal?id=sc_cat_item&sys_id=1198d67ddb4a7240de73f5161d961936' target='_blank' rel="noopener noreferrer">Report a Problem</a></li>
              </ul>
            </div>
            <div className='box right'>
              <ul>
                <li><a href='http://twitter.com/ndlibraries' target='_blank' rel="noopener noreferrer"><img src='https://resources.library.nd.edu/frame/images/twitter.png' alt='Twitter' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NDLibraries</a></li>
                <li><a href='https://www.facebook.com/ndlibraries/' target='_blank' rel="noopener noreferrer"><img src='https://resources.library.nd.edu/frame/images/facebook.png' alt='Facebook' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NDLibraries</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='footerInfo'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-xs-12 col-md-4'>
              <div className='box'>
                <p>Copyright &copy; 2018 University of Notre Dame</p>
                <p><a href='https://www.google.com/maps/place/Theodore+M.+Hesburgh+Library/@41.7023619,-86.2363832,17z/data=!3m1!4b1!4m5!3m4!1s0x8816d29f1af60a29:0x87f74f541c574744!8m2!3d41.7023579!4d-86.2341945'>221 Hesburgh Library, Notre Dame, IN 46556</a> </p>
                <p><a href='tel:5746316679'>(574) 631-6679</a></p>
              </div>
            </div>
            <div className='col-xs-12 col-md-4' />
            <div className='col-xs-12 col-md-4'>
              <div className='box right'>
                <img src='https://resources.library.nd.edu/frame/images/logo.png' className='flogo' alt='Hesburgh Library Logo' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
