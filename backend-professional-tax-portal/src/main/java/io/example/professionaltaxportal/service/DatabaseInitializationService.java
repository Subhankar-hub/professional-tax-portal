package io.example.professionaltaxportal.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
@Slf4j
public class DatabaseInitializationService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void initializeDatabase() {
        log.info("Starting database initialization...");
        
        try {
            // Create schema if it doesn't exist
            createSchema();
            
            // Initialize tables with schema
            initializeTables();
            
            // Initialize master data
            initializeMasterData();
            
            log.info("Database initialization completed successfully");
            
        } catch (Exception e) {
            log.error("Error during database initialization", e);
            throw new RuntimeException("Failed to initialize database", e);
        }
    }

    private void createSchema() {
        log.info("Creating ptax schema if it doesn't exist...");
        jdbcTemplate.execute("CREATE SCHEMA IF NOT EXISTS ptax");
        log.info("Schema creation completed");
    }

    private void initializeTables() {
        log.info("Initializing database tables...");
        
        try {
            // Execute schema.sql if it exists
            ClassPathResource schemaResource = new ClassPathResource("schema.sql");
            if (schemaResource.exists()) {
                String schemaSql = loadSqlFromFile(schemaResource);
                executeMultiStatementSql(schemaSql);
                log.info("Schema tables initialized successfully");
            }
        } catch (IOException e) {
            log.error("Error loading schema.sql", e);
            throw new RuntimeException("Failed to load schema.sql", e);
        }
    }

    private void initializeMasterData() {
        log.info("Initializing master data...");
        
        try {
            // Check if master data already exists
            Long districtCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM ptax.mas_district", Long.class);
            Long categoryCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM ptax.mtbl_ptax_category", Long.class);
            
            if (districtCount == 0 || categoryCount == 0) {
                // Execute data.sql
                ClassPathResource dataResource = new ClassPathResource("data.sql");
                if (dataResource.exists()) {
                    String dataSql = loadSqlFromFile(dataResource);
                    executeMultiStatementSql(dataSql);
                    log.info("Master data initialized successfully");
                } else {
                    log.warn("data.sql file not found in classpath");
                }
            } else {
                log.info("Master data already exists, skipping initialization");
            }
            
        } catch (Exception e) {
            log.error("Error initializing master data", e);
            throw new RuntimeException("Failed to initialize master data", e);
        }
    }

    private String loadSqlFromFile(ClassPathResource resource) throws IOException {
        try (InputStream inputStream = resource.getInputStream()) {
            return StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
        }
    }

    private void executeMultiStatementSql(String sql) {
        // Split SQL by semicolons and execute each statement separately
        String[] statements = sql.split(";");
        
        for (String statement : statements) {
            String trimmedStatement = statement.trim();
            if (!trimmedStatement.isEmpty() && !trimmedStatement.startsWith("--")) {
                try {
                    jdbcTemplate.execute(trimmedStatement);
                    log.debug("Executed SQL statement: {}", trimmedStatement.substring(0, Math.min(50, trimmedStatement.length())));
                } catch (Exception e) {
                    log.warn("Error executing SQL statement: {}", trimmedStatement, e);
                    // Continue with next statement instead of failing completely
                }
            }
        }
    }

    public void resetDatabase() {
        log.info("Resetting database...");
        
        try {
            // Drop all tables in ptax schema
            jdbcTemplate.execute("DROP SCHEMA IF EXISTS ptax CASCADE");
            
            // Recreate schema and initialize
            initializeDatabase();
            
            log.info("Database reset completed");
            
        } catch (Exception e) {
            log.error("Error resetting database", e);
            throw new RuntimeException("Failed to reset database", e);
        }
    }

    public void verifyDatabaseInitialization() {
        log.info("Verifying database initialization...");
        
        try {
            Long districtCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM ptax.mas_district", Long.class);
            Long categoryCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM ptax.mtbl_ptax_category", Long.class);
            Long areaCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM ptax.mtbl_area", Long.class);
            Long chargeCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM ptax.mtbl_charge", Long.class);
            Long roleCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM ptax.mtbl_role", Long.class);
            Long subcategoryCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM ptax.mtbl_ptax_category_subcategory", Long.class);
            
            log.info("Database verification results:");
            log.info("Districts: {}", districtCount);
            log.info("Categories: {}", categoryCount);
            log.info("Areas: {}", areaCount);
            log.info("Charges: {}", chargeCount);
            log.info("Roles: {}", roleCount);
            log.info("Subcategories: {}", subcategoryCount);
            
            if (districtCount > 0 && categoryCount > 0 && areaCount > 0 && chargeCount > 0 && roleCount > 0 && subcategoryCount > 0) {
                log.info("Database initialization verification successful");
            } else {
                log.warn("Database initialization verification failed - some tables are empty");
            }
            
        } catch (Exception e) {
            log.error("Error during database verification", e);
            throw new RuntimeException("Failed to verify database initialization", e);
        }
    }
}
