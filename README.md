Certainly! Below is an updated `README.md` file that reflects the current implementation, including the use of the `jose` library for JWT handling, the `Customers` collection in MongoDB, and the role-based authentication system.

---

# User Management System

This project is a **User Management System** built with **Next.js**, **MongoDB**, and **JWT-based authentication**. It allows users to register, log in, and manage their roles (`ROLE_USER`, `ROLE_OWNER`, `ROLE_ADMIN`). Admins can access a dashboard to manage user roles, while regular users and owners are redirected to a welcome page.

---

## Features

- **User Registration**: Users can register with a `name` and `password`. The default role is `ROLE_USER`.
- **User Login**: Users can log in with their credentials. A JWT token is generated and stored in a cookie.
- **Role-Based Access Control**:
  - `ROLE_ADMIN`: Can access the dashboard and manage user roles.
  - `ROLE_USER` and `ROLE_OWNER`: Redirected to a welcome page.
- **Dashboard**: Admins can toggle user roles between `ROLE_USER` and `ROLE_OWNER`.
- **Middleware**: Protects routes based on the user's role and JWT token.

---

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: JWT (using the `jose` library)
- **Middleware**: Next.js Middleware

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/masterbhuvnesh/user-management-system.git
cd user-management-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```plaintext
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/your_database_name
JWT_SECRET=your_jwt_secret_key
```

- `MONGODB_URI`: Your MongoDB connection string.
- `JWT_SECRET`: A secure secret key for JWT token generation.

### 4. Run the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## API Endpoints

### 1. **Register User**

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "username",
    "password": "password"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

### 2. **Login User**

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "username",
    "password": "password"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token",
    "role": "ROLE_USER",
    "name": "username"
  }
  ```

### 3. **Fetch Customers (Admin Only)**

- **URL**: `/api/customers`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "_id": "user_id",
      "name": "username",
      "role": "ROLE_USER"
    }
  ]
  ```

### 4. **Update User Role (Admin Only)**

- **URL**: `/api/customers`
- **Method**: `PUT`
- **Request Body**:
  ```json
  {
    "id": "user_id",
    "role": "ROLE_OWNER"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Role updated successfully"
  }
  ```

---

## Folder Structure

```
user-management-system/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   └── register/
│   │   │       └── route.ts
│   │   └── customers/
│   │       └── route.ts
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── welcome/
│   │   └── page.tsx
│   └── layout.tsx
├── components/
│   └── DashboardContent.tsx
├── lib/
│   └── mongodb.ts
├── middleware.ts
├── README.md
├── package.json
└── .env.local
```

---

## Middleware

The middleware (`middleware.ts`) protects routes based on the user's role and JWT token. It performs the following tasks:

1. **Token Verification**:

   - Verifies the JWT token using the `jose` library.
   - Redirects to the login page if the token is invalid or missing.

2. **Role-Based Redirection**:
   - Admins (`ROLE_ADMIN`) can access the dashboard.
   - Regular users (`ROLE_USER`) and owners (`ROLE_OWNER`) are redirected to the welcome page.

---

## How It Works

1. **Registration**:

   - Users register with a `name` and `password`. The password is hashed using `bcrypt` and stored in the `Customers` collection.

2. **Login**:

   - Users log in with their credentials. A JWT token is generated and stored in a cookie.

3. **Dashboard**:

   - Admins can access the dashboard to manage user roles.
   - Regular users and owners are redirected to the welcome page.

4. **Middleware**:
   - Protects routes based on the user's role and JWT token.

---

## Testing

1. **Register a User**:

   - Use the registration page to create a new user.

2. **Login**:

   - Log in with the registered credentials.

3. **Access Protected Routes**:

   - Admins can access the dashboard.
   - Regular users and owners are redirected to the welcome page.

4. **Logout**:
   - Click the logout button to clear the token and redirect to the login page.

---

## Troubleshooting

### 1. **Token Not Found**

- Ensure the token is being set in the cookies after login.
- Check the browser’s **Application tab** to verify the `token` cookie.

### 2. **Middleware Not Working**

- Ensure the middleware is correctly reading the token from the cookies.
- Check the server logs for debugging messages.

### 3. **Environment Variables**

- Ensure `MONGODB_URI` and `JWT_SECRET` are set in the `.env.local` file.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
