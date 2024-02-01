const express = require("express");
const route = express.Router();
const pool = require("../config/db");
const asyncWrapper = require("express-async-handler");

// new coversation

route.post("/conversation/create", async (req, res) => {
  const { senderId, receiverId, time } = req.body;
  const members = [senderId, receiverId];

  try {
    const savedConversation = await pool.query(
      "INSERT INTO conversations (members,createdAt) VALUES($1,$2) RETURNING *",
      [members, time]
    );

    return res.json(savedConversation.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

route.get("/:userId", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM conversations WHERE ($1)=ANY(members)`,
      [req.params.userId]
    );
    return res.json(result.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

route.post("/conversation", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM conversations WHERE ($1) =ANY(members) AND ($2)=ANY(members)",
      [req.body.userId, req.body.seller]
    );
    return res.json(result.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = route;
