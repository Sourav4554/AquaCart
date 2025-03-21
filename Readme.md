#🐠 AquaCart - Ornamental Fish E-commerce Website

##📌 Overview

AquaCart is a full-fledged e-commerce platform for buying and selling ornamental fish. It provides a seamless shopping experience with features like JWT & OTP authentication, product management, secure payments, shopping cart, wishlist, promo codes, and an AI chatbot for fish-related queries.


## 🚀 Features  
- 🛒 **Product Listings**: Browse a variety of ornamental fish.  
- 🔍 **Search & Filtering**: Find fish based on species, price, and size.  
- 🗮 **Admin Registration**: Secure admin access for managing the platform.  
- 🏢 **User Registration with JWT & OTP Verification**: Secure signup process with OTP authentication.  
- 🛕 **Shopping Cart & Checkout**: Add items to the cart and checkout.  
- 💳 **Payment Integration**: cahn on delivery and Secure online payments via **Stripe / Razorpay**.  
- 🔒 **User Authentication**: Signup/Login using JWT authentication.  
- 🤖 **AI Chatbot**: Get real-time fish care tips and product recommendations.  
- 🏰 **Promocode System**: Apply discount codes at checkout.  
- 🌐 **Order Management**: Users can track their orders.  
- 📊 **Data Visualization in Admin Panel**: View sales, user activity, and product analytics.  
- 📄 **Download User Data (PDF) in Admin Panel**: Export user data in PDF format.  
- 📝 **Add Reviews & Ratings**: Users can leave reviews and ratings for products.  
- 📱 **Responsive Design**: Works on mobile and desktop devices.  


### **Frontend**  
- React.js (Vite)   
- CSS 
- Axios (API requests)  
- Framer Motion (Animations)  
- React Router DOM (Navigation)  
- React Icons  
- React Toastify (Notifications)  
- React Slick / Swiper (Carousels)  
- React Awesome Reveal / Animate.css (Animations)  
- React Custom Rating Component  

### **Admin Panel**  
- React.js  
- Material UI (MUI)  
- React Router DOM (Navigation)  
- Axios (API requests)  
- Chart.js / React Chart.js (data visualization)
- jsPDF & jsPDF AutoTable (PDF Generation)  
- React Toastify (Notifications)  

### **Backend (Node.js & Express.js)**  
- Express.js (Server)  
- MongoDB (Database)  
- Mongoose (ODM)  
- Cloudinary (Image Uploads)  
- JSON Web Token (JWT) Authentication  
- Stripe / Razorpay (Payments)  
- Multer (File Uploads)  
- Nodemailer (Email Service)  
- Bcrypt (Password Hashing)  
- CORS (Cross-Origin Resource Sharing)  
- Crypto (Random number generation for otp)  
- Dotenv (Environment Variables)  
- Sharp (Image Processing)  

## 🛠 Installation & Setup  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/Sourav4554/AquaCart.git
cd your-project-name
```

### **2️⃣ Backend Setup**  
```bash
cd Backend
npm install
npm start
```
- Create a **.env** file in the `Backend` folder and configure:
  ```env
  MONGODB_URL=your_mongodb_connection_string
  SMTP_USER=your_smtp_user
  SENDER_EMAIL=your_sender_email
  SMTP_PASSWORD=your_smtp_password
  JWT_SECRET=your_jwt_secret
  CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_cloudinary_api_key
  CLOUDINARY_API_SECRET=your_cloudinary_api_secret
  ADMIN_MAIL=your_admin_email
  ADMIN_PASSWORD=your_admin_password
  STRIPE_SECRET_KEY=your_stripe_secret_key
  RAZORPAY_KEY_ID=your_razorpay_key_id
  RAZORPAY_KEY_SECRET=your_razorpay_key_secret
  GEMINI_API=your_gemini_api_key
  ```

### **3️⃣ Frontend Setup**  
```bash
cd Frontend
npm install
npm run dev
```


## ⚙️ API Endpoints  

| Method | Endpoint                    | Description                         |
|--------|-----------------------------|-------------------------------------|
| POST   | `/admin/login`              | Admin login                        |
| POST   | `/admin/users`              | Fetch all users                    |
| POST   | `/aquaAI/answer`            | Generate AI response               |
| POST   | `/cart/addcart`             | Add item to cart                   |
| POST   | `/cart/removecart`          | Remove item from cart              |
| DELETE | `/cart/deletecart`          | Delete entire cart                 |
| GET    | `/cart/cartdata`            | Fetch cart data                    |
| POST   | `/fish/upload`              | Upload fish (Admin)                |
| GET    | `/fish/list-fish`           | List all fish                      |
| DELETE | `/fish/remove-fish`         | Remove a fish (Admin)              |
| PUT    | `/fish/update-fish`         | Update fish details (Admin)        |
| POST   | `/order/cod`                | Cash on Delivery order             |
| GET    | `/order/userorder`          | Fetch user orders                  |
| GET    | `/order/adminorder`         | Fetch admin orders                 |
| POST   | `/order/status`             | Update order status (Admin)        |
| POST   | `/order/stripe`             | Stripe payment processing          |
| POST   | `/order/verify`             | Verify Stripe order                |
| POST   | `/order/razorpay`           | Razorpay payment processing        |
| POST   | `/order/verify-razorpay`    | Verify Razorpay order              |
| POST   | `/promocode/add`            | Add a promo code (Admin)           |
| GET    | `/promocode/list`           | List all promo codes               |
| DELETE | `/promocode/delete`         | Delete a promo code (Admin)        |
| POST   | `/promocode/fetch`          | Fetch a promo code                 |
| POST   | `/promocode/apply`          | Apply a promo code                 |
| POST   | `/review/add`               | Add a review                       |
| POST   | `/review/list`              | List all reviews                   |
| POST   | `/user/register`            | Register a new user                |
| POST   | `/user/verify-email`        | Verify user email                  |
| POST   | `/user/login`               | User login                         |
| POST   | `/user/forgot-password`     | Request password reset OTP         |
| POST   | `/user/verify-otp`          | Verify OTP for password reset      |
| POST   | `/user/reset-password`      | Reset user password                |
| POST   | `/user/resend-otp`          | Resend OTP                         |
| POST   | `/user/userdata`            | Fetch user data                    |
| POST   | `/wishlist/add`             | Add item to wishlist               |
| DELETE | `/wishlist/remove`          | Remove item from wishlist          |
| GET    | `/wishlist/fetch`           | Fetch wishlist items               |
| GET    | `/user/google`              | Google authentication              |

** Total=37

 ## Documentation  
For more details, check the documentation:  
1)JWT AUTHENTICATION

*--https://dev.to/jaypmedia/jwt-explained-in-4-minutes-with-visuals-g3n

2)Image uploading multer with cloudinary

*--https://medium.com/@joeeasy_/uploading-images-to-cloudinary-using-multer-and-expressjs-f0b9a4e14c54

3)Razorpay payment

*--https://dev.to/alimalim77/integrating-payment-gateways-in-mern-applications-482k

4)Stripe Payment 

*--https://dev.to/arshan_nawaz/setting-up-stripe-checkout-with-nodejs-and-mongodb-1hk1

5)Google Authentication

*--https://medium.com/@dugar_rishab/how-to-use-google-oauth-with-mern-stack-a988947e64f4






