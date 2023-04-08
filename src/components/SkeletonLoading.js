import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const SkeletonLoading = () => {
  return (
   <div className=' mx-3 my-1 rounded text-white p-1 z-0 '  id="main" style={{width:"245px"}}>
  <SkeletonTheme baseColor='#494F55' highlightColor='#FFFFFF'>
            <Skeleton height={180} />
            <div className='flex justify-center '>
               <div className=' w-1/5 mx-1'>
               <Skeleton
                  style={{ margin: '0.5rem' }}
                  circle
                  height={40}
                  width={40}
               />
               </div>
               <div className=' w-4/5 mx-1'>
               <Skeleton height={40}   style={{ margin: '0.5rem' }} width="90%"/>
               </div>
            </div>
         </SkeletonTheme>
 </div>
  )
}

export default SkeletonLoading