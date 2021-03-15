import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { logOut } from 'Store/actions/personalActions'
import ViewDropdown from './ViewDropdown'
import './style.css'

const Navigation = () => {
  return (
    <nav className='navigationBar no-print'>
      <div className='container-fluid'>
        <Link
          to='/'
        >Home
        </Link>
        <NavLink
          to='/categories'
          activeClassName='active'
        >Categories
        </NavLink>
        <NavLink
          to='/search'
          activeClassName='active'
        >Search
        </NavLink>
        <NavLink
          to='/help'
          activeClassName='active'
        >Help/Info/FAQ
        </NavLink>
        <span className='right'>
          <ViewDropdown />
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            href='#'
            onClick={() => logOut()}
          >Log Out
          </a>
        </span>
      </div>
    </nav>
  )
}

export default Navigation
