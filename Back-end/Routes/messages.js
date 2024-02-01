const express = require("express");
const route = express.Router();
const pool = require("../config/db");
const asyncWrapper = require("express-async-handler");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.post("/message", upload.single("image"), async (req, res) => {
  const {
    conversationId,
    senderId,
    text,
    createdAT,
    linkId,
    type,
    receiverId,
  } = req.body;

  try {
    const savedmessage = await pool.query(
      "INSERT INTO messages (conversationId,sender,messages,image,type,createdat,linkid) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING * ",
      [
        conversationId,
        senderId,
        text,
        req.file ? req.file.buffer : null,
        type,
        createdAT,
        linkId,
      ]
    );

    // save notification

    return res.json(savedmessage.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

route.post("/notification", async (req, res) => {
  const { senderId, receiverId, isRead } = req.body;

  try {
    // save notification

    const notification = await pool.query(
      "INSERT INTO notifications (senderId,receiverId,isRead) VALUES($1,$2,$3) RETURNING *",
      [senderId, receiverId, isRead]
    );

    res.json(notification.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

route.get("/message/:conversationId", async (req, res) => {
  try {
    const allmessage = await pool.query(
      "SELECT * FROM messages WHERE conversationId=($1)",
      [req.params.conversationId]
    );

    res.json(allmessage.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

route.post("/getnotifications", async (req, res) => {
  try {
    const allNot = await pool.query(
      "SELECT * FROM notifications WHERE receiverId=($1) AND isRead=($2) ",
      [req.body.receiverId, "false"]
    );

    res.json(allNot.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});
route.post("/editNotifications", async (req, res) => {
  try {
    
    const allNot = await pool.query(
      "UPDATE  notifications SET isRead=($1) WHERE   receiverId=($2) AND senderId=($3) RETURNING * ",
      ["true", req.body.receiverId, req.body.senderId]
    );

    res.json(allNot.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = route;
