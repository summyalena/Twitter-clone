import Head from 'next/head'
import SideBar from '../comps/SideBar'
import Feed from '../comps/feed'
import Login from '../comps/Login.js'
import Modal from '../comps/modal'
import { useRecoilState } from 'recoil'
import { getProviders, getSession, useSession } from 'next-auth/react'
import { modalState } from '../atoms/modalAtom'
import Widgets from '../comps/widgets'
import {useState} from 'react'

const Home = ({providers}) => {
// to however retrieve the session in the frontend
  const {data:session} = useSession();
  const [isOpen,setIsOpen] = useRecoilState(modalState)
  const [loading,setLoading] = useState(false);
  // if there is no authentication then it shows the login page first
  if(!session) return <Login providers={providers}/>
 
  return (
    <div className=" ">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="https://rb.gy/ogau5a" />
      </Head>

       <main className="bg-black max-w-[1500px] min-h-screen flex mx-auto">
         <SideBar/>
         <Feed/> 
         <Widgets />

        {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen}/> }
       </main>
      </div>
       )
}

export default Home


export async function getServerSideProps(context){
      const session = await getSession(context);
      const providers = await getProviders();
      return {
        props:{
            providers,
            session,
        }
      }
}