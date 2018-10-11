import React from 'react'

const FooterLinks = () => {
  return (
    <div className='footerLinks'>
      <div className='container-fluid'>
        <div className='box'>
          <ul>
            <li><a href='https://nd.service-now.com/nd_portal?id=sc_cat_item&sys_id=1198d67ddb4a7240de73f5161d961936&lib_list_problem=lib_list_web_content' target='_blank' rel='noopener noreferrer'>Website Feedback</a></li>
            <li><a href='http://library.nd.edu/library-policies' target='_blank' rel='noopener noreferrer'>Library Policies</a></li>
            <li><a href='http://librarygiving.nd.edu' target='_blank' rel='noopener noreferrer'>Library Giving</a></li>
            <li><a href='http://library.nd.edu/'>Jobs</a></li>
            <li><a href='https://wiki.nd.edu/display/libintranet/Home' target='_blank' rel='noopener noreferrer'>Hesnet</a></li>
            <li><a href='https://nd.service-now.com/nd_portal?id=sc_cat_item&sys_id=1198d67ddb4a7240de73f5161d961936' target='_blank' rel='noopener noreferrer'>Report a Problem</a></li>
          </ul>
        </div>
        <div className='box right'>
          <ul>
            <li><a href='http://twitter.com/ndlibraries' target='_blank' rel='noopener noreferrer'><img src='https://resources.library.nd.edu/frame/images/twitter.png' alt='Twitter' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NDLibraries</a></li>
            <li><a href='https://www.facebook.com/ndlibraries/' target='_blank' rel='noopener noreferrer'><img src='https://resources.library.nd.edu/frame/images/facebook.png' alt='Facebook' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NDLibraries</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default FooterLinks
