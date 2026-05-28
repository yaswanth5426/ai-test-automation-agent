import React from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';

function WorkspaceHeader() {
  return (
    <div className='flex w-full justify-between p-4 items-center shadow-sm bg-white'>
          <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
    
           <ul className='flex gap-8 text-sm font-medium'>
                <li className='hover:text-blue-600 cursor-pointer'>Workspace</li>
                <li className='hover:text-blue-600 cursor-pointer'>Pricing</li>
                <li className='hover:text-blue-600 cursor-pointer'>Support</li>
            </ul>
    
    
    
    
    
       <UserButton/>
    </div>
  )
}

export default WorkspaceHeader