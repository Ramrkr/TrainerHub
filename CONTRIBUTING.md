# Contributing to TrainerHub

Thanks for your interest in contributing! Please follow these guidelines to make collaboration smooth.

- Fork the repository and create feature branches from `main` (e.g. `feature/your-feature`).
- Use descriptive commit messages and keep changes focused.
- Open a Pull Request (PR) describing the change and reference related issues.
- Run backend and frontend locally before submitting PRs.

Local checks:
- Backend: `mvn clean test` (or `mvn -DskipTests=false test`)
- Frontend: `npm run lint` (if set) and `ng test` for unit tests.

Coding style:
- Java: follow typical Spring Boot conventions. Keep controllers/services/repositories small and focused.
- Angular: follow existing project structure under `angularapp/src/app`.

Communication:
- Include screenshots or curl examples for API changes.
- If your change requires DB migrations, provide SQL migration scripts or instructions.

Thank you for helping improve TrainerHub!
