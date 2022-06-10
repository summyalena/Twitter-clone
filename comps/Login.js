import React from 'react'
import Image from 'next/image'
import {signIn} from 'next-auth/react';

// Next authentication allows us to use the signIn feature to authenticate our app, this has been made easy
function Login({providers}) {
  return (
    <div className='flex flex-col items-center space-y-10 pt-48'>
        <Image 
        src="https://rb.gy/ogau5a"
        width={150}
        height={150}
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
    </div>
        </div>
  );
}

export default Login;