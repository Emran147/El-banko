import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Transactions from './components/Transactions';
import Operations from './components/Operations'
import Breakdown from './components/Breakdown'
import { useState } from 'react';
import '../src/App.css'

function App() {
  const [balance,setBalance]=useState(2000)

  const handleBalance = function(amount){
    const tempBalance = balance + parseInt(amount)
    setBalance(tempBalance)
  }

  
  const [ isDark , setIsDark ] = useState(false)

  const handleDarkMode = function(dark){
     setIsDark(dark)
  }
  return (
    <div className={isDark?'Dark-Mode':'Normal-Mode'}>
    <Router>
    <Navbar balance={balance} handleDarkMode={handleDarkMode}  isDark={isDark}/>
    <Routes>
      <Route path='/' element={<Home/> }/>
      <Route path='/Breakdown' element={<Breakdown/> }/>
      <Route path='/Transactions' element={<Transactions/> }/>
      <Route path='/Operations' element={<Operations handleBalance={handleBalance}  balance={balance}/> }/>

    </Routes>
    </Router>
    </div>
  );
}

export default App;
