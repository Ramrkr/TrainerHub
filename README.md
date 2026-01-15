# TrainerHub

TrainerHub is a full-stack training management platform with an Angular frontend and a Spring Boot backend. This repository contains both the `angularapp` (frontend) and `springapp` (backend).

### Landing page
<img width="3181" height="1664" alt="Screenshot 2026-01-15 181313" src="https://github.com/user-attachments/assets/3e07a930-e1be-4060-a227-d52c3a9a43ac" />

## Features
- User authentication and role-based access
- Trainer and requirement management
- Feedback and pagination APIs
- OpenAPI / Swagger UI integration (springdoc)

### Login page
  <img width="3173" height="1550" alt="Screenshot 2026-01-15 181328" src="https://github.com/user-attachments/assets/bf467349-9d29-4ae4-90f8-5c98fedc29c0" />
  
### Sign Up page
  <img width="3167" height="1559" alt="Screenshot 2026-01-15 181339" src="https://github.com/user-attachments/assets/e5d994d5-7e82-4399-bd96-2c56fcd6479a" />

### Forgot Password 
  <img width="3177" height="1661" alt="Screenshot 2026-01-15 181352" src="https://github.com/user-attachments/assets/d70dec21-70d4-43b6-a868-da27ce805cf0" />

### view Trainers by Co-ordinator 
  <img width="3156" height="1155" alt="Screenshot 2026-01-15 182921" src="https://github.com/user-attachments/assets/304fd0e6-29fa-49c7-a661-6a6e83932043" />

### view requirements by Co-Ordinator
<img width="3151" height="850" alt="Screenshot 2026-01-15 182931" src="https://github.com/user-attachments/assets/93c56f6c-395c-4901-bb87-dce35a695765" />

### view Assigned trainers Details by Manager 
<img width="3199" height="1451" alt="Screenshot 2026-01-15 182955" src="https://github.com/user-attachments/assets/0360ea93-cfc3-471d-ab3f-484607f4c21b" />

### view Feedbacks 
<img width="3158" height="903" alt="Screenshot 2026-01-15 183123" src="https://github.com/user-attachments/assets/cc18273c-d41e-40bb-b495-9bc17cc5b6e5" />









## Tech Stack
- Backend: Java 21, Spring Boot, Spring Data JPA, PostgreSQL
- Frontend: Angular
- Build: Maven (backend), npm/Angular CLI (frontend)
- Optional: Docker & docker-compose for local DB and full-stack startup

---

## Prerequisites
- JDK 21 installed and `JAVA_HOME` set
- Maven 3.8+ (or use the included `mvnw`/`mvnw.cmd`)
- Node 16+ and npm (for the Angular app)
- Docker & Docker Compose (recommended for local Postgres)

---

## Quick Start (development)

1. Start PostgreSQL (recommended via Docker):

```bash
# from repository root
docker compose up -d
# or if using the project's docker-compose.yml:
# docker-compose up -d
```

By default the DB container exposes port `5432` and uses database `trainerhub`.

2. Configure database credentials (if needed)
- Backend properties live at `springapp/src/main/resources/application.properties`.
- Ensure `spring.datasource.username` and `spring.datasource.password` match your Postgres setup.

3. Build and run backend

```bash
cd springapp
# build
mvn clean install -DskipTests
# run
java -Duser.timezone=UTC -jar target/springapp-0.0.1-SNAPSHOT.jar
# or
mvn spring-boot:run
```

Note: The app sets the JDBC timezone to `UTC` to avoid Postgres timezone name issues. If you see `FATAL: invalid value for parameter "TimeZone": "Asia/Calcutta"`, start the JVM with `-Duser.timezone=UTC` or update `spring.jpa.properties.hibernate.jdbc.time_zone` to a Postgres-accepted zone (e.g. `Asia/Kolkata`).

4. Build and run frontend

```bash
cd angularapp
npm install
ng serve --open
```

The Angular dev server runs at `http://localhost:4200` by default and the backend at `http://localhost:8080`.

---

## Full-stack with Docker Compose
If `docker-compose.yml` is provided at the repo root it may contain services for Postgres (named `trainerhub-postgres`) and others. To launch the DB and optionally services:

```bash
docker compose up -d
```

Then build and run the backend and frontend as above.

---

## API docs
The backend includes springdoc/OpenAPI. When the backend runs locally, the docs are typically available at:
- Swagger UI: `http://localhost:8080/swagger-ui/index.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

See `API_DOCUMENTATION.md` for more details.

---

## Troubleshooting
- Timezone errors from Postgres: set `-Duser.timezone=UTC` or use `Asia/Kolkata` in configs.
- Port conflicts (8080): stop other processes or change `server.port` in `application.properties`.
- DB connection refused: ensure Postgres is running and credentials/URL in `application.properties` are correct.

---

## Contributing
See `CONTRIBUTING.md` for contribution guidelines.


