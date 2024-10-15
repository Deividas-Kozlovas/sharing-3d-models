# 3D Model Sharing Platform

## Description

This platform allows users to upload, share, and download 3D models using a Node.js backend with Express.js and MongoDB for data storage. It provides a seamless experience for 3D model enthusiasts and developers.

## Features

- **User Authentication: Secure user registration and login system.
- **UModel Upload and Download: Users can upload their 3D models and download models shared by others.
- **UResponsive Design: The platform is designed to be mobile-friendly, adapting to various screen sizes.
- **UMongoDB Integration: Uses MongoDB for storing user data and 3D model information.

## Technologies Used

- **UNode.js: JavaScript runtime for building the server-side application.
- **UExpress.js: Web framework for Node.js to build APIs and manage server routes.
- **UMongoDB: NoSQL database for storing user and model data.

## Getting Started
 1. Clone the repository:

```bash
git clone [repository-url]
cd 3d-model-sharing-platform
```

2. Install dependencies: Make sure you have Node.js and npm installed. Run the following command to install the necessary packages:

```bash
npm install
```

3. Set up the environment: Create a .env file in the root directory and add your MongoDB connection string:

```plaintext
MONGODB_URI=your_mongodb_connection_string
PORT=your_preferred_port (default: 3000)
```

4. Run the project: Start the server with:

```bash
npm start
```
Alternatively, you can use the development mode for hot-reloading:
```bash
npm run dev
```

5. Access the platform: Open your web browser and navigate to http://localhost:3000 (or your specified port) to access the application.

