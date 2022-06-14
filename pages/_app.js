import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react'
import {RecoilRoot} from 'recoil'
// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// we are adding the session provider to this page so the session authentication can be accessible in every part of the app

export default function App({
   Component,
   pageProps: { session, ...pageProps},}){
   return (
   <SessionProvider session={session}>
    <RecoilRoot>
     <Component {...pageProps}/>
     </RecoilRoot>
   </SessionProvider>
   )
   }

