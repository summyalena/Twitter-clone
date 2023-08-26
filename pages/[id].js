import React from 'react'
import Head from 'next/head'
import { useSession, getSession, getProviders } from 'next-auth/react'
import { db } from '../firebase'
import { useRecoilState } from 'recoil'
import { onSnapshot, doc, collection, query, orderBy } from 'firebase/firestore'
import { modalState } from '../atoms/modalAtom'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Login from '../comps/Login'
import SideBar from '../comps/SideBar'
import Comment from '../comps/comment'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import Post from '../comps/posts'
import Widgets from '../comps/widgets'
import Modal from '/comps/modal'

function PostPage({ providers, trendingResults, followingResults }) {
  const { data: session } = useSession()
  const [post, setPost] = useState()
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const router = useRouter()
  const [comments, setComments] = useState([])

  //  I am getting this unique id and routing this page through it's unique id
  const { id } = router.query

  //  we are taking a snapshot of the comment collection
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  )

  //  I am accessing the whole document in the database to get the posts data
  useEffect(
    () =>
      onSnapshot(doc(db, 'posts', id), (snapshot) => {
        setPost(snapshot.data())
      }),
    [db, id]
  )

  if (!session) return <Login providers={providers} />
  return (
    <div className=" ">
      <Head>
        <title>{post?.username} on Twitter</title>
        <link rel="icon" href="https://rb.gy/ogau5a" />
      </Head>

      <main className="mx-auto flex min-h-screen max-w-[1500px] bg-black">
        <SideBar />

        <div className="max-w-2xl flex-grow border-l border-r border-gray-700 sm:ml-[73px] xl:ml-[370px]">
          <div className="sticky top-0 z-50 flex items-center gap-x-4 border-b border-gray-700 bg-black px-1.5 py-2 text-xl font-semibold text-[#d9d9d9]">
            <div
              onClick={() => router.push('/')}
              className="hoverAnimation flex h-9 w-9 items-center justify-center xl:px-0"
            >
              <ArrowLeftIcon className="h-5 text-white" />
            </div>
            <h6>Tweet </h6>
          </div>
          <Post id={id} post={post} postPage />
          {comments.length > 0 && (
            <div className='pb-72'>
               {comments.map((comment)=>
                (<Comment key={comment.id} id={comment.id} comment={comment.data()}/>))}
            </div>
          )}
          
        </div>
        <Widgets trendingResults={trendingResults} followingResults={followingResults}/>

        {isOpen && <Modal />}
      </main>
    </div>
  )
}

export default PostPage

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const providers = await getProviders()
  return {
    props: {
      session,
      providers
    },
  }
}
