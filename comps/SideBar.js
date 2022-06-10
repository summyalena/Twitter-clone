import SideBarLink from './SideBarLink'
import React from 'react'
import { DotsHorizontalIcon, HomeIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  UserIcon,
  ClipboardListIcon,
  DotsCircleHorizontalIcon,
} from '@heroicons/react/outline'
import {useSession, signOut} from 'next-auth/react'

function SideBar() {
  const {data:session} = useSession();
    return (
    <div className="fixed hidden h-full flex-col items-center p-2 sm:flex md:w-[340px] md:items-start ">
       <div className='justify-center items-center hoverAnimation p-0 xl:ml-24 mt-1 flex h-14 w-14'>
         <Image src='https://rb.gy/ogau5a' alt="twitter" width={30} height={30}/>
       </div>
        <div className='mt-4 mb-3 space-y-2.5 xl:ml-24'>
          <SideBarLink Icon={HomeIcon} active text="Home"/>
          <SideBarLink Icon={HashtagIcon} text="Explore"/>
          <SideBarLink Icon={BellIcon} text="Notifications"/>
          <SideBarLink Icon={InboxIcon} text="Messages"/>
          <SideBarLink Icon={BookmarkIcon} text="Bookmarks"/>
          <SideBarLink Icon={ClipboardListIcon} text="Lists"/>
          <SideBarLink Icon={UserIcon} text="Profile"/>
          <SideBarLink Icon={DotsCircleHorizontalIcon} text="More"/>
        </div>
        
        <button className='rounded-full p-3 text-white w-56 text-lg ml-auto shadow-md font-bold h-[50px] hidden xl:inline bg-[#1d9bf0] hover:bg-[#198cd8] '>
          Tweet
        </button>

        <div onClick={signOut} className='rounded-full flex mt-auto xl:ml-auto xl:-mr-3 justify-center items-center text-[#d9d9d9] hoverAnimation '>
            <img src={session.user.image} alt='' className=' h-10 w-10 rounded-full xl:mr-2.5'/>
          <div className='hidden leading-5 xl:inline'>
            <h4 className='font-bold'>{session.user.name}</h4>
            <p className='text-[#6e767d]'>@{session.user.tag}</p>
          </div>
        <DotsHorizontalIcon className='h-5 ml-10 hidden xl:inline'/>
    </div>
    </div>
  )
}

export default SideBar




// <div className="hoverAnimation flex h-14 w-14 items-center justify-center p-0 xl:ml-24">
// <Image src="https://rb.gy/ogau5a" width={30} height={30} />
// </div>

// <div className="mt-4 mb-2.5 space-y-1.5  xl:ml-24">
// <SideBarLink text="Home" active Icon={HomeIcon} />
// <SideBarLink text="Explore" Icon={HashtagIcon} />
// <SideBarLink text="Notifications" Icon={BellIcon}/>
// <SideBarLink text="Messages" Icon={InboxIcon}/>
// <SideBarLink text="Bookmarks" Icon={BookmarkIcon}/>
// <SideBarLink text="Lists" Icon={ClipboardListIcon}/>
// <SideBarLink text="Profile" Icon={UserIcon}/>
// <SideBarLink text="More" Icon={DotsCircleHorizontalIcon}/>
// </div>

// <button className="ml-auto hidden h-[50px] w-56 rounded-full bg-[#1d9bf0] text-lg font-bold text-white shadow-md hover:bg-[#1a8cd8] xl:inline ">
// Tweet
// </button>  
// <div className=" flex xl:ml-auto mt-auto hoverAnimation items-center justify-center xl:-mr-5 text-[#d9d9d9]">
// <img
//   src="https://lh3.googleusercontent.com/a/AATXAJwCsuneWAkKlHwMPxOmLNjFACEvbtN8QPwbUsZ-=s96-c"
//   alt=""
//   className="h-10 w-10 rounded-full xl:mr-2.5"
// />
// <div className="hidden leading-5 xl:inline">
//   <h4 className="font-bold">Firebase 1875</h4>
//   <p className="text-[#6e767d]">@firebase1875</p>
// </div>
// <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10"/>
// </div>