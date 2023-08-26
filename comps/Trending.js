import { DotsCircleHorizontalIcon } from '@heroicons/react/outline'
import React from 'react'
import Image from 'next/image';

function Trending({result}) {
  return (
    <div key={result.id}  className='hover:bg-white hover:bg-opacity-[0.03] cursor-pointer transition duration-200 ease-out px-4 py-3 flex items-center justify-between'>
     <div className='space-y-0.5'>
        <p className='text-xs tex-[#6e7d7d] font-medium'>{result.heading}</p>
        <h6 className='text-sm max-w-[250px] font-bold'>{result.description}</h6>
        <p className='text-[#1d96f0] text-xs font-medium max-w-[250px]'>Trending with{result.tags.map((el) => (
        <span key={el.id} className='tag'>{el.name}</span>))}</p>
     </div>
     {result.image ? <Image src={result.image} width={70} height={70} objectFit="cover" className="rounded-2xl" alt={result.heading}/> :
     <div className='icon group'>
        <DotsCircleHorizontalIcon className='h-5 w-5 text-[#6e767d] group-hover:text-[#1d9bf0]'/>
     </div> }
    </div>
  )
}

export default Trending