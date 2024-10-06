# Hotel Room Booking API

## Video Demo (Click to Play)
[![Watch the video](https://img.youtube.com/vi/IlOdzM-GxX0/0.jpg)](https://www.youtube.com/watch?v=IlOdzM-GxX0)

A simple API to manage hotel room bookings, built with TypeScript, Express.js, Typegoose, Redis, and several other modern libraries for efficient and secure operations.

## Key Features Implemented

1. **Room Availability**: 
   - Implemented an API endpoint to list available rooms for a specific date range. This allows users to view which rooms are available based on their desired booking dates.

2. **Room Classification**: 
   - The system supports different room types such as Basic, Premium, and Suite. These classifications are stored in the database and are included in the room availability and booking logic, allowing customers to filter rooms based on their preferences.

3. **User System**: 
   - Developed a basic user system, allowing for both customer and admin accounts. Users can register, log in, and perform actions based on their role. Authentication is handled using `jsonwebtoken` for secure session management.

4. **User Roles**:
   - Introduced role-based access control (RBAC):
     - **Admin Role**: Admins can add, edit, and delete room data and manage room availability.
     - **Customer Role**: Customers can view available rooms and make bookings but cannot modify room details or availability.
   
5. **Booking**: 
   - Added functionality to allow users to book rooms. The system checks room availability for the given dates and ensures that the room type and dates are valid before confirming a booking.

## Technologies Used
- TypeScript: Ensures type safety and better development experience.
- Express.js: Fast and minimalist web framework for Node.js.
- Typegoose: MongoDB ORM built on top of Mongoose.
- Redis: In-memory data store used for caching and session management.
- Zod: Input validation and schema declaration.
- Pino: High-performance logging library.
- Helmet: Helps secure the app by setting various HTTP headers.
- jsonwebtoken: For handling user authentication via JWTs.
- Lodash: Utility library for common JavaScript operations.


## Setup Instructions

### Bash Script (Recommended/Automated)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/periakteon/hotel-room-booking.git
    ```
2. **cd into the project directory**:
    ```bash
    cd backend
    ```

3. **Run the setup script**:
    ```bash
    ./setup.sh
    ```

### PowerShell Script (Windows Only)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/periakteon/hotel-room-booking.git
    ```

2. **cd into the project directory**:
    ```bash
    cd backend
    ```
3. **Run the setup script**:
    ```bash
    .\setup.ps1
    ```

### Docker Installation (Recommended/Manuel)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/periakteon/hotel-room-booking.git
    ```

2. **cd into the project directory**:
    ```bash
    cd backend
    ```

3. **Set up environment variables**:
   Copy the `.env.example` file to `.env` and update the values as needed.
   ```bash
    cp .env.example .env
    ```

4. **Build and run the Docker containers**:
    ```bash
    docker-compose up --build
    ```

5. **Seed the database (Optional but recommended)**:
    ```bash
    docker exec -it hotel-room-booking-app npm run db:seed
    ```

### Manual Installation
To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/periakteon/hotel-room-booking.git
    ```

2. **Install dependencies**: 
   ```bash
   cd back-end
   npm install
   ```

3. **Set up environment variables**:
   Copy the `.env.example` file to `.env` and update the values as needed.
   ```bash
    cp .env.example .env
    ```

4. **Seed the database (WARN: MAKE SURE MONOGDB & REDIS ARE RUNNING)**:
   ```bash
    npm run db:seed
    ```

5. **Build the project and start the server**:
   ```bash
    npm run build
    npm run start
    ```

6. Access the APIs at `http://localhost:8000`.
   
   For example,
   ```curl
    curl http://localhost:8000/heartbeat
    ```

    You can use tools like `Postman` or `Insomnia` or `HTTPie` to interact with the APIs.