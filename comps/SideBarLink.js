import React from 'react'

function SideBarLink({Icon, text,active}) {
  return (
    <div className={` flex text-[#d9d9d9] xl:justify-start text-xl hoverAnimation space-x-3 justify-center items-center`}>
       <Icon className="h-7"/>
       <span className="hidden xl:inline">{text}</span>
    </div>
  )
}

export default SideBarLink