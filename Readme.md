# OOU Website

## Project Overview

The **OOU Website** is a comprehensive web application designed for the Olabisi Onabanjo University (OOU) community. This project leverages modern web technologies to ensure a seamless user experience on both the frontend and backend.

## Tech Stack

### Frontend

The frontend of the OOU Website is built using **React** along with the following libraries and tools:

- **@emotion/react** (`^11.13.3`): For writing CSS styles using JavaScript.
- **@emotion/styled** (`^11.13.0`): Styled-components API built on Emotion for styling React components.
- **@mui/icons-material** (`^6.1.1`): Material UI icons used to enhance the UI.
- **@mui/material** (`^6.1.1`): A UI component library for implementing Google's Material Design.
- **@mui/styled-engine-sc** (`^6.1.1`): Material UI’s integration with styled-components.
- **axios** (`^1.7.7`): HTTP client for making API requests to the backend.
- **react** (`^18.2.0`): The core React library used for building the user interface.
- **react-dom** (`^18.2.0`): DOM-specific methods for the React library.
- **react-fast-marquee** (`^1.6.5`): A component for creating smooth scrolling text (marquee).
- **react-icons** (`^5.2.1`): A library of popular icon sets.
- **react-router-dom** (`^6.26.2`): For handling routing and navigation within the application.
- **styled-components** (`^6.1.13`): A library for styling React components using template literals.
- **swiper** (`^11.1.14`): A library for creating modern touch sliders and carousels.

#### Frontend Development Dependencies

- **tailwindcss** (`^3.4.11`): A utility-first CSS framework for building custom UIs quickly.

### Backend

The backend of the OOU Website is powered by **Node.js** and **Express**, with **Prisma** serving as the ORM for database interactions. The backend uses the following dependencies:

- **@prisma/client** (`^5.20.0`): A Prisma client for querying the database.
- **bcryptjs** (`^2.4.3`): A library for hashing passwords to ensure user data security.
- **cors** (`^2.8.5`): Middleware for enabling Cross-Origin Resource Sharing between frontend and backend.
- **dotenv** (`^16.4.5`): Loads environment variables from a `.env` file.
- **express** (`^4.21.0`): A Node.js framework for building REST APIs.
- **jsonwebtoken** (`^9.0.2`): Handles JSON Web Tokens (JWT) for user authentication.
- **multer** (`^1.4.5-lts.1`): A middleware for handling file uploads.
- **swagger-jsdoc** (`^6.2.8`): Generates Swagger API documentation from comments.
- **swagger-ui-express** (`^5.0.1`): Serves API documentation via a Swagger UI interface.

#### Backend Development Dependencies

- **nodemon** (`^3.1.7`): Automatically restarts the server during development when file changes are detected.
- **prisma** (`^5.20.0`): Prisma ORM for managing the database schema and queries.

## Features

- **Responsive Design**: The UI is responsive and built using Material UI and TailwindCSS.
- **Secure Authentication**: Utilizes JWT for secure login and user sessions.
- **Real-time Data Fetching**: Axios handles real-time communication between the frontend and backend.
- **File Uploads**: Multer is used for securely uploading files.
- **API Documentation**: Swagger generates comprehensive API documentation for easy integration.