import React from 'react'
import Image from 'next/image'

function Following({result}) {
  return (
    <div key={result.id} className='transition duration-200 ease-out justify-between items-center cursor-pointer hover:bg-white hover:bg-opacity-[0.03] px-3 py-4 flex'>
     <Image src={result.userImage} className="rounded-full" width={70} height={70} alt="" objectFit="cover"/>
      <div className='ml-3 leading-5 group'>
        <h4 className='group inline-block font-bold group-hover:underline'>{result.username}</h4>
        <h5 className='text-gray-500 text-[15px]'>{result.tag}</h5>
      </div>
      <button className='bg-white hover:bg-[#1d96f0] hover:text-white text-black rounded-full font-bold px-3.5 py-1.5 ml-auto text-sm'>Show More</button>
    </div>
  )
}

export default Following