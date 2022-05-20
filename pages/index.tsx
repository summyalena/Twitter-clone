import type { NextPage } from 'next'
import Head from 'next/head'
import SideBar from '../comps/SideBar'
const Home: NextPage = () => {
  return (
    <div className="bg-[#000] h-[400px] flex max-w-[1500px] mx-auto min-h-screen">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

       <main className="">
         <SideBar/>
         {/* Feed */}
         {/* Widgets */}

         {/* Modal */}
       </main>
      </div>
       )
}

export default Home
