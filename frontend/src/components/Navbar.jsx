import { Link } from 'react-router-dom'
import logo from '../Assest/Logo1.png'
import '../cssFiles/Navbar.css'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
export default function Navbar({balance , handleDarkMode , isDark}) {
    
  
  return (
    <div className={isDark?'Navbar-container-Dark':'Navbar-container-normal'}>
    <Link to="/">
    <img src={logo} width={300}  alt="Home" />
    </Link>  
    <h1 className={balance>0?'balance':'negative-baclance'}> {balance}  ₪</h1> 
    <ul className='Nav-items'>
    <li><Link to='/Transactions'>Transictions </Link></li>
    <li><Link to='/Breakdown'>BreakDown </Link></li>
    <li><Link to='/Operations'>Operations </Link></li>
    <li><Link to='/'>Home Page </Link></li>
    </ul>
    <FormControlLabel  onChange={()=>handleDarkMode(!isDark)} control={<Switch className='Dark-Switcher'  defaultChecked />} label="Dark Mode" />

</div>
     )
}
