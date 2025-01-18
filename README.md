# API Setup Instructions

This guide provides instructions for setting up the API, configuring the environment variables, and integrating the authentication system.

---

## File: `api/users/route.ts`

1. **Line 8 and 21**:  
   Replace `<Database_name>` with the name of your MongoDB database.  
   Example:

   ```typescript
   const db = client.db("your_database_name");
   ```

2. **Line 9 and 23**:  
   Replace `<Collection_name>` with the name of your MongoDB collection.  
   Example:

   ```typescript
   const users = await db.collection("your_collection_name");
   ```

3. **Document Structure**:  
   Ensure that the documents in your collection follow this structure:
   ```json
   {
     "_id": { "$oid": "123456789abcdef" },
     "username": "user",
     "owner": true
   }
   ```

---

## File: `api/auth/login/route.ts` and `api/auth/register/route.ts`

1. **Database and Collection**:  
   Replace `<Database_name>` with the name of your MongoDB database.  
   Example:

   ```typescript
   const db = client.db("your_database_name");
   ```

2. **Collection Name**:  
   The authentication system uses a collection named `AuthUsers`. Ensure this collection exists in your database.  
   Example:

   ```typescript
   const user = await db.collection("AuthUsers").findOne({ username });
   ```

3. **JWT Secret**:  
   Ensure you have set the `JWT_SECRET` environment variable in `.env.local`.  
   Example:
   ```
   JWT_SECRET=your_jwt_secret_key
   ```

---

## File: `.env.local`

1. **MongoDB Connection String**:  
   Replace `<database_name>` with the name of your MongoDB database.  
   Example:

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/your_database_name
   ```

2. **JWT Secret**:  
   Set a secure secret key for JWT token generation.  
   Example:
   ```
   JWT_SECRET=your_jwt_secret_key
   ```

---

## Authentication System

### Login and Register Pages

1. **Login Page**:

   - Path: `/auth/login`
   - Users can log in using their credentials.
   - A "Don't have an account?" link redirects users to the register page.

2. **Register Page**:

   - Path: `/auth/register`
   - Users can create a new account.
   - A "Have an account?" link redirects users to the login page.

3. **Logout**:
   - A logout button is available on the dashboard.
   - Clicking the button clears the JWT token from `localStorage` and redirects the user to the login page.

---

## Middleware

1. **Middleware File**:

   - Path: `middleware.ts`
   - Protects the `/` route by verifying the JWT token.
   - If no token is found or the token is invalid, the user is redirected to the login page.

2. **Middleware Configuration**:  
   Ensure the middleware is applied to the `/` route:
   ```typescript
   export const config = {
     matcher: "/:path*",
   };
   ```

---

## Notes

1. **Environment Variables**:

   - Ensure the `.env.local` file is not committed to version control (e.g., add it to `.gitignore`).
   - Replace placeholders with actual values specific to your setup.

2. **Database Collections**:

   - The `Users` collection is used for user management.
   - The `AuthUsers` collection is used for authentication.

3. **JWT Token Expiry**:

   - Tokens are set to expire in 1 hour. You can adjust this in the `jwt.sign` function in `api/auth/login/route.ts`.

4. **Security**:
   - Use strong passwords and secure JWT secrets.
   - Never expose sensitive information (e.g., passwords, JWT secrets) in client-side code.

---

## Running the Application

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Access the application:
   - Login: `http://localhost:3000/auth/login`
   - Register: `http://localhost:3000/auth/register`
   - Dashboard: `http://localhost:3000/`

---

## 8:20 - userjwt
