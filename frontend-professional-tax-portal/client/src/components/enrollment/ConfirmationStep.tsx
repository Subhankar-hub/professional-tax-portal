import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Printer } from "lucide-react";
import type { EnrollmentState } from "@/types/enrollment";

interface ConfirmationStepProps {
  data: EnrollmentState;
}

export default function ConfirmationStep({ data }: ConfirmationStepProps) {
  const submissionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleDownloadReceipt = () => {
    // TODO: Implement download receipt functionality
    console.log('Download receipt for:', data.applicationId);
  };

  const handlePrintReceipt = () => {
    // TODO: Implement print receipt functionality
    console.log('Print receipt for:', data.applicationId);
  };

  return (
    <div className="form-section">
      <div className="form-section-header" style={{ backgroundColor: 'var(--gov-success)' }}>
        <h2 className="text-lg font-semibold">Step: 8 of 8</h2>
      </div>
      
      <div className="form-section-content">
        <div className="text-center">
          <CheckCircle className="mx-auto text-green-500 mb-6" size={96} />
          <h3 className="text-2xl font-bold text-green-600 mb-4">
            Application Submitted Successfully!
          </h3>
          <p className="text-gray-600 mb-6">
            Your Professional Tax enrollment application has been submitted successfully. 
            You will receive a confirmation email shortly.
          </p>
          
          <div className="info-box success mb-6">
            <h4 className="text-lg font-semibold text-green-800 mb-4">Application Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-green-600">Application ID:</span>{" "}
                <span className="font-bold">{data.applicationId || 'PTAX202500001'}</span>
              </div>
              <div>
                <span className="text-green-600">Submission Date:</span>{" "}
                <span className="font-bold">{submissionDate}</span>
              </div>
              <div>
                <span className="text-green-600">Status:</span>{" "}
                <span className="font-bold text-green-600">Submitted</span>
              </div>
              <div>
                <span className="text-green-600">Processing Time:</span>{" "}
                <span className="font-bold">7-10 Business Days</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button 
              onClick={handleDownloadReceipt}
              className="gov-button-secondary"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button 
              onClick={handlePrintReceipt}
              variant="outline"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Receipt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
