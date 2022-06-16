import { SparklesIcon } from '@heroicons/react/outline'
import React, { useEffect } from 'react'
import Input from '../comps/Input'
import {db} from '../firebase'
import {useState} from 'react'
import Post from './posts'
import { useSession } from 'next-auth/react'
import { onSnapshot, collection, query, orderBy} from "@firebase/firestore"
function feed() {
  // we want to create a state that has an array of the posts in the database so that we can map through it to get each post 
  const [posts, setPosts] = useState([]);
  // we are using useEffect to add in posts that we create from the database created in the firebase.
  useEffect(()=>{
     const unsubscribe = onSnapshot(query(collection(db,"posts"), orderBy("timestamp","desc")),
     (snapshot) => {setPosts(snapshot.docs)});
     return ()=> {unsubscribe();};
  }, [db]);

  return (
      <div className='text-white flex-grow w-[#400px] xl:ml-[370px] border-l border-r sm:ml-[72px] max-w-xl border-gray-700'>
          <div className='flex items-center sm:justify-between sticky top-0 z-50 py-2 px-3 bg-black border-b border-gray-700'>
            <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
            <div className=' w-9 h-9 hoverAnimation ml-auto justify-center items-center xl:px-0 flex'> 
              <SparklesIcon className='h-5 text-white'/>
            </div>
          </div>
             <Input/>
             <div className='pb-70'>     
              {posts.map((post)=> (
                <Post key={post.id} id={post.id} post={post.data()} />
              ))}
             </div>
      </div>
  )
}

export default feed;

 