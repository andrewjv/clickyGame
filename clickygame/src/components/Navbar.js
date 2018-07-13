import React from 'react'
import '../styles/Navbar.css'

const Navbar = props => (
  <nav className='navbar'>
    <ul>
      <li class='navText'>
        <a href='/'>Clicky Game</a>
      </li>
      <li className='navText'>{props.clickMessage}</li>
      <li className='scoreCounter'>Score: {props.score} | Top Score: {props.topScore}</li>
    </ul>
  </nav>
);

export default Navbar;
