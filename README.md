In file api\users\route.ts

- line no : 8 , 21 - Enter your Database name
- line no : 9 , 23 - Enter your Collection name
- The Document in Collection should be like
  {"\_id":{"$oid":"123456789abcdef"},"username":"user","owner":true}

In file .env.local

MONGODB_URI=mongodb+srv://<username>:<password>@collage.lkkh7mp.mongodb.net/<database_name>
NEXT_PUBLIC_USERNAME=admin_name
NEXT_PUBLIC_PASSWORD=admin_password
