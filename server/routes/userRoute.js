import express from "express";
import { create, deleteUser, getAll, getOne, update,register,login,logout } from "../controller/userController.js";
import auth from "../middleware/auth.js";
const route = express.Router();

route.post("/create",auth, create);
route.get("/getall",auth, getAll);
route.get("/getone/:id",auth, getOne);
route.put("/update/:id",auth, update);
route.delete("/delete/:id",auth, deleteUser);

route.post("/register", register);
route.post("/login", login);
route.post("/logout", auth, logout);


export default route;