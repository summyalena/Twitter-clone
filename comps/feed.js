import { SparklesIcon } from '@heroicons/react/outline'
import React from 'react'
import Input from '../comps/Input'
function feed() {
  return (
    <div className="text-white border-l border-r border-gray-700 sm:ml-[72px] xl:ml-[370px] max-w-2xl flex-grow">
    
      <div className='text-[#d9d9d9] flex items-center sm:justify-between sticky top-0 z-50 py-2 px-3 bg-black border-b border-gray-700'>
          <h2 className="text-lg sm:text-xl font-bold">Home</h2>
          <div className="hoverAnimation ml-auto justify-center items-center w-9 h-9 flex xl:px-0">
          <SparklesIcon className="h-5 text-white"/>
          </div>
      </div>

        <Input/>
    </div>
  )
}

export default feed