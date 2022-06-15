import React from 'react'
import Moment from 'react-moment'
import { ChartBarIcon,ChatIcon,DotsHorizontalIcon,HeartIcon,ShareIcon,} from "@heroicons/react/outline";


function comment({comment}) {
  return (
    <div className='border-b border-gray-700 flex cursor-pointer'>
       <img src={comment?.userImage} alt="" className='h-11 w-11 rounded-full'/>
       <div className='flex flex-col space-y-2 w-full'>
           <div className='flex justify-between'>
            <div className='text-[#6e767d]'>
                <div className='inline-block group'>
                <h4 className='font-bold text=[#d9d9d9] text-[15px] sm:text-base inline-block group-hover:underline'>{comment?.username}</h4>
                <span className='text:sm sm:text-[15px] ml-1.5'>@{comment?.tag}{" "}</span>
                </div>{" "}
                .{" "}
                <span className='hover:underline text-sm sm:text-[15px]'>
                <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
                </span>
                <p className='text-[15px] text-[#d9d9d9] mt-0.5 max-w-lg overflow-scroll sm:text-base'>{comment?.comment}</p>
            </div>
            <div className="icon group flex-shrink-0">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>

        <div className="text-[#6e767d] flex justify-between w-10/12">
          <div className="icon group">
            <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>

          <div className="flex items-center space-x-1 group">
            <div className="icon group-hover:bg-pink-600/10">
              <HeartIcon className="h-5 group-hover:text-pink-600" />
            </div>
            <span className="group-hover:text-pink-600 text-sm"></span>
          </div>

          <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
           </div>
       </div>
    </div>
  )
}

export default comment