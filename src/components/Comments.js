import React from 'react'
import Comment from './Comment'
import { useDispatch } from 'react-redux'
import { getCommentsDetails } from '../redux/actions/comments.act'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import numeral from 'numeral'
const Comments = ({videoId, totalComments}) => {


const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsDetails(videoId))
    
  }, [videoId, dispatch])


  const  comments = useSelector(
    state => state.commentDetails.comments)


    const _comments = comments?.map(comment=>comment.snippet.topLevelComment.snippet)
  return (
<>
<h3 className='text-white mx-2'>{numeral(totalComments).format('0,a').toUpperCase()} Comments</h3>
    {_comments?.map((element, i)=>(
      <Comment comment={element} key={i}
       />
    ))}
 </>
  )
}

export default Comments