<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Twitty (Proof of Concept)

## Overview

This project is a backend service for a small Twitter-like application built using NestJS. The application focuses on core features like user management, tweet functionalities, following system, and timeline generation, using PostgreSQL for data storage and Google OAuth for authentication.

## Features
- **User Management**: 
  - User registration and login using Firebase.
  - Profile management.
  - Follow and unfollow functionality.
  
- **Tweet Functionality**: 
  - Post tweets (text only).
  - Like and retweet tweets.

- **Timeline**: 
  - View timeline with tweets from followed users.
  - Pagination support.

- **API Documentation**: 
  - Documentation generated using Swagger.

## Tech Stack

- **Backend Framework**: [NestJS](https://nestjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [TypeORM](https://typeorm.io/)
- **Authentication**: [Google Auth](https://cloud.google.com/nodejs/docs/reference/google-auth-library/latest)
- **API Documentation**: [Swagger](https://swagger.io/)

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL
- Google Cloud Project

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/neerajkumar161/twitty
   cd twitty
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root of the project and add the following variables:

   ```env
   DB_HOST = <DB_HOST>
   DB_USERNAME = <DB_USERNAME>
   DB_PASSWORD = <DB_PASSWORD>
   DB_NAME = <DB_NAME>
   GOOGLE_CLIENT_ID = <GOOGLE_CLIENT_ID>
   JWT_SCRET_KEY = <JWT_SECRET_KEY>
   ```

4. Configure Google OAuth Concent Screen. [**Read More**](https://developers.google.com/workspace/guides/configure-oauth-consent). Also don't forget to Add Test users in order to login using Google.

5. **Build the Application**:
    ```bash
      npm run build
      npm run start:prod
    ```

6. **Start the Application in Development**:
   ```bash
    npm run start:dev
   ```

7. **Access API Documentation**:
   Open your browser and navigate to `http://localhost:3000/api` to view the Swagger documentation.

## Project Structure

```plaintext
├── src
│   ├── auth        // Contains authentication logic using Google Auth.
│   ├── decorators  // Swagger API combined decorator
│   ├── filters     // Nestjs Filters for Error handling
│   ├── timeline    // Generates user timelines with pagination.
│   ├── tweet       // Manages tweet creation, liking, and retweeting.
│   ├── user        // Handles user management, including profiles and following system
│   └── main.ts
├── test
├── .env
├── .gitignore
├── nest-cli.json
├── package.json
└── README.md
```

## API Endpoints

### Authentication

- **POST** `/auth/google`: Register or Login a user using Google.

### User Profile and follow

- **GET** `/users/profile`: Fetch a user’s profile.
- **POST** `/users/follow/:userId`: Follow a user.
- **DELETE** `/users/unfollow/:userId`: Unfollow a user.

### Tweet Functionality

- **POST** `/tweets`: Post a new tweet.
- **POST** `/tweets/like`: Like a tweet.
- **POST** `/tweets/retweet`: Retweet a tweet.

### User Timeline

- **GET** `/timeline`: Get the current user’s timeline with pagination.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact via [**Email**](ennkay161@gmail.com).