# Learn Authentication REST API with Node.js &amp; TypeScript

### Learning Objectives

1. Register a user
2. Verify user's email address
3. Send forgot password email
4. Reset password
5. Get current user
6. Login
7. Get access token
8. Refresh token

### Main Technology Stacks

- [TypeScript](https://www.typescriptlang.org/) - Strongly typed checkinh for Javascript
- [Express@5](https://expressjs.com/en/5x/api.html) - A erb server framework for Node.js

### Other Technology Stacks

- [node-argon2](https://github.com/ranisalt/node-argon2) - A Password-hashing algorithm functions
- [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - Signing and verifying JSON web tokens
- [Node-config](https://github.com/lorenwest/node-config) - Managing configuration for different deployment environments
- [Nodemailer](https://nodemailer.com/about/) - Sending emails from your apps
- [Pino](https://github.com/pinojs/pino) - Logging messages and data in JSON format
- [Zod](https://github.com/colinhacks/zod) - Typescript-first for schema declaration and validation
- [Typegoose](https://typegoose.github.io/typegoose/) - Mongoose wrapper for creating TypeScript interfaces and models

### Init Typescript

npx tsc --init

### Install Dev Dependencies

yarn add typescript ts-node ts-node-dev @types/express @types/config pino-pretty @types/nodemailer @types/lodash @types/jsonwebtoken -D

### Install express

yarn add express@5

### Install Dependencies

yarn add axios mongoose @typegoose/typegoose config argon2 pino dayjs nanoid@^3.0.0 nodemailer lodash jsonwebtoken dotenv zod
