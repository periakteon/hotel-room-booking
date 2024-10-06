# Hotel Room Booking Application

A comprehensive hotel room booking application that allows users to seamlessly search for and reserve hotel rooms. Built with a robust back-end API using TypeScript, Express.js, and a responsive front-end using Next.js and Tailwind CSS, this application is designed for an optimal user experience.

## BACK-END VIDEO DEMO (Click to Play)
[![Watch the video](https://img.youtube.com/vi/IlOdzM-GxX0/0.jpg)](https://www.youtube.com/watch?v=IlOdzM-GxX0)

## FRONT-END + BACK-END VIDEO DEMO (Click to Play)
[![Watch the video](https://img.youtube.com/vi/grd3BIlPXHA/0.jpg)](https://www.youtube.com/watch?v=grd3BIlPXHA)


## Key Features

### Back-end Features
1. **Room Availability**: 
   - An API endpoint to list available rooms for specific date ranges, allowing users to check availability easily.

2. **Room Classification**: 
   - Support for different room types (`Basic`, `Premium`, `Suite`), enhancing user filtering options during booking.

3. **User System**: 
   - Basic user management for customers and admins, enabling registration, login, and role-specific actions using `jsonwebtoken` for secure session management.

4. **User Roles**:
   - Role-based access control (RBAC):
     - **Admin Role**: Manage room data and availability.
     - **Customer Role**: Browse available rooms and make bookings.

5. **Booking Functionality**: 
   - Ensures room availability for selected dates and type before confirming bookings.

### Front-end Features
- **User-Friendly Interface**: Intuitive design for easy searching and booking of hotel rooms.
- **Responsive Design**: Built with Tailwind CSS for optimal performance on any device.
- **Form Handling**: Utilizes React Hook Form and Zod for seamless validation.
- **Client-Side Data Fetching**: Employs React Query (TanStack Query) for efficient data handling.
- **Animations**: Enhances user experience with engaging animations using Framer Motion.

## Technologies Used

### Back-end
- **TypeScript**: Enhances code quality with type safety.
- **Express.js**: Fast and minimalist web framework.
- **Typegoose**: MongoDB ORM for type-safe schema definitions.
- **Redis**: In-memory data store for caching and session management.
- **Zod**: Input validation and schema declaration.
- **Pino**: High-performance logging.
- **Helmet**: Security middleware for setting HTTP headers.
- **jsonwebtoken**: User authentication via JWTs.
- **Lodash**: Utility library for JavaScript operations.

### Front-end
- **TypeScript**: A typed superset of JavaScript for safer code.
- **Next.js**: React framework for server-rendered applications.
- **React**: Library for building user interfaces.
- **Shadcn UI**: Component library for accessible UI components.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: Promise-based HTTP client for API requests.
- **React Query**: Library for data fetching and state management.
- **Zod**: TypeScript-first schema validation library.
- **Framer Motion**: Animation library for React applications.

## Setup Instructions

## Back-end Setup

#### Automated Setup (Bash) - Recommended for Linux/Mac (Docker required)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/periakteon/hotel-room-booking.git
   cd backend
    ```

2. **Run the setup script**:
    ```bash
    ./setup.sh
    ```

#### Automated Setup (PowerShell) - Recommended for Windows (Docker required)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/periakteon/hotel-room-booking.git
   cd backend
    ```

2. **Run the setup script**:
    ```bash
    .\setup.ps1
    ```

For other setup instructions, refer to the [backend README](/backend/README.md).

## Front-end Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/periakteon/hotel-room-booking.git
   cd frontend
    ```

2. **Run docker-compose up**:
   ```bash
   docker-compose up --build
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

For more details, refer to the [frontend README](/frontend/README.md).