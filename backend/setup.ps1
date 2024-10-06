# Set up environment variables
Write-Host "Setting up environment variables..."
Copy-Item -Path .env.example -Destination .env

# Build and run the Docker containers
Write-Host "Building and running Docker containers..."
docker-compose up --build -d

# Seed the database (Optional but recommended)
Write-Host "Seeding the database..."
docker exec -it hotel-room-booking-app npm run db:seed

Write-Host "Setup complete!"
