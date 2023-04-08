import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getVideosByChannel } from '../redux/actions/videos.act'
import { useSelector } from 'react-redux'
import Video from './Video'
import SkeletonLoading from './SkeletonLoading'
import { getChannelDetails } from '../redux/actions/channel.act'
import numeral from 'numeral'
const Channel = () => {

    const {channelId} = useParams()

const dispatch = useDispatch();

    useEffect(() => {
    dispatch(getVideosByChannel(channelId))
    dispatch(getChannelDetails(channelId))

    },[channelId, dispatch])


    const { videos,loading} = useSelector(
        state => state.channelVideos)

        const {snippet,statistics} = useSelector(
            state => state.channelDetails.channel)
    

            const handleSubs = ()=>{

              alert("Coming Soon-- This app is in beta stage")
            }
  return (
    <>
    <div className='flex justify-between items-center text-white w-full bg-zinc-800 rounded-lg px-2 py-2'>
<div className='flex items-center justify-start'>
<img src={snippet?.thumbnails?.default?.url} className='rounded-full w-20 h-20'/>
<div>
    <div className='flex items-center justify-start'>
    
    <p className='mx-1'>{snippet?.title}</p>
    <p className='mx-1'>{numeral(statistics?.videoCount).format('0.0.a')}{' '}{"Videos"}</p>
    <span className='mx-1'>{numeral(statistics?.subscriberCount).format('0,a').toUpperCase()}{" "}{"Subscribers"}</span>
</div>
    <div><p className='mx-1'>{snippet?.description.slice(0,80)}...</p></div>
</div>
</div>

<div>

<button className='hover:bg-red-600 text-white p-2 rounded-3xl w-36 border border-red-600 font-sans font-semibold channelsubs ' onClick={handleSubs}>Subscribe</button>
</div>

    </div>
    <div className="w-full flex flex-wrap justify-center items-start pb-11  search" id="channelthumb" style={{height:"70vh",overflow:"auto"}}>
    {!loading ? videos.map((element, i)=>{
    
        return(
            
     
     <Video element={element} key={i} Channel />
     
            )
    
    }): [...Array(20)].map((element,i)=>{
      return(
        
    <SkeletonLoading key={i} element={element}/>
      )
    })}
    </div>
</>
  )
}


export default Channel