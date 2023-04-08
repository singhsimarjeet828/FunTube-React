import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { useState } from 'react';
import Categories from './Categories'
import MainVideo from './MainVideo';
const Home = () => {

  

  return (
    <>
    <div id="cate-main" className='biggerWidth'  >
  <Categories/>
  </div>
    <div id="video-main" className='max-h-screen m-1 biggerWidth'>
<MainVideo/>
</div>

</>
)
}

export default Home