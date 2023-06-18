const express = require("express");
const router = express.Router();

const User = require("../models/User");

const {login, signup, forgotPassword, updateProfile, getOrders, getAllOrders, orderStatusUpdate, getUserById} = require("../Controllers/Auth");
const {auth,isAdmin} = require("../middlewares/auth");


router.post("/login", login);
router.post("/signup", signup);



router.post("/forgot-password" , forgotPassword)

//protected route

router.get("/user-auth",auth,(req,res)=>{
    res.status(200).send({ok:true})
})

router.get("/admin-auth",auth,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

router.put("/profile" ,auth, updateProfile)


router.get("/orders" ,auth,getOrders)
router.get("/all-orders" ,auth,isAdmin,getAllOrders)


// sttaus udpadate

router.put("/order-status/:orderId" ,auth,isAdmin,orderStatusUpdate)

router.get("/getuser/:userId" , getUserById)



module.exports = router;