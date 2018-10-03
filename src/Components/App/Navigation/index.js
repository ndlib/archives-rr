import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './style.css'

const Navigation = () => {
  return (
    <nav className='navigationBar no-print'>
      <div className='container-fluid'>
        <Link
          to='/'
        >Home</Link>
        <NavLink
          to='/categories'
          activeClassName='active'
        >Categories</NavLink>
        <NavLink
          to='/recordTypes'
          activeClassName='active'
        >Search</NavLink>
        <span className='right'><a href='/'>Login</a></span>
      </div>
    </nav>
  )
}

export default Navigation
