import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  SwitchHorizontalIcon,
  TrashIcon,
} from '@heroicons/react/outline'
import {HeartIcon as HeartIconFilled, ChatIcon as ChatIconFilled,} from "@heroicons/react/solid"
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { db } from '../firebase'
import { doc, onSnapshot, query, collection,orderBy, setDoc } from 'firebase/firestore'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import { useState } from 'react'
import router from 'next/router'
import { postIdState } from '../atoms/modalAtom'
import { deleteDoc } from '@firebase/firestore'
import Moment from 'react-moment'

function posts({ post, id, postPage }) {
  const [comments, setComments] = useState([])
  // I'm adding my session to my frontend
  const { data: session } = useSession()
  // this recoilState is set such that when the modal opens, it shows that state that was saved in the recoil state
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const [postId, setPostId] = useRecoilState(postIdState)
  const [likes,setLikes] = useState([]);
  const[liked,setLiked] = useState(false)

// we want to fetch the likes from the firebase database so we would use the snapshot method to get a snapshot of the document
// and add it to the array of likes created in the useState hook
// this useEffect performs a sideEffect function where it doesn't exactly give out an output value,yeah?
// I'm taking a snapshot of likes from collection,db,posts,id and adding the snapshot of doc to my array of likes created in the useState 
useEffect(()=>onSnapshot(collection(db,"posts",id,"likes"),
      (snapshot)=>setLikes(snapshot.docs)),[db,id]);

      // this queries the database to create a id under posts "comments" section.
useEffect(()=>{
    onSnapshot(query(collection(db,"posts",id,"comments"),orderBy("timestamp","desc")), (snapshot)=>setComments(snapshot.docs))
},[])
  // In this function I want to get the array of likes and check each like in the array and if this like matches the authenticated session it would return 
  // a true value. This like however becomes authenticated and then the if function comes in.
      useEffect( 
        ()=> setLiked(likes.findIndex((like)=>like.id === session.user?.uid) !==-1)
      ,[likes])

  // in this function, i want to be able to like and unlike a post and if its not liked, i want to add it to the collection of likes
  // here also, the person can actually delete or add the like as the like is already authenticated.
     async function postLiked(){
        if(!liked){
          await setDoc(doc(db,"posts",id,"likes",session.user.uid), {
              username: session.user.name,
          })} else{
          await deleteDoc(doc(db,"posts",id,"likes",session.user.uid));
      }
    }
  return (
    <div
      className="flex w-full cursor-pointer border-b border-gray-700 p-3"
      onClick={() => router.push(`/${id}`)}
    >
      {!postPage && (
        <img
          src={post?.userImage}
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
              {/* Moment: This adds a timestamp showing when you posted a stuff */}
              <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
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
          <div
            className="group flex items-center space-x-1"
            onClick={(e) => {
              // this helps to stop the page from routing when clicked on it
              e.stopPropagation()
              // this sets the current state of postId to the id of the post inputted at that moment
              setPostId(id)
              setIsOpen(true)
            }}
          >
            <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            {/* this here shows that if the comment is more than one then it should show by the side of the chatButton */}
            {comments.length > 0 && <span>{comments.length}</span>}
          </div>

          {/* I added the session here, I want the thrash icon to show if the current authenticated user is the owner of the post so 
          so if the session.user.uid === posts.id then it would show the thrash icon
          else it would show the other icon*/}
          {session.user.uid === post?.id ? (
            <div
              className="group flex items-center space-x-1"
              // here we want to add a delete function that deletes the post when clicked
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

         {/* in this div, i want the user to click on it and it changes to another like */}
          <div
            className="group flex items-center space-x-1"
            onClick={(e) => {
              e.stopPropagation();
              postLiked();
            }}
          >
            <div className="icon group-hover:bg-pink-600/10">
              {liked ? (
                <HeartIconFilled className="h-5 text-pink-600" />
              ) : (
                <HeartIcon className='h-5 group-hover:text-pink-600' />
              )}
            </div>
            {likes.length > 0 && (
              <span
                className={`text-sm group-hover:text-pink-600 ${
                  liked && 'text-pink-700'
                }`}
              >
                {likes.length}
              </span>
            )}
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

export default posts
