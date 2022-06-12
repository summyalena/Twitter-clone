import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  SwitchHorizontalIcon,
  TrashIcon,
} from '@heroicons/react/solid'
import React from 'react'
import { useSession } from 'next-auth/react'
import { db } from '../firebase'
import {RecoilRoot} from 'recoil'
import {modalState} from '../atoms/modalAtom' 

function posts({ post, id, postPage }) {
  const { data: session } = useSession()
  return (
    <div className="flex w-full cursor-pointer border-b border-gray-700 p-3">
      {!postPage && (
        <img
          src={post.userImage}
          alt=""
          className="mr-4 h-11 w-11 rounded-full"
        />
      )}
      <div className="flex w-full flex-col space-y-2">
        <div className={`flex ${!postPage && 'justify-between'}`}>
          {postPage && (
            <img
              src={post?.userImage}
              className="mr-4 h-11 w-11 rounded-full"
            />
          )}
          <div className="text-[#6e767d]">
            <div className="group inline-block">
              <h4
                className={`group-hover:underline' font-bold ${
                  !postPage && 'inline-block'
                }`}
              >
                {post?.username}
              </h4>
              <span
                className={`text-sm sm:text-[15px] ${!postPage && 'ml-1.5'}`}
              >
                @{post?.tag}
              </span>
            </div>{' '}
            .{' '}
            <span className="text-sm hover:underline sm:text-[15px]">
              {/* <Moment></Moment> */}
            </span>
            {!postPage && (
              <p className="mt-0.5 text-[15px] text-[#d9d9d9] sm:text-base">
                {post?.text}
              </p>
            )}
          </div>
          <div className="icon group ml-auto">
            <DotsHorizontalIcon className="h-5 flex-shrink-0 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>
        {/* we want to add the text and image if it is a postPage */}
        {postPage && (
          <p className="mt-0.5 text-[#15px] text-[#d9d9d9] sm:text-base">
            {post?.text}
          </p>
        )}
        <img
          src={post?.image}
          alt=""
          className="mr-2 max-h-[600px] rounded-2xl object-cover"
        />
        <div
          className={`flex w-10/12 justify-between text-[#6e767d] ${
            postPage && 'mx-auto'
          }`}
        >
          {/* <div className="group flex items-center space-x-1">
            <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            {comments.length > 0 && (
              <span className="text-sm group-hover:text-[#1d9bf0]">
                {comments.length}
              </span>
            )}
          </div> */}
          {/* if the session is greate */}
          {session.user.uid === post?.id ? (
            <div
              className="group flex items-center space-x-1"
              onClick={(e) => {
                e.stopPropagation()
                deleteDoc(doc(db, 'posts', id))
                router.push('/')
              }}
            >
              <div className="icon group-hover:bg-red-600/10">
                <TrashIcon className="h-5 group-hover:text-red-600" />
              </div>
            </div>
          ) : (
            <div className="group flex items-center space-x-1">
              <div className="icon group-hover:bg-green-500/10">
                <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
              </div>
            </div>
          )}

          <div className='icon group'>
            <ShareIcon className='h-5 group-hover:text-[#1d9bf0]'/>
          </div>
          <div className='icon group'>
            <ChartBarIcon className='h-5 group-hover:text-[#1d9bf0]'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default posts
