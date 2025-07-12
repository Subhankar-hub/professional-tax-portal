#!/bin/bash

echo "=== Real-time Database Monitor ==="
echo "This will check the database every 5 seconds for new data..."
echo "Press Ctrl+C to stop"
echo ""

while true; do
    clear
    echo "=== Database Status at $(date) ==="
    echo ""
    
    # Check temp enrollment data
    temp_count=$(docker exec professional-tax-db psql -U ptax -d professional_tax_db -t -c "SELECT COUNT(*) FROM ptax.ttbl_temp_applicant_enrolment_details;")
    final_count=$(docker exec professional-tax-db psql -U ptax -d professional_tax_db -t -c "SELECT COUNT(*) FROM ptax.ttbl_applicant_enrolment_details;")
    
    echo "📊 Record Counts:"
    echo "   Temporary Enrollments: $temp_count"
    echo "   Final Enrollments: $final_count"
    echo ""
    
    if [ "$temp_count" -gt 0 ]; then
        echo "📝 Latest Temporary Enrollment Data:"
        docker exec professional-tax-db psql -U ptax -d professional_tax_db -c "SELECT application_id, name, mobile, email, business_name, inserted_on FROM ptax.ttbl_temp_applicant_enrolment_details ORDER BY inserted_on DESC LIMIT 3;"
        echo ""
    fi
    
    if [ "$final_count" -gt 0 ]; then
        echo "✅ Latest Final Enrollment Data:"
        docker exec professional-tax-db psql -U ptax -d professional_tax_db -c "SELECT application_id, name, mobile, email, business_name, inserted_on FROM ptax.ttbl_applicant_enrolment_details ORDER BY inserted_on DESC LIMIT 3;"
        echo ""
    fi
    
    echo "⏰ Next update in 5 seconds..."
    sleep 5
done
