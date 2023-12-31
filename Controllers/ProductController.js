const fs = require("fs");
// import Products from './../client/src/pages/admin/Products';
const ProductsModel = require("../models/ProductsModel");
const { default: slugify } = require("slugify");
const OrderModel = require("../models/OrderModel");
const braintree = require("braintree");
const dotenv = require("dotenv");
const CategoryModel = require("../models/CategoryModel");

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

exports.createProduct = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //validation

    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is reauired" });

      case !description:
        return res.status(500).send({ error: "Description is reauired" });
      case !price:
        return res.status(500).send({ error: "Price is reauired" });
      case !category:
        return res.status(500).send({ error: "Category is reauired" });
      case !quantity:
        return res.status(500).send({ error: "quantity is reauired" });
      case photo && photo.size > 10000000:
        return res
          .status(500)
          .send({ error: "photo should be less than 1 mb" });
    }

    const products = new ProductsModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();

    res.status(201).send({
      success: true,
      message: "Products created successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in createingb product",
    });
  }
};

//get all product

exports.getProducts = async (req, res) => {
  try {
    const products = await ProductsModel.find({})
      .populate("category")
      .select("-photo")
      // .limit(15)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total: products.length,
      message: "All products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting products",
      error,
    });
  }
};

//single product

exports.getSingleProduct = async (req, res) => {
  try {
    const product = await ProductsModel.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.status(200).send({
      success: true,
      message: "Single product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting product",
      error,
    });
  }
};

// prodcut phot controller

exports.getproductPhoto = async (req, res) => {
  try {
    const product = await ProductsModel.findById(req.params.pid).select(
      "photo"
    );
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting product",
      error,
    });
  }
};

//delete product

exports.deleteProduct = async (req, res) => {
  try {
    await ProductsModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfylly",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//update product

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;

    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await ProductsModel.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

//product filter

exports.filterProduct = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await ProductsModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in filter product",
    });
  }
};

//search product

exports.searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await ProductsModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Search product",
    });
  }
};

//related product

exports.similarProducts = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await ProductsModel.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(4)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in similar product",
    });
  }
};

//payment gateway api
//token
exports.braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
// exports.brainTreePaymentController = async (req, res) => {
//   try {
//     const { nonce, cart } = req.body;
//     let total = 0;
//     cart.map((i) => {
//       total += i.price;
//     });
//     let newTransaction = gateway.transaction.sale(
//       {
//         amount: total,
//         paymentMethodNonce: nonce,
//         options: {
//           submitForSettlement: true,
//         },
//       },
//       function (error, result) {
//         if (result) {
//           const order = new OrderModel({
//             products: cart,
//             payment: result,
//             buyer: req.user.id,
//           }).save();
//           res.json({ ok: true });
//         } else {
//           res.status(500).send(error);
//         }
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart, totalPrice } = req.body;
    let total = 0;
    let productsWithQuantity = [];

    cart.forEach((item) => {
      total += item.price * item.quantity;
      productsWithQuantity.push({
        ...item,
        quantity: item.quantity,
      });
    });

   
    const paymentAmount = totalPrice; 

    let newTransaction = gateway.transaction.sale(
      {
        amount: paymentAmount, 
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new OrderModel({
            products: productsWithQuantity,
            payment: result,
            buyer: req.user.id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//order Status

// ratings

exports.rating = async (req, res) => {
  const { id } = req.user;

  const { star, prodId, comment } = req.body;

  try {
    const product = await ProductsModel.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) =>
        userId.postedby && userId.postedby.toString() === id.toString()
    );

    if (alreadyRated) {
      const updateRating = await ProductsModel.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
    } else {
      const rateProduct = await ProductsModel.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: id,
            },
          },
        },
        {
          new: true,
        }
      );
    }

    const getallratings = await ProductsModel.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await ProductsModel.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );
    res.json(finalproduct);
  } catch (error) {
    console.log(error);
  }
};

//productcount

exports.productCount = async (req, res) => {
  try {
    const total = await ProductsModel.find({}).estimatedDocumentCount();

    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in page count product",
    });
  }
};

//product list based on page

exports.productlistPage = async (req, res) => {
  try {
    const perPage = 8;
    const page = req.params.page ? req.params.page : 1;
    const products = await ProductsModel.find({})
      .select("-photo")
      // .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
   

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in list page product",
    });
  }
};

//prodcuts category wise

exports.productCategorywise = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    const products = await ProductsModel.find({ category }).populate(
      "category"
    );
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting category product",
    });
  }
};

//recomended products

exports.recommendedProducts = async (req, res) => {
  try {
    const products = await ProductsModel.aggregate([
      { $sort: { totalrating: -1 } },
      { $limit: 8 }
    ]);

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch top-rated products",
      error: error.message,
    });
  }
};


//random products

exports.randomProducts = async (req, res) => {
  try {
    // Fetch random products based on your criteria
    const products = await ProductsModel.aggregate([
      { $sample: { size: 8 } }, // Adjust the size based on how many random products you want to fetch
    ]);

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch random products",
      error: error.message,
    });
  }
};

exports.newLaunched = async (req, res) => {
  try {
    const products = await ProductsModel.aggregate([
      { $sort: { createdAt: -1 } },
      { $limit: 8 }
    ]);

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch new launched products",
      error: error.message,
    });
  }
};

