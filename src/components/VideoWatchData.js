import { ThumbDownSharp, ThumbUpSharp } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import ReactShowMoreText from 'react-show-more-text'
import numeral from 'numeral'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { getChannelDetails } from '../redux/actions/channel.act'
import { useEffect } from 'react'
import HelmetCustom from './HelmetCustom'


const VideoWatchData = ({video:{snippet ,statistics},videoId}) => {


const {channelId,channelTitle,description, title,publishedAt} = snippet;
const {viewCount,likeCount,dislikeCount} = statistics;

const dispatch = useDispatch()



useEffect(() => {
  dispatch(getChannelDetails(channelId))
 }, [dispatch ,channelId])
 
 const {snippet:channelSnippet,statistics:channelStatistics} = useSelector(
  state => state.channelDetails.channel)


  return (
    <div className='w-full'>
      <HelmetCustom title={title} description={description}/>
<div className=' w-full metatitle'style={{borderBottom:"1px solid red",padding:"5px"}}>
    <div className='mx-1'>
<h3 className=' w-full  text-white watchtitle' style={{fontWeight:"600",fontSize:"1.5rem",fontFamily:"sans-serif"}}>{title}</h3>
</div>

<div className='flex justify-between  mx-1'>
    <div className='text-white'><span>{numeral(viewCount).format('0,a').toUpperCase()} Views</span><span> • </span><span>{moment(publishedAt).fromNow()}</span></div>
    <div className='text-white'><span className='text-sm'><ThumbUpSharp style={{fontSize:'15px'}}/> {numeral(likeCount).format('0,a').toUpperCase()}</span>  <span>||</span>  <span  className='text-sm'><ThumbDownSharp style={{fontSize:'15px'}}/> {numeral(dislikeCount).format('0,a')}</span></div>
</div>
</div>
<div className='w-full flex justify-between items-center metasubs' style={{padding:"5px",borderBottom:"1px solid red"}}>
<div className=' flex  justify-center items-start'>
  <div className='mr-1'>
<Link to='' className=''><LazyLoadImage src={channelSnippet?.thumbnails?.high?.url} className="h-10 w-10 rounded-full my-1.5 border border-white" effect='blur'/></Link> 
</div>
<div className='ml-1'>
<h3 style={{color:"white",fontSize:"1em"}}>{channelTitle}</h3>
<h4 style={{color:"white",fontSize:"1em"}}>{numeral(channelStatistics?.subscriberCount).format('0,a').toUpperCase()+" "+"Subscribers"}</h4>

</div>
</div>
<div>
<button className='hover:bg-red-600 text-white p-2 rounded-3xl w-36 border border-red-600 font-sans font-semibold '>Subscribe</button>
</div>

</div>
<div className='w-full bg-zinc-900 text-white rounded-lg my-2 mx-1 metadesc' style={{padding:"6px"}}>
<ReactShowMoreText 
lines={3}
more={'Show More'}
less={'Show Less'}
anchorClass='showMore'
expanded={false}>
{description}
</ReactShowMoreText>

</div>

    </div>
  )
}

export default VideoWatchData