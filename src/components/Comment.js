import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import moment from 'moment'
import noimage from '../images/noimage.png'
const Comment = ({comment}) => {

 const   {authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay} = comment;
  return (
    <div>
    <div className=' w-full flex  justify-start items-start mx-2 my-1 py-2' style={{borderBottom:"1px solid grey"}}>
         
  <div className='mr-1' style={{width:"60px"}}>
<Link to='' className=''><LazyLoadImage src={!authorProfileImageUrl?noimage:authorProfileImageUrl} className="h-10 w-10 rounded-full my-1.5 border border-white" effect='blur'/></Link> 
</div>
<div className='ml-1' style={{width:"100%"}} >
  <div className='flex justify-start items-center'>
<h3 style={{color:"white",fontSize:"1em"}}>{authorDisplayName}</h3>
<span className='text-white px-2'>||</span>
<h4 style={{color:"white",fontSize:"1em"}}>{moment(publishedAt).fromNow()}</h4>
</div>
<p style={{color:"white",fontSize:"0.9em",wordBreak:"break-word"}}>{textDisplay.length > 300?textDisplay.slice(0,400):textDisplay}</p>
</div>
</div>
</div>

  )
}

export default Comment