const express=require('express')
const app=express()
require('dotenv').config()
const cors=require('cors')
const cookieParser=require('cookie-parser')
const pool=require('./config/db')
const userRoute=require('./Routes/userRoutes')
const convesationRoute=require('./Routes/convesations')
const messageRoute=require('./Routes/messages')
const productsRoute=require('./Routes/ProductsRoute')
const orderRoute=require('./Routes/OrderRoutes')
const socketIo = require('socket.io');

const http = require('http');
const server = http.createServer(app);
const io = socketIo(server,{
    cors:'http://localhost:5713'
});


  let users = [];
  
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    io.emit("welcome", "hello this is socket server");
  
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    socket.on(
      "sendMessage",
      ({ receiverId, senderId, type, body, mimeType, fileName,orgin }) => {
        const user = getUser(receiverId);
        const messageObj={
            receiverId,
            senderId,
            type,
            body,
            fileName,
            mimeType,
            orgin

        }
        if (user) {
         
          io.to(user.socketId).emit("getMessage",{
            senderId,
            type,
            body,
            fileName,
            mimeType,
            orgin



          } );
          io.to(user.socketId).emit("getNotification",{
            senderId,
            isRead:false,
            date:new Date()



          } );
        }
      }
    );
  
    socket.on("disconnect", () => {
      console.log("a user disconnected");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
  

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/api',userRoute)
app.use('/api/',orderRoute)
app.use('/api',productsRoute)
app.use('/api',convesationRoute)
app.use('/api',messageRoute)

const PORT=process.env.PORT || 3500
server.listen(3001, () => {
    console.log('Socket.IO server is running on port 3001');
  });
app.listen(PORT,()=>console.log(`Server is listening on ${PORT} ..`))