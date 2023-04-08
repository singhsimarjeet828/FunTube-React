
import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react';
// import { BsThreeDotsVertical } from 'react-icons/bs'
import {getHomePageVideos, getVideosByCate,} from '../redux/actions/videos.act'
import Video from './Video';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonLoading from './SkeletonLoading';
import Skeleton from 'react-loading-skeleton';
import LoadingBar from 'react-top-loading-bar';
import HelmetCustom from './HelmetCustom';

const MainVideo = () => {
  const dispatch = useDispatch()

  useEffect(() => {
     dispatch(getHomePageVideos())
  }, [dispatch])
  const { videos,activeCategory,loading} = useSelector(
    state => state.homeVideos
 )

//  console.log(videos)
const fetchData =()=>{
  if (activeCategory === 'All'){ dispatch(getHomePageVideos())}
    
      else{
        dispatch(getVideosByCate(activeCategory))
      }

      }
   
  return (
    <>
       <HelmetCustom/>
   
{/* <div className=" main overflow-auto shadow-lg flex  flex-wrap justify-center items-start max-w-full pb-11" style={{height:"76vh"}}> */}
<div className=" main  shadow-lg flex  justify-center items-start w-full pb-11 " id='scrollableDiv'>

<InfiniteScroll
  dataLength={videos.length} //This is important field to render the next data
  next={fetchData}
  hasMore={true}
  loader={<div className="loader"></div>}
  className="flex flex-wrap justify-center items-start max-w-full"
  scrollableTarget="scrollableDiv"
  >
{/* {videos.map((element, i)=>{
    
    return(
 
 <Video element={element} key={i} />
 
        )

})
} */}


{!loading ? videos.map((element, i)=>{
    
    return(
 
 <Video element={element} key={i} />
 
        )

}): [...Array(20)].map((element,i)=>{
  return(
    
<SkeletonLoading key={i} element={element}/>
  )
})}


</InfiniteScroll>
    </div> 
</>
  )
}

export default MainVideo