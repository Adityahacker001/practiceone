const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const {
   createUser,
   findUserByEmail
} = require("../models/userModel");
const register = async (req, res) => {

   try {

      const {
         full_name,
         email,
         username,
         password
      } = req.body;


      // CHECK EMPTY FIELDS
      if(
         !full_name ||
         !email ||
         !username ||
         !password
      ){
         return res.status(400).json({
            message:"All fields required"
         });
      }


      // CHECK EXISTING USER
      const existingUser =
      await findUserByEmail(email);

      if(existingUser){
         return res.status(400).json({
            message:"User already exists"
         });
      }


      // HASH PASSWORD
      const hashedPassword =
      await bcrypt.hash(password, 10);


      // CREATE USER
      await createUser(
         full_name,
         email,
         username,
         hashedPassword
      );


      res.status(201).json({
         message:"Registration successful"
      });

   } catch(err){

      console.log(err);

      res.status(500).json({
         message:"Server Error"
      });

   }

};
const login = async (req, res) => {

   try {

      const {
         email,
         password
      } = req.body;


      // FIND USER
      const user =
      await findUserByEmail(email);

      if(!user){
         return res.status(404).json({
            message:"User not found"
         });
      }


      // CHECK PASSWORD
      const isMatch =
      await bcrypt.compare(
         password,
         user.password
      );

      if(!isMatch){
         return res.status(401).json({
            message:"Wrong Password"
         });
      }


      // CREATE TOKEN
      const token = jwt.sign(
         {
            id:user.id,
            email:user.email
         },
         process.env.JWT_SECRET,
         {
            expiresIn:"7d"
         }
      );


      res.json({
         message:"Login Successful",
         token,
         user
      });

   } catch(err){

      console.log(err);

      res.status(500).json({
         message:"Server Error"
      });

   }

};
module.exports = {
   register,
   login
};