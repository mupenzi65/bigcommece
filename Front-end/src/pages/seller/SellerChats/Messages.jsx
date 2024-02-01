import { Avatar } from '@mui/material'
import React from 'react'
import {format} from 'timeago.js'
const Messages = ({message,own}) => {

  return (
    <div>
        {/* <p className="ml-[65px] mt-2">mupenzi 2023-03-01 09:23</p> */}
              <div className={`flex mt-3 mr-2 ${own ?'justify-end':'justify-start'}`}>
                <div className="mt-1 ml-3">
                  <Avatar>

                  </Avatar>
                </div>
                <div className="w-[300px] mb-3 ml-4 mt-1 rounded-md px-1  ">
                  <div className='bg-white px-1 rounded-md'>
                  <p>{message?.messages}</p>
                  </div>
                  
                  <p className='text-end mr-5'>{format(message?.createdat)}</p>
                </div>
              </div>
    </div>
  )
}

export default Messages