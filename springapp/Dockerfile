# Use official OpenJDK image
FROM eclipse-temurin:21-jdk


# Set working directory inside container
WORKDIR /app

# Copy everything from springapp folder into container
COPY . .

# Build the app using Maven wrapper
RUN ./mvnw clean package -DskipTests

# Run the JAR (update name if different)
CMD ["java", "-jar", "target/springapp-0.0.1-SNAPSHOT.jar"]
