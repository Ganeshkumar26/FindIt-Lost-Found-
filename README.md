Project Overview
People often lose personal belongings like wallets, phones, or keys in public places (malls, airports, buses). FindIt is designed to help individuals reclaim lost items by providing a structured Lost & Found Management System.

 Features
1️ User Management
User Login & Logout
Secure authentication using JWT
2️ Report Lost & Found Items
Users can report lost items (with descriptions & images).
Users can report found items to help others reclaim them.
3️ Search & Matching System
Search by item name, category, or location.
Get notifications when a match is found.
4️ Admin Dashboard
Manage users, lost & found items, categories, and inquiries.
View statistics & track successful item recoveries.
5️ Notifications & Alerts
Email notifications for matching items.
Option for SMS alerts (future enhancement).
Tech Stack
Technology	Purpose
Frontend	HTML, CSS, JavaScript (for UI)
Backend	Node.js, Express.js (for API & server logic)
Database	MongoDB (for storing lost & found items, users)
Authentication	JWT (for secure user login)
Cloud Storage	Firebase / Cloudinary (for image uploads)

🔧 Installation & Setup
1️ Clone the Repository
sh
Copy
Edit
git clone https://github.com/yourusername/findit.git
cd findit
2️ Install Dependencies
🔹 Backend
sh
Copy
Edit
3 cd backend
npm install
🔹 Frontend
sh
Copy
Edit
cd ../frontend
npm install
Set Up Environment Variables
Create a .env file in the backend folder and add:

env
Copy
Edit
PORT=5000
MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/findit
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_url
4️ Run the Application
🔹 Start MongoDB Locally
sh
Copy
Edit
mongod --dbpath "C:\data\db"
🔹 Start Backend Server
sh
Copy
Edit
cd backend
npm start
🔹 Start Frontend
sh
Copy
Edit
cd frontend
npm start
Now open http://localhost:3000 in your browser! 🎉

API Endpoints (Backend)
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login user & get token
POST	/api/items/lost	Report a lost item
POST	/api/items/found	Report a found item
GET	/api/items/search	Search for lost & found items
GET	/api/user/profile	Get user details


📜 License
This project is licensed under the MIT License.
