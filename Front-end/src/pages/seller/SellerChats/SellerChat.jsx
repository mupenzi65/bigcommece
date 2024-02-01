import React, { useEffect, useRef, useState } from "react";
import { Avatar, Divider } from "@mui/material";
import Messages from "./Messages";
import { Close, Message } from "@mui/icons-material";
import RecentChat from "./RecentChat";
import { useDataLayerValue } from "../../../context/Datalayer";
import axios from "axios";
import { useReducer } from "react";
import Dashboard from "../Dashboard";
import {io} from "socket.io-client"
const SellerChat = ({ chatOpen, setChatOpen }) => {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [{ seller }, dispatch] = useDataLayerValue();
  const [newMessage,setNewMessage]=useState("")
  const scrollRef=useRef()
  const [arrivalMessage,setArrivalMessage]=useState(null)
  const user=seller
  const socket=useRef(io("ws://localhost:8900"))

  useEffect(()=>{
    socket.current=io("ws://localhost:8900")
    socket.current.on("getMessage",data=>{
      setArrivalMessage({
        sender:data.senderId,
        messages:data.text,
        createdat:Date.now()
      })
    })
  })

  useEffect(()=>{
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)&&setMessages((prev)=>[...prev,arrivalMessage])
  },[arrivalMessage,currentChat])
  
  useEffect(()=>{
    socket.current.emit("addUser",user.id);
  },[user])
  


const date = new Date();

const year = date.getFullYear();
const month = date.getMonth(); // 0-based index (0 = January, 1 = February, ...)
const day = date.getDate();
const hour = date.getHours();
const minute = date.getMinutes();
const second = date.getSeconds();
const millisecond = date.getMilliseconds();

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get("http://localhost:3500/" + seller.id);
        console.log(res.data);
        setConversation(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [seller]);

  const closeBtn = () => {
    setChatOpen(false);
  };

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3500/message/${currentChat?.id}`
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(messages)
    getMessage();
  }, [currentChat]);

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const message={
      sender:seller.id,
      conversationId:currentChat.id,
      text:newMessage,
      createdAT:date
    }

    const receiverId=currentChat.members.find((m)=>m !==user.id)

    socket.current.emit("sendMessage",{
      senderId:user.id,
      receiverId,
      text:newMessage
    })

    try {
      
      const res=await axios.post("http://localhost:3500/message",{...message})
      setMessages([...messages,res.data])
      setNewMessage("")
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])





 
  return (
    <div>
      <div className="w-[800px] z-50 right-12 border top-[10%] flex fixed h-[700px]">
        <div className="bg-gray-100 basis-[60%]">
          <div className="h-[40px] shadow-xl">
            <p className="font-bold px-3">Mupenzi abdillah</p>
          </div>
          <div className="h-[350px] overflow-y-auto ">
            {currentChat ? (
              <>
                {messages?.map((m) => (
                  <div ref={scrollRef} >
                    <Messages message={m} own={m.sender === seller?.id} />
                  </div>
                ))}
              </>
            ) : (
              <div className="w-full mt-12    ">
                <p className="text-center ml-12 cursor-default max-w-[300px] overflow-x-hidden text-[28px] text-gray-500 ">
                  Open conversation to start chat
                </p>
              </div>
            )}
          </div>
          <Divider />
          <div className="">
            <div className="h-[30px]"></div>
            <div className="mx-12">
              <textarea
                name=""
                id=""
                cols="50"
                placeholder="type something here "
                className="px-3 "
                rows="6"
                onChange={(e)=>setNewMessage(e.target.value)}
                value={newMessage}
              ></textarea>
              <button onClick={handleSubmit} className="absolute ml-[-92px] mt-[100px] bg-orange-600 text-white p-2 rounded-3xl w-[90px]">
                Send
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white basis-[40%] ">
          <div className="h-[40px] justify-between flex shadow-xl">
            <div className="flex gap-2 mx-2">
              <Message />
              <p>Messenger</p>
            </div>
            <div className="">
              <Close onClick={closeBtn} />
            </div>
          </div>
          {conversation.map((c, i) => (
            <RecentChat
              key={i}
              currentChat={currentChat}
              setCurrentChat={setCurrentChat}
              conversation={c}
              currentUser={seller}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerChat;
