import React from 'react'
import { Link } from 'react-router-dom'

import printStamp from './images/printStamp.png'
import './style.css'

const SITE_HOME = `${window.location.protocol}//${window.location.host}`
const EMAIL = 'archives@nd.edu'
const PHONE = '574-631-6448'

const PrintFooter = (props) => {
  return (
    // Remove the print-only class while the pdf is being saved since that is supposed to mimic "printing"
    <div className={`printFooter ${props.isSaving ? '' : 'print-only'}`} id={`printFooter_${props.recordId}`}>
      <img src={printStamp} alt='University of Notre Dame Archives' className='stamp' />
      <div className='text'>
        <span className='line'>Printed on {new Date().toLocaleDateString('en-US')}</span>
        <span className='line'>For the most up-to-date version, see <Link to='/'>{SITE_HOME}</Link></span>
        <span className='line'>For questions, please contact the University Archives ({EMAIL}) {PHONE}</span>
      </div>
    </div>
  )
}

export default PrintFooter
