import React from 'react'
import Image from 'next/image'
import {signIn} from 'next-auth/react';

// Next authentication allows us to use the signIn feature to authenticate our app, this has been made easy
function Login({providers}) {
 
  return (
    <div className='flex flex-col items-center space-y-10 pt-48'>
        <Image 
        src="/twitter.png"
        width={170}
        className="text-[#1d9bf0] animate"
        height={170}
        objectFit="contain"/>
    {/* // here we want to convert an object of the providers to an array and map through this array to get a div for each provider used */}
      <div>
    {Object.values(providers).map((provider)=>(
        <div key={provider.name}>
            {/* we can get unique and already customized buttons from this website */}
              {/* https://devdojo.com/tailwindcss/buttons#_ */}
            <button className='relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group'
            onClick={()=>signIn(provider.id, {callbackUrl: "/"})}>
            <span className="btn"></span>
              <span className="relative w-full text-left text-[#1d9bf0] text-lg transition-colors duration-300 ease-in-out group-hover:text-white">
                Sign in with {provider.name}
              </span>
            </button>
            </div> 
    ))
    }
     <button className="relative mt-9 p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
<span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
<span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
<span className="relative text-white">Twitter Rebuild by Alena</span>
</span>
</button>
    </div>
        </div>
  );
}

export default Login;