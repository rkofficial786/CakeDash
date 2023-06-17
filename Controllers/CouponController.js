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

// Function to apply the discount coupon during checkout
exports.applyCoupon = async (req, res) => {
  try {
    // Retrieve the coupon from the database based on the coupon code

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
    // Calculate the discounted price based on the coupon's discount value
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

// Example usage
// const couponCode = "SPECIAL25"; // Assuming the coupon code is provided during checkout
// const totalPrice = 100; // Assuming the total price is calculated elsewhere

// const couponResult = await applyCoupon(couponCode, totalPrice);

// if (couponResult.success) {
//   const discountedPrice = couponResult.discountedPrice;
//   console.log("Discount applied. New price:", discountedPrice);
// } else {
//   console.error("Failed to apply the coupon:", couponResult.message);
// }

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
