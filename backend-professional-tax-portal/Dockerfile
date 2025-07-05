# Multi-stage build for Spring Boot application
FROM maven:3.8.5-openjdk-17 AS build

# Set working directory
WORKDIR /app

# Copy pom.xml first for dependency caching
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Runtime stage
FROM openjdk:17-jdk-slim

# Install necessary packages
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy the built JAR file from build stage
COPY --from=build /app/target/*.jar app.jar

# Create non-root user for security
RUN addgroup --system spring && adduser --system spring --ingroup spring
RUN chown spring:spring /app
USER spring

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/api/health || exit 1

# Environment variables for database and Fast2SMS
ENV SPRING_PROFILES_ACTIVE=production
ENV DATABASE_URL=jdbc:postgresql://db:5432/professional_tax_db
ENV DATABASE_USERNAME=ptax_user
ENV DATABASE_PASSWORD=ptax_password
ENV FAST2SMS_API_KEY=${FAST2SMS_API_KEY}
ENV CORS_ALLOWED_ORIGINS=http://localhost:3000,https://frontend-professional-tax-portal.vercel.app

# Run the application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
