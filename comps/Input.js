import React from 'react'
import { useState } from 'react'
import { PhotographIcon, XIcon } from '@heroicons/react/solid'
function Input() {
  const [input, setInput] = useState('')
  const [selectedFile, setSelectedFile] = useState(false);
  return (
    <div
      className={`flex space-x-3 overflow-y-scroll border-b border-gray-700 p-3 `}
    >
      <img
        src="https://lh3.googleusercontent.com/a/AATXAJwCsuneWAkKlHwMPxOmLNjFACEvbtN8QPwbUsZ-=s96-c"
        alt=""
        className="h-11 w-11 cursor-pointer rounded-full"
      />
      <div className="w-full divide-y divide-gray-600">
        <div className={``}>
          <textarea
            name=""
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's happening?"
            value={input}
            rows="2"
            className="min-h-[50px] w-full bg-transparent text-lg
             tracking-wide 
             text-[#d9d9d9]
              placeholder-gray-700 
             outline-none"
          />
        </div>
        {selectedFile && (
        <div className="relative">
          <div
            className="absolute 
          top-1 left-1 flex 
          h-8 
          w-8 
          cursor-pointer 
          items-center justify-center rounded-full 
          bg-[#15181c] bg-opacity-75 hover:bg-[#272c26]"
          onClick={()=>setSelectedFile(false)}
          >
            <XIcon className="h-5 text-white" />
          </div>
          <img
            src={selectedFile}
            alt=""
            className="max-h-80 rounded-2xl object-contain"
          />
        </div>
        )}
      </div>
        <div className='flex justify-between items-center pt-2.5'>
            <div className="items-center flex justify-center">
                <div className="icon">
                    <PhotographIcon className='h-[22px] text-[#1d9bf0]'/>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Input
