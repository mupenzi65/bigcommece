import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { format } from "timeago.js";
import moment from 'moment';
import { parseISO, formatDistanceToNow } from 'date-fns'
import Image from "./Image";
import EnquiryMsg from "./EnquiryMsg";
const Messages = ({ message, own ,freind,setFreind}) => {
  let timestamp=message?.createdat
  let parsedTimestamp = parseISO(timestamp);
  let arrayBuffer=''
  if(! message.orgin && message?.type==='file'  ){
    const bufferObject = message.image;
    // Ensure the object has the correct structure

    // Create a Uint8Array from the data array
    const uint8Array = new Uint8Array(bufferObject?.data);
  
    // Create an ArrayBuffer from the Uint8Array
    arrayBuffer = uint8Array.buffer;
  
    // Now you have the ArrayBuffer
  
  }

   


  
  return (
    <div>
      {/* <p className="ml-[65px] mt-2">mupenzi 2023-03-01 09:23</p> */}
      <div
        className={`flex mt-3 mr-2 ${own ? "justify-end" : "justify-start"}`}
      >
        <div className="mt-1 ml-3">
          <Avatar></Avatar>
        </div>
        <div className="w-[300px] mb-3 ml-4 mt-1 rounded-md px-1  ">
          {message?.type === "text" && (
            <div className="bg-white px-1 rounded-md">
              <p>{message?.messages}</p>
            </div>
          )}
          {message?.type === "file" && (
            <Image
              blob={message?.messages}
              type={message?.type}
              blob2={arrayBuffer}
              orgin={message?.orgin}
            />
          )}
          {message?.type==='enquiry' &&(
            <EnquiryMsg message={message} />
          )}

          <p className="text-end mr-5">{moment(message?.createdat).calendar()}</p>
        </div>
      </div>
    </div>
  );
};

export default Messages;
