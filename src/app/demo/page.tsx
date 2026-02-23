'use client';

import { Button } from '@base-ui/react';
import React, { useState } from 'react'
import * as Sentry from "@sentry/nextjs";

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

    const clientError = ()=> {
        Sentry.captureException(new Error("Client Error: This is a error in browser."))
    }

    const apiError = async () => {
        await fetch('api/demo/api-error', {
            method: 'POST'
        })
    }

    const inngestError = async ()=> {
        Sentry.logger.info("Inngest triggered: user initiated background job.")
        await fetch("api/demo/inngest-error", {
            method: 'POST'
        })
    }
  return (
    <div className='flex gap-2 p-8'>
        <Button className='border-2 py-2 px-4 bg-amber-700 rounded-lg' onClick={handleBlocking} disabled={loadingBlock}>
            {loadingBlock ? 'Loading...' : 'Blocking'}
        </Button>
        <Button className='border-2 py-2 px-4 bg-amber-700 rounded-lg' onClick={handleBackground} disabled={loadingBackground}>
            {loadingBackground ? 'Background job...' : 'Background'}
        </Button>
        <Button className='border-2 py-2 px-4 bg-amber-700 rounded-lg' onClick={clientError}>
            Client Error
        </Button>
        <Button className='border-2 py-2 px-4 bg-amber-700 rounded-lg' onClick={apiError}>
            API Error
        </Button>
        <Button className='border-2 py-2 px-4 bg-amber-700 rounded-lg' onClick={inngestError}>
            Background Jobs Error
        </Button>
    </div>
  )
}

export default DemoPage