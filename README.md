# 📦 Parcel Delivery API

A secure and scalable **RESTful API** for a parcel delivery system, built using **Express.js**, **TypeScript**, **MongoDB**, and **Zod**. The system supports **role-based access** for **Senders**, **Receivers**, and **Admins**, offering features such as user authentication, parcel creation and tracking, and administrative control.


## 🚀 Features

- ✅ JWT-based authentication with refresh tokens
- ✅ Role-based access control: `Sender`, `Receiver`, `Admin`
- ✅ Secure middleware-protected routes
- ✅ Parcel tracking with status logs
- ✅ Zod validation for all input data
- ✅ User management with blocking/unblocking capability
- ✅ MongoDB (Mongoose) for database operations
- ✅ Modular, scalable project structure

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (Access + Refresh Tokens)
- **Validation**: Zod
- **Security**: Bcrypt, Role-based middleware



## 📁 Project Structure

src/
├── app/
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── schemas/
│ ├── services/
│ └── utils/
├── config/
├── constants/
├── interfaces/
├── server.ts


---


### 📥 Installation

```bash
git clone https://github.com/Rezwanul777/parcel-delivery-system-backend.git
cd parcel-backend
npm install  # or yarn install

⚙️ Environment Variables

Create a .env file in the project root:

PORT=5000
DB_URL=your_mongodb_connection_url

NODE_ENV=development

# JWT configuration
JWT_ACCESS_SECRET=access_secret
JWT_ACCESS_EXPIRES=1d
JWT_REFRESH_SECRET=refresh_secret
JWT_REFRESH_EXPIRES=30d

# Super Admin credentials
SUPER_ADMIN_EMAIL=super@gmail.com
SUPER_ADMIN_PASSWORD=12345678

# Bcrypt
BCRYPT_SALT_ROUND=10

▶️ Run the Server

npm run dev

🔐 Authentication

    JWT-based authentication system with both access and refresh tokens

    Protected routes using role-based middleware

    Supports automatic Super Admin creation

📦 API Endpoints
👤 Auth API
Method	Endpoint	Access	Description
POST	/auth/login	Public	Login and receive tokens
POST	/auth/logout	Authenticated	Logout from session
POST	/auth/change-password	Sender/Receiver/Admin	Change user password
👥 User API
Method	Endpoint	Access	Description
POST	/users/register	Public	Register a new user
GET	/users/	Admin	Get all users
GET	/users/:id	Admin	Get single user
PATCH	/users/update/:id	Admin	Update user details
PATCH	/users/block/:id	Admin	Block or unblock a user
📦 Parcel API
Method	Endpoint	Access	Description
POST	/parcels/create	Sender	Create a new parcel
GET	/parcels	Admin	Get all parcels
GET	/parcels/my-parcels	Sender/Receiver	Get user's parcels
GET	/parcels/incoming	Receiver	Get incoming parcels
GET	/parcels/track/:trackingId	Sender/Receiver	Track parcel by ID
PATCH	/parcels/cancel/:id	Sender	Cancel a parcel
PATCH	/parcels/confirm/:id	Receiver	Confirm parcel delivery
PATCH	/parcels/block/:id	Admin	Block a parcel
PATCH	/parcels/unblock/:id	Admin	Unblock a parcel
PATCH	/parcels/update/:id	Admin	Update parcel details
DELETE	/parcels/delete/:id	Admin	Delete a parcel



### PostMan :https://cloudy-desert-192591.postman.co/workspace/My-Workspace~7d753e5c-6d8b-4502-8ddc-9a82086c24b2/collection/19131499-d6ce6357-a467-4062-a032-2cda80a16cc5?action=share&creator=19131499

