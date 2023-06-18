const CouponModel = require("../models/CouponModel");

exports.createCoupon = async (req, res) => {
  try {
    const coupon = await CouponModel.create(req.body);
    res.status(200).send({
      success: true,
      message: "Coupon created Successfully",
      coupon,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateCoupon = async (req, res) => {
  try {
    const updatedcoupon = await CouponModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Coupon Updated Successfully",
      updatedcoupon,
    });
  } catch (error) {
    console.log(error);
  }
};

//discount


exports.applyCoupon = async (req, res) => {
  try {
    

    const { code, totalPrice } = req.body;
    const coupon = await CouponModel.findOne({ name: code });
 
    
   
    if (coupon) {
      // Check if the coupon has not expired
      if (coupon.expiry < Date.now()) {
        res.status(404).send({
          success: false,
          message: "Coupon expired",
        });
      }
    }
    
    const discountAmount = (coupon.discount / 100) * totalPrice;
    const discountedPrice = Math.round(totalPrice - discountAmount);
    

    res.status(200).send({
      success: true,
      message: "Coupon Applied Successfully",
      discountedPrice,
      discountAmount
    });
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"Coupon not applied",
      error
  })
  }
};



exports.getAllCoupon = async (req, res) => {
  try {
    const coupons = await CouponModel.find();
    res.status(200).send({
      success: true,
      message: "Coupon get Successfully",
      coupons,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    await CouponModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Coupon deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
