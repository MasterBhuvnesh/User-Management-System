

# API Setup Instructions

This guide provides instructions for setting up the API and configuring the environment variables.

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
   const users = await db.collection("your_collection_name")
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

## File: `.env.local`

1. **MongoDB Connection String**:  
   Replace `<database_name>` with the name of your MongoDB database.  
   Example:  
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/your_database_name
   ```

2. **Admin Credentials**:  
   Set the admin username and password for your application.  
   Example:  
   ```
   NEXT_PUBLIC_USERNAME=admin_name
   NEXT_PUBLIC_PASSWORD=admin_password
   ```

---

### Notes:
- Ensure the `.env.local` file is not committed to version control (e.g., add it to `.gitignore`).
- Replace placeholders with actual values specific to your setup.
