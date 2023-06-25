
# Project Title

CakeDash : Have a sweet day



# Project Description

The Online Cake Order App CakeDash is a full-stack web application developed using the MERN (MongoDB, Express, React, Node.js) stack. It provides a convenient platform for users to browse and order cakes online. The app offers a seamless experience for both customers and administrators, ensuring efficient management of orders and enhancing the overall cake ordering process.

With the Online Cake Order App, customers can explore a wide variety of cakes, add their desired items to the shopping cart, and proceed to place an order. The app supports user authentication, allowing customers to create accounts, log in, and manage their profile information. Once an order is placed, customers can track its status and view their order history.

On the administrator side, the app provides an intuitive interface for managing cakes, orders, and customer information. Admin users have the ability to add new cakes to the catalog, update cake details, and monitor the progress of orders.

This Online Cake Order App aims to streamline the cake ordering process, offering a user-friendly interface for customers and efficient order management for administrators. By leveraging the power of the MERN stack, the app provides a scalable and robust solution for online cake businesses, ensuring a seamless experience for both customers and administrators.
## Author

- [Rupraj Singh](https://github.com/rkofficial786)
Created at : 18 June ,2023





## Introduction

The Online Cake Order Web App CakeDash is a comprehensive web application developed to facilitate the process of ordering cakes online. It offers a user-friendly interface for customers to browse through a wide range of cakes, add them to the cart, and place orders. The app also provides an efficient management system for administrators to handle orders, track deliveries, and manage the cake catalog. Powered by the MERN stack, this app provides a seamless and intuitive experience for cake businesses and their customers.
## Demo



- [Video Demo](https://drive.google.com/file/d/1VnGM0sAAvgzrB_YW4_zyA6neigJPRyfW/view?usp=sharing)
## Installation


To use CakeDash , follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies by running 

  ```bash
  npm Install
```

 in the root directory.
 
3. Start the backend server by running npm start in the root directory.
4. Start the frontend development server by running npm start in the client directory.
5. Or just use

```bash
  npm run dev
```

 in root directory it will start both frontend and backend together

6. Access the app in your browser at http://localhost:3000.
7. Register as a customer or log in if you already have an account.
8. Browse through the cake catalog, add cakes to your cart, and proceed to checkout.
9. Fill in the required details and place your order.
for test purpose use card number as **4242424242424242** , exp date - any ,  CVV - any

10. Admin users can log in with their credentials to manage the cake catalog, view orders, craete update delete orders create category ,craete discount coupons and many more.
## Features

The Online Cake Order App includes the following features:

***FOR Customers***
- **User Registration and Authentication:** Customers can create accounts and log in to access personalized features and order history.
- **Cake Catalog**: A wide variety of cakes are showcased, including images, descriptions, and prices.
- **Search, Filter, and Sort:** Easily find desired cakes using search functionality, apply filters (e.g., cake type, occasion), and sort cakes by different criteria.
- **Reviews and Ratings:** View and submit reviews and ratings for cakes to help other customers make informed decisions.
- **Menu Browsing:** Explore the menu to discover new cake offerings and seasonal specials.
- **Product Details:** Access detailed information about each cake, including ingredients, size options, and allergen information.
- **Size Selection and Quantity:** Choose the desired cake size and adjust the quantity before adding it to the cart.
- **Add to Cart:** Add cakes to the shopping cart for later review and checkout.
- **Address Management:** Save and manage multiple delivery addresses for quick order placement.
- **Discount Coupons:** Apply discount coupons during checkout to avail of promotional offers.
- **Payment Options**: Multiple secure payment methods to choose from during checkout.
- **User Profile Updates:** Manage personal information, change passwords, and update profile details.
- **Order Tracking:** Track the status of placed orders, from confirmation to delivery.
- **Email Notification:** User receives email Notification on order placed or order status updated.

***For Admins***
- **Category Creation:** Admins can create and manage cake categories to organize the product catalog.
- **Product Management:** Add, update, and delete cake products, including images, descriptions, and prices.
- **Discount Coupons:** Create and manage discount coupons for promotional campaigns.
- **Order Management:** View and manage customer orders, including order details, customer information, and order status updates.
- **Update Order Status:** Admins can update the order status (e.g., confirmed, dispatched, delivered) to keep customers informed.


## Tech Stack

The Online Cake Order App is built using the following technologies and frameworks:

**Frontend:** React, React Router, HTML5, CSS3, JavaScript ,Tailwind

**Backend:** Node.js, Express.js

**Database:** MongoDB

**Authentication:** JSON Web Tokens (JWT)

**State Management:** Context API

**Payment Integration:** Braintree Payments

**External Ui components** : Daisy Ui , ant design , Materials Ui


## Folder Structure

The folder structure of the Online Cake Order App is organized as follows:

- backend
  - config
  - controllers
  - models
  - routes
  - middlewares
  - package.json
  - ...

  - client
    - public
    - src
      - components
      - pages
      - context
      - hooks
      - Assets
    - package.json
    - ...

 - .env
 - .gitignore
 - README.md


## API Reference

**API**

The Online Cake Order App backend provides a set of REST APIs with the base URL `api/v1` to facilitate communication between the frontend and the server. Below is a summary of the available APIs:

1. **User APIs**
   - `POST /api/v1/signup`: Register a new user account.
   - `POST /api/v1/login`: Log in an existing user.
   - `POST /api/v1/forgot-password`: Reset user's forgotten password.
   - `PUT /api/v1/profile`: Update the user profile information.
   - `GET /api/v1/user-auth`: Check user authentication (protected route).
   - `GET /api/v1/admin-auth`: Check admin authentication (protected route).
   - `GET /api/v1/getuser/:userId`: Get user details by ID.

2. **Product APIs**
   - `POST /api/v1/products/create-product`: Create a new product.
   - `GET /api/v1/products/get-product`: Get all products.
   - `GET /api/v1/products/get-product/:slug`: Get details of a specific product by slug.
   - `GET /api/v1/products/product-photo/:pid`: Get the photo of a specific product by product ID.
   - `DELETE /api/v1/products/product/:pid`: Delete a specific product by product ID.
   - `PUT /api/v1/products/update-product/:id`: Update the details of a specific product by ID.
   - `POST /api/v1/products/product-filters`: Filter products based on specific criteria.
   - `GET /api/v1/products/search/:keyword`: Search products based on a keyword.
   - `GET /api/v1/products/related-product/:pid/:cid`: Get related products based on product ID and category ID.
   - `GET /api/v1/products/braintree/token`: Get the Braintree token for payment processing.
   - `POST /api/v1/products/braintree/payment`: Process payment using Braintree (authenticated route).
   - `POST /api/v1/products/rating`: Submit a rating for a product (authenticated route).
   - `GET /api/v1/products/product-count`: Get the total count of products.
   - `GET /api/v1/products/product-list/:page`: Get a paginated list of products.
   - `GET /api/v1/products/product-category/:slug`: Get products by category slug.
   - `GET /api/v1/products/recommended-products`: Get recommended products.
   - `GET /api/v1/products/random-products`: Get random products.
   - `GET /api/v1/products/new-products`: Get newly launched products.

3. **Category APIs**
   - `POST /api/v1/category/create-category`: Create a new category (admin only).
   - `PUT /api/v1/category/update-category/:id`: Update the details of a specific category by ID (admin only).
   - `GET /api/v1/category/get-category`: Get all categories.
   - `GET /api/v1/category/single-category/:slug`: Get details of a specific category by slug.
   - `DELETE /api/v1/category/delete-category/:id`: Delete a specific category by ID (admin only).

4. **Coupon APIs**
   - `POST /api/v1/coupons/create-coupon`: Create a new discount coupon (admin only).
   - `PUT /api/v1/coupons/update-coupon/:id`: Update the details of a specific discount coupon by ID (admin only).
   - `DELETE /api/v1/coupons/delete-coupon/:id`: Delete a specific discount coupon by ID (admin only).
   - `GET /api/v1/coupons/get-coupon`: Get all discount coupons.
   - `POST /api/v1/coupons/apply-coupon`: Apply a discount coupon to the cart (authenticated route).


## License

The CakeDash App project is currently not licensed. 


## Contributing

Contributions are always welcome!


Contributions to the Online Cake Order App project are highly encouraged and welcome! If you have ideas, improvements, or bug fixes that you'd like to contribute, we'd be delighted to review and incorporate them into the project.

To contribute, please follow the guidelines mentioned in the "Contributing" section of this README. Fork the repository, make your changes, and submit a pull request. We appreciate clear commit messages and a detailed description of your changes in the pull request.

We value your contributions and strive to create an inclusive and collaborative community. Together, we can enhance the Online Cake Order App and provide a better experience for all users. Thank you for considering contributing to our project!


## Deployment

CakeDash is already deployed on `cyclic`


https://cakedash.cyclic.app/
https://cakedash-production.up.railway.app/
