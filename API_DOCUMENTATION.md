# API Documentation

## Where to find docs
When the backend is running locally, open the OpenAPI/Swagger UI at:

- `http://localhost:8080/swagger-ui/index.html` (Swagger UI)
- `http://localhost:8080/v3/api-docs` (OpenAPI JSON)

## Generating docs
This project includes `springdoc-openapi`. To ensure endpoints are documented:

1. Start the backend: `mvn spring-boot:run` or `java -jar target/*.jar`.
2. Visit the Swagger UI URL above.

## Exposing docs
- In production you can enable/disable the swagger endpoints via properties.
- Use `springdoc.swagger-ui.enabled` or management configurations to control access.

## Example endpoints
- Authentication: `POST /api/auth/login`
- Trainers: `GET /api/trainers`, `POST /api/trainers`
- Requirements: `GET /api/requirements`

(Adjust paths above to match actual controller mappings in `springapp/src/main/java`.)

