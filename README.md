# jwt-auth-nodejs
Tutorial for basic JWT authentication in Node.js

# Setup

After pulling this project, create a file named .env in the root of the project and add below information. Change the values of below keys as per your requirement.

```
JWT_ACCESS_SECRET=b4f577d2aa9cc60f9e9912761c6a907067a3f6f4f241f3111d957b0486c73d04a0aaf1824507a609813232888c26ec7de01193afb100993e2cd7e6ab8b3a99d3
JWT_REFRESH_SECRET=7dccf6e03da65227683100b4f6b7caf7e9ae3f2dd4f26dac0ffd0a31c05d79a1e54e22a226013c1b864d25262653b304571081ee37c19c5e126eacf52a834b9b
JWT_ACCESS_TIME=30s
JWT_REFRESH_TIME=30d
REDIS_HOST=192.168.100.101
REDIS_PORT=6379
DB_CONN_STRING=mongodb://127.0.0.1:27017/nodejsjwtauth
```
