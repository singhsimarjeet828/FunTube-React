import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { useState } from 'react'
import VideoWatchData from './VideoWatchData'
import Comments from './Comments'
import VideoWatchHozi from './VideoWatchHozi'
import { useParams } from 'react-router-dom'
import { getVideoById, getRelatedVideos } from '../redux/actions/videos.act'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import SkeletonLoadingWatch from './SkeletonLoadingWatch'
import { Helmet } from 'react-helmet'


const Watch = () => {
// const [open,setOpen] = useState(false);

// const toggle = ()=>{
//   setOpen(!open)
// }

const {id} = useParams()

const dispatch = useDispatch()

useEffect(() => {
 dispatch(getVideoById(id))
}, [dispatch ,id])


useEffect(() => {
  dispatch(getRelatedVideos(id))
 }, [dispatch ,id])
 
 

const { video,loading} = useSelector(
  state => state.selectedVideos)

  const { videos,loading:relatedVideoLoading} = useSelector(
    state => state.relatedVideos)
  // console.log(video);


  return (
  //   <div className="h-screen overflow-hidden relative"  style={{backgroundColor:"#0f0f0f"}}>

  //   <Header toggle={toggle}/>
  //  <div className="flex " > 
  //  <div className='max-h-screen' id='side-main-m'>
  //    <Sidebar open={open}/>
  //    </div>


<div className='w-full flex justify-between items-start watch' id="watchthumb" style={{height:"85vh",overflow:"auto"}}>
<Helmet><title>{video?.snippet?.title}</title></Helmet>
<div className=' m-1 framevideo' style={{marginBottom:"50px",width:"65%"}}>

<div className='videoframe' style={{height:'60vh'}}>  <iframe
   src={`https://www.youtube.com/embed/${id}`}
   frameBorder='0'
   title={video?.snippet?.title}
   allowFullScreen
   width='100%'
   height='100%'
   controls='0'></iframe></div>
<div className='m-1'>
  {!loading ? ( <VideoWatchData video={video} videoId={id} />):(<h6>Loading</h6>) }
  
</div>
<div className='m-1'><Comments videoId={id} totalComments={video?.statistics?.commentCount}/></div>
</div>
<div className=' mx-1 horizontalVideo' style={{width:"35%"}}>
  { !loading ? videos?.filter(video => video.snippet).map((video)=>(
  <VideoWatchHozi video={video} key={video.id.videoId}/>  


  )): [...Array(20)].map((element,i)=>{
    return(
      
  <SkeletonLoadingWatch key={i} element={element}/>
    )
  })}

  </div>


</div>
  //    </div>
  //  </div>  
  )
}

export default Watch