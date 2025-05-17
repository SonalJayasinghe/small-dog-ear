import React from 'react'
import Image from 'next/image'

const NavLogo = ({branding}:{branding: {
    logo: string
    name: string
    tagline: string
}}) => {
  return (
       <div className="flex items-center space-x-2">
            <Image src={branding.logo}  alt="logo" width={50} height={50} priority={true}/>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-bold">{branding.name}</span>
            <span className="truncate text-xs">{branding.tagline}</span>
          </div>
        </div>
  )
}

export default NavLogo