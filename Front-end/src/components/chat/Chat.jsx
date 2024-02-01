import React, { useCallback, useEffect, useRef, useState } from "react";
import { Avatar, Divider, IconButton } from "@mui/material";
import Messages from "./Messages";
import {
  Close,
  Delete,
  EmojiEmotions,
  Message,
  Send,
} from "@mui/icons-material";
import RecentChat from "./RecentChat";
import { useDataLayerValue } from "../../context/Datalayer";
import axios from "axios";
import { useReducer } from "react";
import { io } from "socket.io-client";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { ChatContext } from "../../pages/Layout";
import { useContext } from "react";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { light } from "@mui/material/styles/createPalette";
import OrderModol from "./OrderModol";
const Chat = ({ setChatOpen }) => {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [{ user, notifications, chat }, dispatch] = useDataLayerValue();
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [arrivalNotification, setArrivalNotification] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();
  const [file, setfile] = useState(null);
  const fileInput = useRef(null);
  const [newNotifications, setNewNotifications] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [freind, setFreind] = useState(null);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const pickerRef = useRef(null);
  const [image, setImage] = useState();
  const [orderModolOpen, setOrderModolOpened] = useState(false);

  const specificDateTime = new Date();
  const formattedDateTime = `${specificDateTime.getFullYear()}-${(
    specificDateTime.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${specificDateTime
    .getDate()
    .toString()
    .padStart(2, "0")} ${specificDateTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${specificDateTime
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${specificDateTime
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;

  useEffect(() => {
    socket.current = io("http://localhost:3001");
    //recieve message and notification
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        messages: data.body,
        createdat: Date.now(),
        type: data.type,
        orgin: data.orgin,
      });
    });

    // // socket.current.on("getNotification",(res)=>{
    // //   setArrivalNotification(res)

    //   // if(isChatOpen){
    //   //   setNewNotifications((prev)=>[{...res,isRead:true},...prev])
    //   // }else{
    //   //   setNewNotifications((prev)=>[res,...prev])
    //   // }
    // })
    // console.log(newNotifications)

    // return()=>{
    //   socket.current.off("getMessage")
    //   socket.current.off("getNotification")

    // }
  }, [socket, currentChat]);

  useEffect(() => {
    setNewNotifications(notifications);
  }, []);

  // useEffect(()=>{
  //   if(newNotifications !==null){
  //     dispatch({
  //       type:'SET_NOTIFICATION',
  //       notifications:newNotifications

  //     })

  //   }

  // },[newNotifications])

  const sendNotification = async () => {
    const receiverId = currentChat?.members.find((m) => m !== user.id);
    const notificationObj = {
      senderId: user.id,
      receiverId,
      isRead: false,
    };

    try {
      const res = await axios.post("http://localhost:3500/api/notification", {
        ...notificationObj,
      });

      if (currentChat?.members.includes(res.senderId)) {
        setNewNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNewNotifications((prev) => [res, ...prev]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);

    if (currentChat?.members.includes(arrivalNotification?.senderId)) {
      setNewNotifications((prev) => [
        { ...arrivalNotification, isRead: true },
        ...prev,
      ]);

      setArrivalNotification(null);
    } else if (arrivalNotification !== null) {
      setNewNotifications((prev) => [arrivalNotification, ...prev]);
      setArrivalNotification(null);
    }
  }, [arrivalMessage, currentChat, arrivalNotification]);

  useEffect(() => {
    socket.current.emit("addUser", user.id);
  }, [user]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get("http://localhost:3500/api/" + user.id);
        setConversation(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [user]);

  const closeBtn = () => {
    setChatOpen(false);
  };

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3500/api/message/${currentChat?.id}`
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    const receiverId = currentChat?.members.find((m) => m !== user.id);
    e.preventDefault();
    const formData = new FormData();
    formData.append("senderId", user.id);
    formData.append("receiverId", receiverId);
    formData.append("conversationId", currentChat.id);
    formData.append("text", newMessage);
    formData.append("createdAT", formattedDateTime);
    formData.append("image", file);
    formData.append("type", file ? "file" : "text");

    if (file) {
      socket.current.emit("sendMessage", {
        senderId: user.id,
        receiverId,
        type: "file",
        body: file,
        mimeType: file.type,
        fileName: file.name,
        orgin: "socket",
      });
      setNewMessage("");
      setfile();
    } else {
      socket.current.emit("sendMessage", {
        senderId: user.id,
        receiverId,
        type: "text",
        body: newMessage,
        mimeType: "",
        fileName: "",
        orgin: "socket",
      });
      setNewMessage("");
      setfile();
    }

    try {
      const res = await axios.post(
        "http://localhost:3500/api/message",
        formData
      );
      setMessages([...messages, res.data]);
      sendNotification();
      scrollToBottom(scrollRef);

      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToBottom = (containerRef) => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  useEffect(() => {
    scrollToBottom(scrollRef);
  }, [messages]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.type.startsWith("image/")) {
        setfile(e.target.files[0]);
        const imageUrl = URL.createObjectURL(selectedFile);
        setImage(imageUrl);
      } else {
        // File is not an image
        alert("Please select an image file.");
      }
    }
  };

  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setNewMessage(newMessage + emoji);
  };

  useEffect(() => {
    // Function to handle click outside of the emoji picker
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setEmojiOpen(false); // Close the emoji picker if clicked outside
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmojiClick = () => {
    setEmojiOpen(!emojiOpen); // Toggle the state when clicking to show/hide the picker
  };

  return (
    <div>
      <div className="w-[1000px] z-50 right-12 border top-[10%] flex fixed h-[700px]">
        <div className="bg-gray-100 basis-[40%]">
          <div className="h-[40px] shadow-xl"></div>
          <div className="h-[350px] overflow-y-auto " ref={scrollRef}>
            {currentChat ? (
              <>
                {messages?.map((m, index) => (
                  <div ref={scrollRef} key={index}>
                    <Messages
                      message={m}
                      freind={freind}
                      key={index}
                      own={m.sender === user?.id}
                    />
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
          {orderModolOpen && (
            <div>
              <OrderModol
                setOrderModolOpened={setOrderModolOpened}
                currentChat={currentChat}
                currentUser={user}
              />
            </div>
          )}

          {currentChat !== null && (
            <div className="absolute  ml-2 top-[50%]">
              {user?.user_role === "seller" && (
                <button
                  onClick={() => setOrderModolOpened(true)}
                  className="bg-orange-600 text-white px-1 rounded-2xl"
                >
                  Create Order
                </button>
              )}
            </div>
          )}
          {file && (
            <div className="w-[300px] h-[400px] absolute top-12 left-[90px] shadow-lg bg-white">
              <div className="h-[300px]">
                <img src={image} alt="" />
              </div>
              <Divider />
              <div>
                <button
                  onClick={handleSubmit}
                  className="bg-orange-500 text-white rounded-2xl px-2 ml-12 mt-4"
                >
                  <span className="mr-1">Send</span>

                  <Send />
                </button>
                <button
                  onClick={() => setfile(null)}
                  className="bg-orange-500 text-white rounded-2xl px-2 ml-12 mt-4"
                >
                  <span className="mr-1">Delete</span>

                  <Delete />
                </button>
              </div>
            </div>
          )}
          {emojiOpen && (
            <div ref={pickerRef} className="absolute z-20 top-10 right-[250px]">
              <Picker theme={"light"} data={data} onEmojiSelect={addEmoji} />
            </div>
          )}
          <div className="">
            <div className=" mx-12 mt-2 ">
              {currentChat !== null && (
                <div className="ml-12">
                  <AddPhotoAlternateIcon
                    sx={{ color: "gray", cursor: "pointer" }}
                    onClick={() => fileInput.current.click()}
                  />
                  <EmojiEmotions
                    onClick={handleEmojiClick}
                    sx={{ color: "orange", cursor: "pointer" }}
                  />
                </div>
              )}

              <form action="" encType="multipart/form-data">
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  multiple={false}
                  ref={fileInput}
                  className="hidden"
                  name="image"
                  onChange={handleFileChange}
                />
                <div className="mx-12">
                  <textarea
                    name=""
                    id=""
                    cols="50"
                    placeholder="type something here "
                    className={` ${
                      currentChat === null && " pointer-events-none "
                    } px-3  `}
                    rows="6"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    onClick={handleSubmit}
                    className={`absolute ml-[-92px] mt-[100px] ${
                      newMessage === "" &&
                      "disabled opacity-20 cursor-not-allowed"
                    } bg-orange-600 text-white p-2 rounded-3xl w-[90px]`}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="bg-white basis-[60%] ">
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
            <div key={i} onClick={() => setCurrentChat(c)}>
              <RecentChat
                key={i}
                newNotifications={newNotifications}
                setNewNotifications={setNewNotifications}
                conversation={c}
                currentUser={user}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
