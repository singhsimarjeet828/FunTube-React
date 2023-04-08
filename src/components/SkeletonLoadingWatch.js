import { width } from '@mui/system'
import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const SkeletonLoadingWatch = () => {
  return (
   <div className=' mx-3 my-1 rounded text-white p-1 z-0 flex '>
  <SkeletonTheme baseColor='#494F55' highlightColor='#FFFFFF'>
  <div className='mx-1 my-1' style={{width:"35%", height:"100%"}}>
            <Skeleton height={90} width={"100%"} />
            </div>
            <div className='flex justify-center flex-wrap ' style={{width:"75%"}}>
               <div className=' w-full'>
               <Skeleton
                  style={{ margin: '0.5rem' }}
                  height={35}
                  width={"100%"}
               />
               </div>
               <div className=' w-full mx-2'>
               <Skeleton height={25} width="90%"/>
               </div>
            </div>
         </SkeletonTheme>
 </div>
  )
}

export default SkeletonLoadingWatch



