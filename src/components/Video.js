import React from 'react'
import request from '../api';
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useEffect, useState } from 'react';
import moment, { duration } from 'moment';
import numeral from 'numeral';
import { Link, useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {CgMediaLive} from "react-icons/cg/"

const Video = ({element}) => {

    const { id,snippet:{channelId,channelTitle,title,publishedAt,liveBroadcastContent,thumbnails:{medium},},contentDetails}=element

    // console.log(id)
    
const _videoId= id?.videoId || contentDetails?.videoId || id;

useEffect(()=>{
  const get_video_details = async ()=>{

    const {data:{items}} = await request('/videos',{
      params:{
        part:'contentDetails,statistics',
        id:_videoId,
      },
    
    })
 
    setViews(items[0].statistics.viewCount)
    setDuration(items[0].contentDetails.duration)
  }

  get_video_details()

 
},[_videoId])

useEffect(()=>{
  const get_channel_icon = async()=>{

    const {data:{items}} = await request('/channels',{
      params:{
        part:'snippet',
        id:channelId,
      },
    
    })
    // console.log(items);
    setIcon(items[0].snippet.thumbnails.high.url)
  }
  get_channel_icon()
},[channelId])

const [views, setViews] = useState(null)

// setViews()
const [duration, setDuration] = useState(null)

const [icon, setIcon] = useState(null)

const second = moment.duration(duration).asSeconds();
const _duration = moment.utc(second * 1000).format("mm:ss")

const navigate = useNavigate()
  

const handleVideo = () =>{

  navigate(`/watch/${_videoId}`);

}
  return (
  
  

<div className=' mx-3 my-1 rounded text-white p-1 cursor-pointer '  id="main" style={{width:"245px"}} onClick={handleVideo}>
  {/* <img className="h-40 rounded-lg image" src={!high.url?"https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg":high.url}/> */}
  <LazyLoadImage src={!medium.url?"https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg":medium.url} effect='blur' className="rounded-lg  w-full image" style={{height:"160px"}}/>
  <div className='flex w-full relative' >
  {/* <Link to=''className=''><img className="h-8 w-8 rounded-full my-1.5"src={icon}/></Link>  */}
  <LazyLoadImage src={icon} className="h-8 w-8 rounded-full my-1.5" effect='blur'/>
  {/* details staart */}
  <div className='w-4/5 mx-3 my-1'>
  <div className="w-full ">
    <h3 className="font-medium mb-2 font-sans w-full" style={{fontSize:"1em"}}>{(title).length>30?(title).slice(0,30)+"...":title}</h3>
    

  </div>
  
  <div className=" -my-1 flex flex-col "  id='m-view'>
    <span style={{color:"#aaaaaa",fontSize:"0.7em"}}><Link to=''>{channelTitle}</Link></span>
    <div className='flex justify-between '>
    <div className='flex items-start w-full' id='marg'>
    <span  id="m-dot" style={{color:"#aaaaaa",margin:"0 2px",fontSize:"0.7em",display:"none"}}>•</span>
    <span style={{color:"#aaaaaa",fontSize:"0.7em"}}>{numeral(views).format('0.0.a').toLocaleUpperCase()+" "+"Views"}</span>
    <span style={{color:"#aaaaaa",margin:"0 2px",fontSize:"0.7em"}}>•</span>
    <span style={{color:"#aaaaaa",fontSize:"0.7em"}}>{moment(publishedAt).fromNow()}</span>
    </div>
    <div id="dots">
    <BsThreeDotsVertical className="text 8xl -mx-2 hover:bg-slate-500 rounded-full" />
    
    </div>
<div className='duration'>{liveBroadcastContent === "live"?<p className=' bg-red-700 rounded-sm font-medium px-1 flex items-center'> <CgMediaLive/>  LIVE</p>:_duration}</div>

    </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Video