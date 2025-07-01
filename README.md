# Professional Tax Portal - Project Documentation

This document provides a comprehensive overview of the Professional Tax Portal project, including its structure, configuration, and the purpose of each major file and folder.

## Table of Contents
- [Overview](#overview)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Main Application](#main-application)
- [Configuration Classes](#configuration-classes)
- [DTOs](#dtos)
- [Entities](#entities)
- [Repositories](#repositories)
- [Testing](#testing)

---

## Overview
The Professional Tax Portal is a Spring Boot application designed to manage professional tax enrolment, professional details, trade details, and related data. It uses PostgreSQL as its database and follows a modular structure for maintainability.

## Project Structure
- `src/main/java/io/example/professionaltaxportal/`
  - `ProfessionaltaxportalApplication.java`: Main entry point for the Spring Boot application.
  - `config/`: Contains configuration classes for CORS and ModelMapper.
  - `dto/`: Data Transfer Objects for API communication.
  - `entity/`: JPA entities representing database tables.
  - `repository/`: Spring Data JPA repositories for data access.
- `src/main/resources/`
  - `application.properties` & `application.yml`: Application configuration files.
  - `static/` & `templates/`: Reserved for static assets and templates (currently empty).
- `src/test/java/io/example/professionaltaxportal/`
  - `ProfessionaltaxportalApplicationTests.java`: Basic context load test.

## Configuration
- **application.properties**: Contains server, database, JPA, CORS, and file upload settings.
- **application.yml**: Alternative YAML-based configuration for the same settings.

## Main Application
- **ProfessionaltaxportalApplication.java**: Bootstraps the Spring Boot application.

## Configuration Classes
- **CorsConfig.java**: Configures CORS to allow cross-origin requests from the frontend and other origins.
- **ModelMapperConfig.java**: Provides a ModelMapper bean for object mapping between DTOs and entities.

## DTOs
- **ApiResponse.java**: Generic API response wrapper for success/error messages and data.
- **EstablishmentDetailsDTO.java**: Contains establishment details and a list of establishments.
- **EstablishmentTypeDTO.java**: Holds establishment type and category information.
- **PersonalDetailsDTO.java**: Captures personal details with validation annotations.
- **ProfessionDetailsDTO.java**: Contains professional details such as PAN, business info, and vehicle counts.
- **TradeDetailsDTO.java**: Similar to ProfessionDetailsDTO, but for trade-specific data.

## Entities
- **Area.java**: Represents an area with code and names.
- **Charge.java**: Represents a charge associated with an area.
- **District.java**: Represents a district with LGD code and name.
- **PTaxCategory.java**: Professional tax category entity.
- **PTaxCategorySubcategory.java**: Subcategory for professional tax categories.
- **TempApplicantCallingDetails.java**: Temporary calling details for applicants.
- **TempApplicantEmploymentDetails.java**: Temporary employment details for applicants.
- **TempApplicantEnrolmentDetails.java**: Temporary enrolment details for applicants.
- **TempApplicantProfessionDetails.java**: Temporary professional details for applicants.
- **TempApplicantTradeDetails.java**: Temporary trade details for applicants.

## Repositories
- **TempApplicantEnrolmentDetailsRepository.java**: Data access for enrolment details.
- **TempApplicantProfessionalDetailsRepository.java**: Data access for professional details.

## Testing
- **ProfessionaltaxportalApplicationTests.java**: Ensures the Spring context loads correctly.

---

> For more details on each class, see the respective JavaDoc comments or refer to the code in each package.

---

# Professional Tax Portal - Repository Layer Documentation

This document provides detailed information about the repository interfaces in the `io.example.professionaltaxportal.repository` package. These repositories are responsible for data access and manipulation for various entities in the Professional Tax Portal application.

## Table of Contents
- [TempApplicantEnrolmentDetailsRepository](#tempapplicantenrolmentdetailsrepository)
- [TempApplicantProfessionalDetailsRepository](#tempapplicantprofessionaldetailsrepository)

---

## TempApplicantEnrolmentDetailsRepository

**Location:** `src/main/java/io/example/professionaltaxportal/repository/TempApplicantEnrolmentDetailsRepository.java`

This repository provides CRUD operations and custom queries for the `TempApplicantEnrolmentDetails` entity.

**Key Methods:**
- `Optional<TempApplicantEnrolmentDetails> findByApplicationId(String applicationId)`
  - Retrieves enrolment details by application ID.
- `Optional<TempApplicantEnrolmentDetails> findByMobile(String mobile)`
  - Retrieves enrolment details by mobile number.
- `boolean existsByApplicationId(String applicationId)`
  - Checks if an enrolment exists for the given application ID.
- `boolean existsByMobile(String mobile)`
  - Checks if an enrolment exists for the given mobile number.

**Usage:**
This repository is typically used for fetching and verifying temporary applicant enrolment data during the application process.

---

## TempApplicantProfessionalDetailsRepository

**Location:** `src/main/java/io/example/professionaltaxportal/repository/TempApplicantProfessionalDetailsRepository.java`

This repository provides CRUD operations and custom queries for the `TempApplicantProfessionDetails` entity.

**Key Methods:**
- `Optional<TempApplicantProfessionDetails> findByApplicationId(String applicationId)`
  - Retrieves professional details by application ID.
- `void deleteByApplicationId(String applicationId)`
  - Deletes professional details by application ID.

**Usage:**
This repository is used for managing temporary applicant professional details, including retrieval and deletion based on application ID.

---

> For more information about the entities and their relationships, refer to the `entity` package documentation.
