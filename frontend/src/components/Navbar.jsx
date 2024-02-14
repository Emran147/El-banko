import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../Assest/Logo1.png'
import '../cssFiles/Navbar.css'

export default function Navbar({balance}) {
  return (
    <div className='Navbar-container'>
    <Link to="/">
    <img src={logo} width={300}  alt="Home" />
    </Link>  
    <h1 className='balance'> {balance}  ₪</h1> 
    <ul className='Nav-items'>
    <li><Link to='/Transactions'>Transictions </Link></li>
    <li><Link to='/Breakdown'>BreakDown </Link></li>
    <li><Link to='/Operations'>Operations </Link></li>
    <li><Link to='/'>Home Page </Link></li>

    </ul>
  
</div>
     )
}
