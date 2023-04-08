import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { useState } from 'react'
import VideoWatchData from './VideoWatchData'
import Comments from './Comments'
import VideoWatchHozi from './VideoWatchHozi'
import { useParams } from 'react-router-dom'
import { getVideoBySearch} from '../redux/actions/videos.act'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import SkeletonLoadingSearch from './SkeletonLoadingSearch'
import SearchVideo from './SearchVideo'
import HelmetCustom from './HelmetCustom'


const Search = () => {
// const [open,setOpen] = useState(false);

// const toggle = ()=>{
//   setOpen(!open)
// }

const {query} = useParams()

const dispatch = useDispatch()

useEffect(() => {
 dispatch(getVideoBySearch(query))

}, [query, dispatch])

 

const { videos,loading} = useSelector(
  state => state.searchVideos)


  return (
  //   <div className="h-screen overflow-hidden relative"  style={{backgroundColor:"#0f0f0f"}}>

  //   <Header toggle={toggle}/>
  //  <div className="flex " > 
  //  <div className='max-h-screen' id='side-main-m'>
  //    <Sidebar open={open}/>
  //    </div>
   

<div className='w-full search' id="searchthumb" style={{height:"85vh",overflow:"auto", overflowX:"hidden"}}>
<HelmetCustom title={query + " - FunTube"}/>
{/* {!loading ? video?.map(video => (
  (<SearchVideo video={video} key={video.id.videoId}/>))):(<h1>loading</h1>)
} */}
{!loading ? videos?.map((video,i)=>{
    
    return(
 
 <SearchVideo video={video} key={i} />
 
        )

}): [...Array(20)].map((element,i)=>{
  return(
    
<SkeletonLoadingSearch key={i} element={element}/>
  )
})}
   </div>  
  //  </div>
  //  </div>
  )
}

export default Search