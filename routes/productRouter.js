const express =require("express")
const { auth, isAdmin } = require("../middlewares/auth")
const formidable =require("express-formidable")
const { createProduct,filterProduct, getProducts, getSingleProduct, getproductPhoto, deleteProduct, updateProduct, searchProducts, similarProducts, brainTreePaymentController, braintreeTokenController, ratingController, ratingUpdateController, getrating, rating, productCount, productlistPage, productCategorywise, recommendedProducts, randomProducts, newLaunched } = require("../Controllers/ProductController")
const router =express.Router()


router.post("/create-product",auth,isAdmin,formidable(), createProduct)
router.get("/get-product", getProducts)

router.get("/get-product/:slug", getSingleProduct)

router.get("/product-photo/:pid", getproductPhoto)

router.delete("/product/:pid",auth,isAdmin, deleteProduct)

router.put("/update-product/:id",auth,isAdmin,formidable(), updateProduct)

router.post("/product-filters", filterProduct)

router.get("/search/:keyword",searchProducts)

router.get("/related-product/:pid/:cid" ,similarProducts)

//payament
router.get("/braintree/token", braintreeTokenController )
router.post("/braintree/payment",auth, brainTreePaymentController )


router.post("/rating", auth, rating);

router.get("/product-count", productCount)

router.get("/product-list/:page" , productlistPage)

//category wise

router.get("/product-category/:slug" , productCategorywise)
router.get("/recommended-products" , recommendedProducts)
router.get("/random-products" , randomProducts)
router.get("/new-products" , newLaunched)



module.exports = router;