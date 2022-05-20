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

function SideBar() {
  return (
    <div className="fixed hidden h-full flex-col items-center p-2 sm:flex xl:w-[340px] xl:items-start ">
      <div className="hoverAnimation flex h-14 w-14 items-center justify-center p-0 xl:ml-24">
        <Image src="https://rb.gy/ogau5a" width={30} height={30} />
      </div>

      <div className="mt-4 mb-2.5 space-y-1.5  xl:ml-24">
        <SideBarLink text="Home" active Icon={HomeIcon} />
        <SideBarLink text="Explore" Icon={HashtagIcon} />
        <SideBarLink text="Notifications" Icon={BellIcon} />
        <SideBarLink text="Messages" Icon={InboxIcon} />
        <SideBarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SideBarLink text="Lists" Icon={ClipboardListIcon} />
        <SideBarLink text="Profile" Icon={UserIcon} />
        <SideBarLink text="More" Icon={DotsCircleHorizontalIcon} />
      </div>

      <button className="ml-auto hidden h-[50px] w-56 rounded-full bg-[#1d9bf0] text-lg font-bold text-white shadow-md hover:bg-[#1a8cd8] xl:inline ">
        Tweet
      </button>  
      <div className=" flex xl:ml-auto mt-auto hoverAnimation items-center justify-center xl:-mr-5 text-[#d9d9d9]">
        <img
          src="https://lh3.googleusercontent.com/a/AATXAJwCsuneWAkKlHwMPxOmLNjFACEvbtN8QPwbUsZ-=s96-c"
          alt=""
          className="h-10 w-10 rounded-full xl:mr-2.5"
        />
        <div className="hidden leading-5 xl:inline">
          <h4 className="font-bold">Firebase 1875</h4>
          <p className="text-[#6e767d]">@firebase1875</p>
        </div>
        <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10"/>
      </div>
    </div>
  )
}

export default SideBar
