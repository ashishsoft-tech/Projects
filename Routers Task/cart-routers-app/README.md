** Add to Cart Task Using React Router

Overview

This project is a ReactJS-based shopping cart application that
demonstrates product listing, cart functionality, and routing using
React Router. Products are fetched from the Fake Store API and displayed
on the product page. Users can add or remove items from the cart and
manage quantities on a dedicated cart page.

The application dynamically calculates the total price and applies a
10% discount to the final cart total.

......................................................................

 Features

.  Fetch products from Fake Store API.
.  Display products with image, title, price, and description.
.  Add products to cart.
.  Remove products from cart.
.  Toggle Add to Cart / Remove from Cart button.
.  Separate Product Page and Cart Page.
.  Increase or decrease product quantity in cart.
.  Calculate total price per item based on quantity.
.  Dynamic cart total calculation.
.  10% discount applied to final total.
.  Responsive UI using Tailwind CSS.
.  Page navigation using React Router.

....................................................................

Technologies Used

.  ReactJS
.  React Router
.  JavaScript
.  HTML5
.  CSS3
.  Tailwind CSS

...................................................................

API Used:

Products are fetched from the Fake Store API:

https://fakestoreapi.com/products

...........................................................

Routing

  Route   Page
  ------- ---------------
  /       Products Page
  /cart   Cart Page

..........................................................

Installation and Setup

  1. Clone the repository

     Bash
       git clone https://github.com/your-username/add-to-cart-task.git


   2. Navigate to the project folder

   . Bash
     cd add-to-cart-task

   3. Install dependencies
    . Bash
     npm install

   4. Run the development server
    . Bash
      npm run dev

    The app will run at:

    http://localhost:5173

 
 .............................................................

Cart Functionality

  . Clicking Add to Cart adds the item to the cart.
  . If the product already exists in the cart, the button changes to
    Remove from Cart.
  . Users can increase or decrease the quantity of items.
  . Each cart item shows the total price based on quantity.
  . The cart page displays the overall total price.
  . A 10% discount is applied to the final price.


Conclusion

This project demonstrates how to build a simple e-commerce cart system
using React. It covers API data fetching, routing with React Router,
cart state management, and dynamic price calculations.


