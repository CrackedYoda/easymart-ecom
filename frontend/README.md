# EasyMart Frontend

This is the frontend for EasyMart, built with Next.js 15, TypeScript, and custom CSS styling.

## Features

- **Storefront**: Browse products with a premium, responsive design.
- **User Accounts**: Login and Register (JWT Auth).
- **Cart**: Add items, manage cart, and checkout.
- **Admin Dashboard**: Manage users (suspend/activate), view ALL orders, and delete products. *(Requires 'admin' role)*.

## Setup

1. **Backend**: Ensure the backend server is running on port 4000.
   ```bash
   cd ..
   npm install
   npm start
   ```

2. **Frontend**: Install dependencies and run the development server.
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- CSS Modules & Custom Design System (Dark Mode)
- Axios & Cookies for API/Auth
- React Icons
