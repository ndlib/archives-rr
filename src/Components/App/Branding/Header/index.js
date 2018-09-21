import React from 'react'
import './style.css'
const Header = () => {
  return (
    <div className='brandHeading no-print'>
      <div className='university'>
        <div className='container-fluid'>
          <nav aria-label='University of Notre Dame'>
            <div className='nddotedu'>
              <a href='http://nd.edu'>University <i>of</i> Notre Dame</a>
            </div>
            <div className='ndoffice'>
              <a href='http://provost.nd.edu'>Office <i>of the</i> Provost</a>
            </div>
          </nav>
        </div>
      </div>
      <div className='appTitle'>
        <div className='container-fluid'>
          <h1>Archives Record Retention Schedule Database</h1>
        </div>
      </div>
    </div>

  )
}

export default Header
