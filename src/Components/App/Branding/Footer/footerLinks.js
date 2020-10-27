import React from 'react'

const FooterLinks = () => {
  return (
    <div className='footerLinks'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='box leftLinks'>
            <ul>
              <li>
                <a href='http://archives.nd.edu' target='_blank' rel='noopener noreferrer'>University of Notre Dame Archives</a>
              </li>
              <li>
                <a href='https://nd.service-now.com/nd_portal?id=sc_cat_item&sys_id=1198d67ddb4a7240de73f5161d961936' target='_blank' rel='noopener noreferrer'>Report a Problem</a>
              </li>
            </ul>
          </div>
          <div className='box rightLinks'>
            <ul>
              <li>
                <a href='http://twitter.com/ndlibraries' target='_blank' rel='noopener noreferrer'>
                  <img src='https://resources.library.nd.edu/frame/images/twitter.png' alt='Twitter' /> NDLibraries
                </a>
              </li>
              <li>
                <a href='https://www.facebook.com/ndlibraries/' target='_blank' rel='noopener noreferrer'>
                  <img src='https://resources.library.nd.edu/frame/images/facebook.png' alt='Facebook' /> NDLibraries
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterLinks
