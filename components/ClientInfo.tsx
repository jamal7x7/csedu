import { NextRequest } from 'next/server'
import React from 'react'

const ClientInfo = (req: NextRequest) => {
  console.log('🚀 ~ ClientInfo ~ req:', req.ip)

  return <div className='flex flex-col gap-8  w-full'> {req.geo?.country}</div>
}

export default ClientInfo
