import React from 'react'
import { Link } from 'react-router-dom'
// import { LinkContainer } from 'react-router-bootstrap';
import { NavLink } from 'react-router-dom'
// import NavItem from 'react-bootstrap/lib/NavItem';
// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/' target='_self'>Home</Link></li>
        {
          // <li><a href='/hi' to='/hi'>Hi</a></li>
        }
      {
      //   <LinkContainer to="/hi">
      //   <div>zzzz</div>
      // </LinkContainer>
    }

        {<li><Link to='/hi' target='_self'>Hi</Link></li>}
      </ul>
    </nav>
  </header>
)

export default Header
