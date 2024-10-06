#!/bin/bash

# Set up environment variables
echo "Setting up environment variables..."
cp .env.example .env

# Build and run the Docker containers
echo "Building and running Docker containers..."
docker-compose up --build -d

# Seed the database (Optional but recommended)
echo "Seeding the database..."
docker exec -it hotel-room-booking-app npm run db:seed

echo "Setup complete!"
