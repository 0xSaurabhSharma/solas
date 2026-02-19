'use client';

import { Button } from '@base-ui/react';
import React, { useState } from 'react'

const DemoPage = () => {

    const [loadingBlock, setLoadingBlock] = useState(false)
    const [loadingBackground, setLoadingBackground] = useState(false)

    const handleBlocking = async ()=>{
        setLoadingBlock(true)
        await fetch('api/demo/blocking',{
            method: 'POST'
        })
        setLoadingBlock(false)
    }

    const handleBackground = async ()=>{
        setLoadingBackground(true)
        await fetch('api/demo/background',{
            method: 'POST'
        })
        setLoadingBackground(false)
    }
  return (
    <div className='flex gap-2 p-8'>
        <Button className='border-2 py-2 px-4 bg-amber-700 rounded-lg' onClick={handleBlocking} disabled={loadingBlock}>
            {loadingBlock ? 'Loading...' : 'Blocking'}
        </Button>
        <Button className='border-2 py-2 px-4 bg-amber-700 rounded-lg' onClick={handleBackground} disabled={loadingBackground}>
            {loadingBackground ? 'Background job...' : 'Background'}
        </Button>
    </div>
  )
}

export default DemoPage