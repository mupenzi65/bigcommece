const pool = require("../config/db");
const asyncWrapper = require("express-async-handler");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const { createTokenUser, createJWT } = require("../utils");

const CreateUser = async (req, res) => {
  const { fname, email, password } = req.body;

  // check if user exists
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await pool.query(
      "INSERT INTO users (fname,email,password) VALUES($1,$2,$3) ON CONFLICT (email) DO NOTHING RETURNING *",
      [fname, email, hashedPassword]
    );

    if (user.rows.length > 0) {
      const { id, fname, email } = user.rows[0];
      const userObject = { id, email };
      const tokenUser = createTokenUser(userObject);
      const token = createJWT({ payload: tokenUser });
      const userData = {
        id: id,
        email: email,
        fullName: fname,
        token: token,
      };
      return res.json(userData);
    } else {
      return res.json("user arleady exists");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const LoginForUser = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const userPassword = password;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email =($1)", [
      email,
    ]);

    if (user.rows.length > 0) {
      const [{ password }] = user.rows;
      const isMacth = await bcrypt.compare(userPassword, password);

      if (!isMacth) {
        return res.json({ msg: "invalid credential" });
      }

      const [{ id, email, fullname, image, user_role }] = user.rows;
      const userObject = { id, email };
      const tokenUser = createTokenUser(userObject);
      const token = createJWT({ payload: tokenUser });
      const userData = {
        id: id,
        email: email,
        fullName: fullname,
        image: image,
        user_role: user_role,
        token: token,
      };
      return res.json(userData);
    } else {
      return res.json("Account not exist ,register instead");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

const CreateSeller = asyncWrapper(async (req, res) => {
  const { image, fname, lname, country, tel, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    console.log("first");
    const seller = await pool.query(
      "INSERT INTO sellers (image,fname,lname,country,tel, email, password) VALUES($1,$2,$3,$4,$5,$6,$7)  ON CONFLICT (email) DO NOTHING  RETURNING *",
      [image, fname, lname, country, tel, email, hashedPassword]
    );

    if (seller.rows.length > 0) {
      return res.json(seller.rows[0]);
    } else {
      return res.json("seller arleady exists");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

const getSeller = asyncWrapper(async (req, res) => {
  const { userId } = req.params;

  try {
    const seller = await pool.query("SELECT * FROM users WHERE id=($1)", [
      userId,
    ]);
    const [{ id, email, fname, lname, tel, image }] = seller.rows;
    const userData = {
      id: id,
      email: email,
      fname: fname,
      lname: lname,
      image: image,
      tel: tel,
    };
    res.json(userData);
  } catch (error) {
    res.json(error);
  }
});

const loginForSeller = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const userPassword = password;

  try {
    const seller = await pool.query("SELECT * FROM sellers WHERE email =($1)", [
      email,
    ]);

    if (seller.rows.length > 0) {
      const [{ password }] = seller.rows;
      const isMacth = await bcrypt.compare(userPassword, password);

      if (!isMacth) {
        return res.json({ msg: "invalid credential" });
      }

      const [{ id, email, fname, lname, tel, image }] = seller.rows;
      const userObject = { id, email };
      const tokenUser = createTokenUser(userObject);
      const token = createJWT({ payload: tokenUser });
      const userData = {
        id: id,
        email: email,
        fName: fname,
        lName: lname,
        image: image,
        tel: tel,
        token: token,
      };
      return res.json(userData);
    } else {
      return res.json("Account not exist ,register instead");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  CreateUser,
  LoginForUser,
  CreateSeller,
  loginForSeller,
  getSeller,
};
