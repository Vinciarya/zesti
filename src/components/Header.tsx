import React from 'react'
import { ZestiLogo } from '@/components/ZestiLogo'

type Props = {}

export default function Header({}: Props) {
  return (
    <header className='flex justify-center py-4 -mb-28 '>
        <ZestiLogo className='z-10 h-20 cursor-pointer text-sky-800'/>

    </header>
  );
}