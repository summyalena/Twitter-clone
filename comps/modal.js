import React from 'react'
import { useSession } from 'next-auth/react'
import { db } from '../firebase'
import { Fragment, useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { modalState, postIdState } from '../atoms/modalAtom'
import { Dialog, Transition } from '@headlessui/react'
import {
  XIcon,
  PhotographIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  CalendarIcon,
} from '@heroicons/react/solid'
import { onSnapshot, doc, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import Moment from 'react-moment'
import {useRouter} from 'next/router'

function modal() {
    const router = useRouter()
    const [isOpen, setIsOpen] = useRecoilState(modalState)
  const [postId, setPostId] = useRecoilState(postIdState)
  //   i am creating a state that holds this post data when i get a snapshot from the database
  const [post, setPost] = useState()
  const { data: session } = useSession()
  const [comment, setComment] = useState("")

  async function sendComment(e) {
        e.preventDefault();
    //    this will create a comment collection in the postId and send in the comment from the text to the database
        await addDoc(collection(db,"posts",postId,"comments"),{
        comment:comment,
        username:session.user.name,
        tag:session.user.tag,
        userImage:session.user.image,
        timestamp:serverTimestamp(),
       })

       setIsOpen(false);
       setComment("");

       router.push(`/${postId}`)
       
  }
  //To get the post data, we have to use a useEffect hook that fetches the post data from the database
  useEffect(() => {
    onSnapshot(doc(db, 'posts', postId), (snapshot) => {
      setPost(snapshot.data())
    })
  }, [db])
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 pt-8" onClose={setIsOpen}>
        <div className="flex min-h-[800px] items-start justify-center px-4 pt-4 pb-20 text-center sm:block sm:min-h-screen sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="modal">
              <div className="flex items-center border-b border-gray-700 px-1.5 py-2 ">
                <div
                  onClick={() => setIsOpen(false)}
                  className="hoverAnimation h-9 w-9 items-center justify-center xl:px-0"
                >
                  <XIcon className="h-[22px]  text-white" />
                </div>
              </div>
              <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                <div className="w-full">
                  <div className="relative flex gap-x-3 text-[#6e767d]">
                    <span className="absolute left-5 top-11 z-[-1] h-full w-0.5 bg-gray-600" />
                    <img
                      src={post?.userImage}
                      className="h-11 w-11 rounded-full"
                      alt=" "
                    />

                    <div>
                      <div className="group inline-block">
                        <h4 className="username">{post?.username}</h4>
                        <span className="ml-1.5 text-sm text-[#d9d9d9] sm:text-[15px]">
                          @{post?.tag}
                        </span>
                      </div>{' '}
                      .{' '}
                      <span className="text-sm hover:underline sm:text-[15px]">
                        <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                      </span>
                      <p className="pt-1 text-[15px] text-[#d9d9d9] sm:text-base">
                        {post?.text}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-5">
                    <div className="h-11 w-11 pt-2">
                      <img src={session.user.image} className="rounded-full" />
                    </div>
                    <div className="ml-2 flex-grow">
                      <textarea
                        placeholder="Tweet your reply"
                        rows="2"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="min-h-[80px] w-full bg-transparent text-sm tracking-wide text-[#d9d9d9] placeholder-gray-500 outline-none"
                      />
                      <div className="flex items-center justify-between pt-3">
                        <div className="flex items-center">
                          <div className="icon">
                            <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
                          </div>

                          <div className="icon rotate-90">
                            <ChartBarIcon className="h-[22px] text-[#1d9bf0]" />
                          </div>

                          <div className="icon">
                            <EmojiHappyIcon className="h-[22px] text-[#1d9bf0]" />
                          </div>

                          <div className="icon">
                            <CalendarIcon className="h-[22px] text-[#1d9bf0]" />
                          </div>
                        </div>
                        <button
                          className="rounded-full disabled:bg-opacity-50 px-4 py-1.5 font-bold text-white shadow-md hover:bg-[#1a8cd8] disabled:cursor-default disabled:bg-[#1d4966] disabled:hover:bg-[#1d9bf0]"
                          disabled={!comment.trim()}
                          onClick={sendComment}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default modal
