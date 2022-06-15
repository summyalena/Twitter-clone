import { SearchIcon } from '@heroicons/react/solid'
import React from 'react'
import Trending from '../comps/Trending'
import Following from '../comps/Following'

function widgets({ trendingResults, followingResults }) {
  return (
    <div className="hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5">
      <div className="sticky top-0 py-1.5 bg-black z-50 w-11/12 xl:w-9/12">
        <div className="flex items-center bg-[#202327] p-3 rounded-full relative">
          <SearchIcon className="text-gray-500 h-5 z-50" />
          <input
            type="text"
            className="bg-transparent 
            placeholder-gray-500 
            outline-none 
            text-[#d9d9d9] 
            absolute 
            inset-0 
            pl-11 
            border border-transparent w-full focus:border-[#1d9bf0] rounded-full focus:bg-black focus:shadow-lg"
            placeholder="Search Twitter"
          /> 
        </div>
      </div>
      <div className="w-11/12 space-y-3 rounded-xl bg-[#15181c] pt-2 text-[#d9d9d9] xl:w-9/12">
        <h4 className="px-4 text-xl font-bold">What's happening?</h4>
        {trendingResults.map((result, index) => (
          <Trending result={result} key={index} />
        ))}
        <button className="trendBtn">Show More</button>
      </div>
      

      <div className="w-11/12 space-y-3 rounded-xl bg-[#15181c] pt-2 text-[#d9d9d9] xl:w-9/12">
        <h4 className="px-4 text-xl font-bold">Who to follow?</h4>
        {followingResults.map((result, index) => (
          <Following result={result} key={index} />
        ))}
        <button className="trendBtn">Show More</button>
      </div>
    </div>
  )
}

export default widgets
