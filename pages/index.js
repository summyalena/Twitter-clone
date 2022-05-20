import Head from 'next/head'
import SideBar from '../comps/SideBar'
import Feed from '../comps/feed'
const Home = () => {
  return (
    <div className=" ">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

       <main className="bg-black max-w-[1500px] min-h-screen flex mx-auto">
         <SideBar/>
         <Feed/>
         {/* Widgets */}

         {/* Modal */}
       </main>
      </div>
       )
}

export default Home
