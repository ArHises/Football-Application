# Football Player Management Application

A full-stack application for managing football players with CRUD operations and CSV upload functionality.

## Tech Stack

-   **Backend**: Spring Boot 3.5.3 with Java 21
-   **Frontend**: React 19 with Vite and Material-UI
-   **Database**: MySQL 8.0
-   **Containerization**: Docker & Docker Compose

## Quick Start with Docker

### Prerequisites

-   Docker
-   Docker Compose

### Running the Application

1. **Clone the repository** (if not already done):

    ```bash
    git clone https://github.com/ArHises/Football-Application.git
    cd FullstackTest
    ```

2. **Start all services**:

    ```bash
    docker-compose up
    ```

    This single command will:

    - Build the backend Spring Boot application
    - Build the frontend React application
    - Start MySQL database
    - Set up networking between all services

3. **Access the application**:
    - **Frontend**: http://localhost:3000
    - **Backend API**: http://localhost:8080
    - **Database**: localhost:3306

### Stopping the Application

```bash
docker-compose down
```

To stop and remove all data:

```bash
docker-compose down -v
```

## Application Features

-   ✅ **Player Management**: Create, read, update, delete players
-   ✅ **Search & Filter**: Filter by name, nationality, age, position, height
-   ✅ **CSV Upload**: Bulk import players from CSV files
-   ✅ **Responsive UI**: Material-UI components with mobile support

## API Endpoints

-   `GET /players` - List all players with optional filters
-   `GET /players/{id}` - Get player by ID
-   `POST /players` - Create new player
-   `PUT /players/{id}` - Update player
-   `DELETE /players/{id}` - Delete player
-   `POST /players/csv` - Upload CSV file

## Database Schema

```sql
CREATE TABLE players (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    nationality VARCHAR(255),
    position VARCHAR(255),
    age INT,
    height DOUBLE
);
```

## CSV Upload Format

The CSV file should have the following columns:

```
firstName,lastName,nationality,position,age,height
John,Doe,USA,Forward,25,180.5
```

### Project Structure

```
FullstackTest/
├── Backend/              # Spring Boot application
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── Frontend/             # React application
│   ├── src/
│   ├── package.json
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml    # Docker orchestration
└── README.md
```

## Troubleshooting

### Port Already in Use

If you get port conflicts, stop any existing services:

```bash
# Check what's using the ports
netstat -an | findstr :3000
netstat -an | findstr :8080
netstat -an | findstr :3306
```

## Docker Services

-   **mysql**: MySQL 8.0 database
-   **backend**: Spring Boot application (Java 21)
-   **frontend**: React application served by Nginx

All services are connected via Docker network for internal communication.
