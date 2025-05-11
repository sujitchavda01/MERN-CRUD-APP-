import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();


export const create = async(req, res)=>{
    try {

        const userData = new User(req.body);

        if(!userData){
            return res.status(404).json({msg: "User data not found"});
        }

        await userData.save();
        res.status(200).json({msg: "User created successfully"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const getAll = async(req, res) =>{
    try {

        const userData = await User.find();
        if(!userData){
            return res.status(404).json({msg:"User data not found"});
        }
        res.status(200).json(userData);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const getOne = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "User not found"});
        }
        res.status(200).json(userExist);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const update = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(401).json({msg:"User not found"});
        }

        const updatedData = await User.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json({msg: "User updated successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const deleteUser = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "User not exist"});
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({msg: "User deleted successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}



// Register User
export const register = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    if (!fname || !lname || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ fname, lname, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ msg: "All fields are required" });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: "User does not exist" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }
  
      // Generate the token
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
      );
  
      // Save the token in the user's database record
      user.token = token;
      await user.save();
  
      // Send response with token
      res.status(200).json({
        token,
        user: {
          id: user._id,
          fname: user.fname,
          lname: user.lname,
          email: user.email,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  };
  

  export const logout = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      user.token = ""; // Clear the token in the database
      await user.save();
  
      res.status(200).json({ msg: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
