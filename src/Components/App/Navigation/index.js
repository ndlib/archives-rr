import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import { viceroyAPI } from 'Constants/endpoints'
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
          to='/search'
          activeClassName='active'
        >Search</NavLink>
        <span className='right'><a href={`${viceroyAPI}/logout`}>Log Out</a></span>
      </div>
    </nav>
  )
}

export default Navigation
