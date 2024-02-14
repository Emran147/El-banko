// Home.js
import React from 'react';
import homeText from '../config';
import '../cssFiles/Home.css';

export default function Home() {
  return (
    <div className='home-page-container'>
      <div className='Text-container'> 
        <h1>{homeText.welcome}</h1>
        <p>{homeText.description}</p>
      </div>
    </div>
  );
}
