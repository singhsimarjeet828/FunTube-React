import React, { useEffect } from 'react'
import { IoMdHome } from 'react-icons/io'
import {MdMovie, MdSubscriptions, MdSportsBaseball} from 'react-icons/md'
import { IoMdThumbsUp } from 'react-icons/io'
import {AiFillFire} from 'react-icons/ai'
import { BsMusicPlayer, BsNewspaper, BsCameraVideo } from 'react-icons/bs'
import { GiBulb } from 'react-icons/gi'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getVideosByCate } from '../redux/actions/videos.act'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Sidebar = ({open}) => {

  const firstList = [

{icon:<IoMdHome className='text-2xl hover:text-red-700 hover:scale-125'/>, name:"Home"},
{icon:<MdSubscriptions className='text-2xl hover:text-red-700 hover:scale-125'  />,name:"Subscriptions"},
{icon:<IoMdThumbsUp className='text-2xl hover:text-red-700 hover:scale-125' />,name:"Liked Videos"}

  ]
  const MobileList = [

    {icon:<IoMdHome className=' hover:text-red-700 hover:scale-125'/>, name:"Home"},
    {icon:<MdSubscriptions className=' hover:text-red-700 hover:scale-125'  />,name:"Subscriptions"},
    {icon:<IoMdThumbsUp className=' hover:text-red-700 hover:scale-125' />,name:"Liked Videos"}
    
      ]

  const explore =[
    {icon:<AiFillFire className='text-2xl hover:text-red-700 hover:scale-125' />, name:"Trending"},
    {icon:<BsMusicPlayer className='text-2xl hover:text-red-700 hover:scale-125' />, name:"Music"},
    {icon:<MdMovie className='text-2xl hover:text-red-700 hover:scale-125' />, name:"Movies"},
    {icon:<BsCameraVideo className='text-2xl hover:text-red-700 hover:scale-125' />, name:"Live"},
    {icon:<MdSportsBaseball className='text-2xl hover:text-red-700 hover:scale-125' />, name:"Sports"},
    {icon:<BsNewspaper className='text-2xl hover:text-red-700 hover:scale-125' />, name:"News"},
    {icon:<GiBulb className='text-2xl hover:text-red-700 hover:scale-125' />, name:"Learning"},
  ]
  
  const navigate = useNavigate()
const handleClick = ()=>{
navigate(`/`)
}

const [activeElement, setActiveElement] = useState();

const dispatch = useDispatch();
const handleExplore=(explore)=>{
navigate(`/`)
dispatch(getVideosByCate(explore))
setActiveElement(explore);

}

// useEffect(() => {

// setActiveElement("")

// })


  return (
   
    <>
  {/* <div className={`  pr-2 m-1  pb-10 mb-14 overflow-auto ${open?"collapse":"collapse"}'`} style={{height:"85vh",width:"15rem"}} id="side-main"></div> */}
    <div className={open?"overflow-auto pr-2 m-1 pb-10 mb-14 anim ;":"collapse"} style={{height:"85vh",width:"15rem"}} id="side-main">
    
       <ul className='flex flex-col border-b-2  border-gray-700 '>
{firstList.map((element) =>{
  return(
    <li key={element.name} className={` my-1 px-2 py-3 rounded-xl hover:bg-zinc-900  ${element.name ==="Home"?"bg-zinc-700":""}`} onClick={handleClick}>
      <Link href='' className=' hover:text-red-700 flex items-center justify-start gap-2 text-white'>{element.icon}<span id="name"className='test-sm tracking-wider'>{element.name}</span></Link>
    </li>
  )

})}
  </ul>
<h2 className='text-2xl font-semibold  text-white m-3'>Explore</h2>
  <ul className='flex flex-col  border-gray-700 '>
{explore.map((element) =>{
  return(
    <li onClick={() => handleExplore(element.name)} key={element.name} className={`"${
      activeElement === element.name
        ?'my-1 px-2 py-3 rounded-xl bg-zinc-900 '
        : "my-1 px-2 py-3 rounded-xl hover:bg-zinc-900 "
    }"`}  >
      <p className=' hover:text-red-700 flex items-center justify-start gap-2 text-white cursor-pointer'>{element.icon}<span id="name" className='test-sm tracking-wider'>{element.name}</span></p>
    </li>
  )
  // className={` my-1 px-2 py-3 rounded-xl hover:bg-zinc-900  `}
})}
  </ul>

  <div className='w-full text-white my-1'>
    <h2 className=' text-white text-center font-semibold ' style={{fontSize:"15px"}}>Developed By ~ <a href="https://in.linkedin.com/in/simarjeet-singh-0553b81a3" target="_blank" style={{color:"red"}}>Simarjeet Singh</a> </h2>
    <p className=' my-1' style={{fontSize:"12px"}}>This video streaming website is for Educational purpose only, This product uses the Youtube API but is not endorsed or certified by Youtube </p>
  </div>

    </div>

    {/* {open?"overflow-auto pr-2 m-1 pb-10 mb-14":"collapse"} */}
    <div className={open?"w-20 my-1 hidden mx-1":"collapse-side"} id='mobile-main'>
   <ul className='flex flex-col justify-center items-center w-full '>{MobileList.map((element) =>{
  return(
   <li key={element.name} className='my-1 gap-2 px-2 py-2 rounded-xl flex  flex-col justify-center items-center hover:bg-zinc-800'onClick={handleClick}>
      <Link href='' className=' hover:text-red-700 flex justify-center items-center text-5xl  text-white'>{element.icon}</Link>
    <p className=' text-white' style={{fontSize:"9px"}}>{element.name}</p>
      </li>
    
  )

})}  </ul>
    
    </div>

    </>

  )

}
export default Sidebar