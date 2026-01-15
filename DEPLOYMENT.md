# Deployment guide

This document contains basic deployment steps for TrainerHub.

## Docker
1. Build backend image:

```bash
cd springapp
mvn clean package -DskipTests
# build image (example)
docker build -t trainerhub-backend:latest .
```

2. Build frontend image (optional):

```bash
cd angularapp
npm run build -- --prod
# copy built files into a static server image or serve with nginx
```

3. Example `docker-compose` service (postgres + backend):

```yaml
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: trainerhub
      POSTGRES_USER: trainer
      POSTGRES_PASSWORD: secret
    ports:
      - "5432:5432"
  backend:
    image: trainerhub-backend:latest
    depends_on:
      - postgres
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/trainerhub
      SPRING_DATASOURCE_USERNAME: trainer
      SPRING_DATASOURCE_PASSWORD: secret
    ports:
      - "8080:8080"
```

## Production notes
- Use a managed Postgres (RDS/Azure/Postgres service) with secure credentials.
- Do not store secrets in `application.properties`; use environment variables or secret manager.
- Add health checks and readiness probes.

## Migrations
- If you use SQL migration tools (Flyway/Liquibase), include migration scripts in the project and run them during startup or CI.

