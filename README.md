# Football Player Management Application

A full-stack application for managing football players with CRUD operations, CSV upload functionality, and advanced filtering capabilities.

## ✨ Features

-   **Player Management**: Full CRUD operations for football players
-   **CSV Import/Export**: Bulk player data management via CSV files
-   **Advanced Filtering**: Filter players by:
    -   Name (search across first and last names)
    -   Age range
    -   Height range
    -   Nationalities (with flag display and continent grouping)
    -   Positions (with full names and role grouping)
-   **Visual Enhancements**:
    -   Country flags displayed for player nationalities
    -   Full position names (e.g., "Centre Forward (CF)" instead of just "CF")
    -   Grouped filtering by continents and position roles
-   **Responsive Design**: Modern Material-UI interface that works on all devices

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
    cd Football-Application
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
firstName,lastName,nationalities,dateOfBirth,positions,heightCm
Lionel,Messi,Argentina,1987-06-24,RW;CF,169
Cristiano,Ronaldo,Portugal,1985-02-05,LW;ST,187
Kylian,Mbappe,France,1998-12-20,ST;LW,178
```

**Note**:

-   Multiple nationalities and positions can be separated by semicolons (;)
-   Date format should be yyyy-MM-dd
-   Height should be in centimeters
-   A sample `Example.csv` file is provided in the project root

### Enhanced Filtering

The application now supports advanced filtering with:

#### Position Groups:

-   **Defenders**: Centre-Back (CB), Right-Back (RB), Left-Back (LB), Left Wing-Back (LWB), Right Wing-Back (RWB)
-   **Midfielders**: Defensive Midfielder (CDM), Centre Midfielder (CM), Central Attacking Midfielder (CAM), Right Midfielder (RM), Left Midfielder (LM)
-   **Forwards**: Right Forward (RF), Left Forward (LF), Centre Forward (CF), Striker (ST), Left Wing (LW), Right Wing (RW)

#### Nationality Groups:

-   **Europe**: Including countries like Germany, France, Spain, Italy, etc.
-   **South America**: Including Brazil, Argentina, Uruguay, etc.
-   **Africa**: Including Nigeria, Morocco, Senegal, etc.
-   **Asia**: Including Japan, South Korea, Iran, etc.
-   **North America**: Including USA, Mexico, Canada, etc.
-   **Oceania**: Including Australia, New Zealand, etc.

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
