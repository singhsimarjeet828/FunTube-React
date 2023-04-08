import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, useNavigate } from 'react-router-dom'
import numeral from 'numeral'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import request from '../api'
import { useState } from 'react'
import {CgMediaLive} from "react-icons/cg/"




const VideoWatchHozi = ({video}) => {

  const {
    id,
    snippet: {
       channelId,
       channelTitle,
       description,
       title,
       publishedAt,
       liveBroadcastContent,
       thumbnails: { medium },
       resourceId,
    },
 } = video

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
    // if (isVideo) get_video_details()
    get_video_details()
 }, [id])

//  useEffect(() => {
//   const get_channel_icon = async () => {
//      const {
//         data: { items },
//      } = await request('/channels', {
//         params: {
//            part: 'snippet',
//            id: channelId,
//         },
//      })
//      setChannelIcon(items[0].snippet.thumbnails.high)
//   }
//   get_channel_icon()
// }, [channelId])

const seconds = moment.duration(duration).asSeconds()
const _duration = moment.utc(seconds * 1000).format('mm:ss')

const navigate = useNavigate()
const handleClick = ()=>{
//   navigate(`./`)
  navigate(`/watch/${id.videoId}`)

}
  return (
 <div className='w-full flex justify-between items-start text-white mx-1 cursor-pointer' onClick={handleClick}>
<div className='mx-1 my-1 relative ' id="hozifix" style={{width:"35%", height:"100%"}}>
<LazyLoadImage src={!medium.url?"https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg":medium.url} effect='blur' className="rounded-lg   image"/>
<div className='durationWatch'>{liveBroadcastContent === "live"?<p className=' bg-red-700 rounded-sm font-medium px-1 flex items-center'> <CgMediaLive/>  LIVE</p>:_duration}</div>
</div>
<div className='mx-1  ' style={{width:"65%"}}>
<h3 className="font-medium font-sans w-full" style={{fontSize:"1em"}}>{(title).length>15?(title).slice(0,15)+"...":title}</h3>
<span style={{color:"#aaaaaa",fontSize:"0.7em"}}><Link to=''>{channelTitle}</Link></span>
<div className='-my-2'>
<span style={{color:"#aaaaaa",fontSize:"0.7em"}}>{numeral(views).format('0.0.a').toLocaleUpperCase()+" "+"Views"}</span>
    <span style={{color:"#aaaaaa",margin:"",fontSize:"0.8em"}}> • </span>
    <span style={{color:"#aaaaaa",fontSize:"0.8em"}}>{moment(publishedAt).fromNow()}</span>
    </div>
</div>

 </div>
  )
}

export default VideoWatchHozi