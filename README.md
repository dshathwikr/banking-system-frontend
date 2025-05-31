# Banking System Frontend

This is a React-based frontend application for a banking system. It allows users to sign up, sign in, view their account dashboard, check their balance, deposit and withdraw money, and view transaction history.

## Features

- User Signup and Signin
- Account Dashboard with balance and transaction history
- Deposit and Withdraw functionality
- Responsive design

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/dshathwikr/banking-system-frontend.git
   cd banking-system-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure the backend URL:
   - Update the `VITE_BACKEND_URL` in the `.env` file to point to your backend server.

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open the application in your browser:
   ```
   http://localhost:5173
   ```

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint to check for code issues.

## Folder Structure

```
src/
├── components/    # Reusable components like Navbar
├── pages/         # Application pages (Signup, Signin, Dashboard)
├── services/      # API service functions
├── index.css      # Global styles
├── main.jsx       # Application entry point
```

## Technologies Used

- React
- Vite
- React Router
- Fetch API for HTTP requests