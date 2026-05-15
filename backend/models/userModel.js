const db = require("../config/database");


// CREATE USER
const createUser = async (full_name, email, username, password) => {
   const sql = `
      INSERT INTO users
      (full_name, email, username, password)
      VALUES (?, ?, ?, ?)
   `;
   const [result] = await db.query(sql, [full_name, email, username, password]);
   return result;
};



// FIND USER BY EMAIL
const findUserByEmail = async (email) => {
   const sql = "SELECT * FROM users WHERE email=?";
   const [result] = await db.query(sql, [email]);
   return result[0];
};


module.exports = {
   createUser,
   findUserByEmail
};