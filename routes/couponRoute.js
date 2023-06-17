const express =require("express")
const { auth, isAdmin } = require("../middlewares/auth");
const { createCoupon, updateCoupon, getAllCoupon, deleteCoupon, applyCoupon } = require("../Controllers/CouponController");

const router= express.Router()




router.post("/create-coupon" ,auth,isAdmin,createCoupon)
router.put("/update-coupon/:id" , auth,isAdmin,updateCoupon)
router.delete("/delete-coupon/:id" , auth,isAdmin,deleteCoupon)
router.get("/get-coupon" , getAllCoupon)
router.post("/apply-coupon" ,auth,applyCoupon)

module.exports = router