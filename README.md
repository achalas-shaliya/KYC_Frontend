# 🚀 KYC Frontend

This is a **React-based Next.js frontend** built with **Material UI and Redux**. It supports **authentication, customer management, file uploads, and lazy loading**.

## 📌 Features
-  Next.js with TypeScript
-  Redux Toolkit for state management
-  Material UI for a modern design
-  REST API integration with Axios
-  Authentication with JWT
-  Lazy Loading with Infinite Scroll
-  Responsive UI Design

---

## 📦 Installation

1️⃣ **Clone the repository**


2️⃣ **Install dependencies**
```sh
npm install
```

3️⃣ **Configure environment variables**  
Create a `.env.local` file in the project root and add:
```sh
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_AWS_BUCKET_URL=https://your-bucket.s3.amazonaws.com
```

---

## 🚀 Run the Project

**Start the development server**
```sh
npm run dev
```

**Build & Run in production**
```sh
npm run build
npm start
```

---

## 🛠 API Integration with Axios

📁 **`src/utils/api.ts`**
```ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

export default api;
```
 **Centralized API management for cleaner code.**

---

## 🛠 Redux State Management

📁 **`src/redux/store.ts`**
```ts
import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slices/customerSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    auth: authReducer,
  },
});
```
 **Global state management using Redux Toolkit.**

---

## 🛠 Authentication Flow

- Users **log in via JWT**, and tokens are stored in **localStorage**.
- Authenticated requests **attach the token to API calls**.
- Redux state **manages authentication globally**.

📁 **Example Login API Call:**
```ts
import api from "../utils/api";
export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};
```
 **Handles authentication securely.**

---

## 🚀 Deployment Guide

### **Deploy to Vercel**
1. **Install Vercel CLI**
   ```sh
   npm install -g vercel
   ```
2. **Deploy**
   ```sh
   vercel
   ```

### **Deploy to Docker**
1. **Create a `Dockerfile`**
   ```
   FROM node:18
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   CMD ["npm", "start"]
   ```
2. **Build & Run Docker Container**
   ```sh
   docker build -t nextjs-frontend .
   docker run -p 3000:3000 nextjs-frontend
   ```

---

## 💡 Future Improvements
- [ ] Implement Dark Mode with MUI Theme
- [ ] Add Role-Based Access Control (RBAC)
- [ ] Improve Error Handling & Toast Notifications

---

## 🤝 Contributing
Pull requests are welcome! To contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Added new feature"`)
4. Push to GitHub (`git push origin feature-name`)
5. Open a Pull Request 🚀

---

## 📄 License
This project is licensed under the MIT License.

---

🚀 **Happy Coding!** 🚀

