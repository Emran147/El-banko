import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Transactions from './components/Transactions';
import Operations from './components/Operations'
import Breakdown from './components/Breakdown'
import { useState } from 'react';

function App() {
  const [balance,setBalance]=useState(2000)

  const handleBalance = function(amount){
    const tempBalance = balance + parseInt(amount)
    setBalance(tempBalance)
  }

  return (
    <>
    <Router>
    <Navbar balance={balance}/>
    <Routes>
      <Route path='/' element={<Home/> }/>
      <Route path='/Breakdown' element={<Breakdown/> }/>
      <Route path='/Transactions' element={<Transactions/> }/>
      <Route path='/Operations' element={<Operations handleBalance={handleBalance}  balance={balance}/> }/>

    </Routes>
    </Router>
    </>
  );
}

export default App;
