#!/bin/bash

echo "=== Professional Tax Database Monitor ==="
echo "Current Time: $(date)"
echo ""

# Function to run SQL query
run_query() {
    docker exec -it professional-tax-db psql -U ptax -d professional_tax_db -c "$1"
}

# Monitor temp enrollment table
echo "1. Temporary Enrollment Data:"
run_query "SELECT application_id, name, mobile, email, business_name, inserted_on FROM ptax.ttbl_temp_applicant_enrolment_details ORDER BY inserted_on DESC LIMIT 10;"

echo ""
echo "2. Final Enrollment Data:"
run_query "SELECT application_id, name, mobile, email, business_name, inserted_on FROM ptax.ttbl_applicant_enrolment_details ORDER BY inserted_on DESC LIMIT 10;"

echo ""
echo "3. Enrollment Count:"
run_query "SELECT 'Temp Enrollments' as table_name, COUNT(*) as count FROM ptax.ttbl_temp_applicant_enrolment_details UNION ALL SELECT 'Final Enrollments', COUNT(*) FROM ptax.ttbl_applicant_enrolment_details;"

echo ""
echo "4. All Tables in ptax schema:"
run_query "SELECT table_name FROM information_schema.tables WHERE table_schema = 'ptax' ORDER BY table_name;"

echo ""
echo "5. Recent Activity (checking for any new records):"
run_query "SELECT CASE WHEN COUNT(*) > 0 THEN 'Data found' ELSE 'No data' END as status FROM ptax.ttbl_temp_applicant_enrolment_details WHERE inserted_on > NOW() - INTERVAL '1 hour';"
