import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import request from '../api'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import numeral from 'numeral'
import {CgMediaLive} from "react-icons/cg/"
const SearchVideo = ({video}) => {
   
  const {
    id,
    snippet: {
       channelId,
       channelTitle,
       description,
       title,
       publishedAt,
       thumbnails: { medium },
       resourceId,
       liveBroadcastContent,
    },
 } = video

 const isVideo = id.kind === 'youtube#video'
 const [views, setViews] = useState(null)
   const [duration, setDuration] = useState(null)
   const [channelIcon, setChannelIcon] = useState(null)


   useEffect(() => {
    const get_video_details = async () => {
       const {
          data: { items },
       } = await request('/videos', {
          params: {
             part: 'contentDetails,statistics',
             id: id.videoId,
          },
       })
       setDuration(items[0].contentDetails.duration)
       setViews(items[0].statistics.viewCount)
    }
    get_video_details()
 }, [id])

 useEffect(() => {
  const get_channel_icon = async () => {
     const {
        data: { items },
     } = await request('/channels', {
        params: {
           part: 'snippet',
           id: channelId,
        },
     })
     setChannelIcon(items[0].snippet.thumbnails.high)
  }
  get_channel_icon()
}, [channelId])

const seconds = moment.duration(duration).asSeconds()
const _duration = moment.utc(seconds * 1000).format('mm:ss')

const navigate = useNavigate()
const handleClick = ()=>{
//   navigate(`./`)
if (isVideo){
  navigate(`/watch/${id.videoId}`)
}else{
   navigate(`/channel/${id.channelId}`)
}
}
  return (
 <div  className={`${!isVideo?'flex items-center justify-center text-white mx-1 cursor-pointer py-2 overflow-hidden w-full':'flex justify-center items-center text-white mx-1 cursor-pointer py-2 overflow-hidden'}`} id='searchdiv'  onClick={handleClick} style={{borderBottom:"1px solid white"}}>
<div className='mx-1 my-1 relative searchimage'  id="searchfix" style={{width:"25%", height:"100%"}}>
<LazyLoadImage src={!medium.url?"https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg":medium.url} effect='blur' className={`${!isVideo?"rounded-full mx-auto w-2/5 ":"rounded-lg imagesearch"}`}/>

{isVideo && <div className='durationWatch'>{liveBroadcastContent === "live"?<p className=' bg-red-700 rounded-sm font-medium px-1 flex items-center'> <CgMediaLive/>  LIVE</p>:_duration}</div>}
</div>
<div className='mx-1 my-1  searchcontent' style={{width:"75%"}}>
{!isVideo?<h3 className="channelflex ">{title}</h3>:
<h3 className="font-medium font-sans w-full " style={{fontSize:"1.0em"}}>{(title).length>60?(title).slice(0,100)+"...":title}</h3>}
    {isVideo && 
  <div className='my-0'>

<span style={{color:"#aaaaaa",fontSize:"0.7em"}}>{numeral(views).format('0.0.a').toLocaleUpperCase()+" "+"Views"}</span>
    <span style={{color:"#aaaaaa",margin:"",fontSize:"0.8em"}}> • </span>
    <span style={{color:"#aaaaaa",fontSize:"0.8em"}}>{moment(publishedAt).fromNow()}</span>
    <div className='flex items-center justify-start  my-1'>
{isVideo &&
    <LazyLoadImage src={channelIcon?.url} effect='blur' className=" rounded-full h-10 w-10 mx-1"/>}
   
    <span style={{color:"#aaaaaa",fontSize:"0.7em"}}><Link to=''>{channelTitle}</Link></span>

    </div>

    <div className='my-1'>
    {/* {isVideo && */}
    <p className='text-white'>{description}</p>
    </div>

    </div>
      }
    </div>


 </div>
  )
}

export default SearchVideo