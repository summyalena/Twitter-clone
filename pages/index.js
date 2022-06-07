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

export async function getServerSideProps(context){
    
      const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then((res)=>{
         res.json()
      })
      const followingResults = await fetch("https://jsonkeeper.com/b/WWMJ").then((res)=>{
        res.json()
      })
      
      const providers = await getProviders()
      const session = await getSession(context)

      return {
        props: {
          providers,
          session,
          trendingResults,
          followingResults
        }
      }
}