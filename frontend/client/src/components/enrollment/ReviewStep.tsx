import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Edit, Send, RefreshCw } from "lucide-react";
import { useState } from "react";
import type { EnrollmentState } from "@/types/enrollment";

interface ReviewStepProps {
  data: EnrollmentState;
  onNext: () => void;
  onPrev: () => void;
  onEdit: () => void;
}

export default function ReviewStep({ data, onNext, onPrev, onEdit }: ReviewStepProps) {
  const [captchaQuestion, setCaptchaQuestion] = useState("35+100=");
  const [captchaAnswer, setCaptchaAnswer] = useState("135");
  const [agreed, setAgreed] = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");

  const refreshCaptcha = () => {
    const num1 = Math.floor(Math.random() * 50) + 1;
    const num2 = Math.floor(Math.random() * 50) + 1;
    setCaptchaQuestion(`${num1}+${num2}=`);
    setCaptchaAnswer((num1 + num2).toString());
  };

  const handleSubmit = () => {
    if (!agreed) {
      alert("Please agree to the declaration");
      return;
    }
    if (captchaInput !== captchaAnswer) {
      alert("Incorrect captcha answer");
      return;
    }
    onNext();
  };

  return (
    <div className="form-section">
      <div className="form-section-header">
        <h2 className="text-lg font-semibold">Step: 6 of 8</h2>
      </div>
      
      <div className="form-section-content">
        <h3 className="text-lg font-semibold text-red-500 text-center mb-6">Review Information</h3>
        <p className="text-center text-red-500 mb-6">
          Applying as {data.personalInfo.applicationType === 'individual' ? 'Individual' : 'Others'}
        </p>
        
        {/* Personal/Business Information */}
        <div className="review-section">
          <h4 className="text-sm font-semibold text-blue-800 mb-3">Personal/ Business Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-blue-600">Name:</span>{" "}
              <span className="font-medium italic">{data.personalInfo.fullName}</span>
            </div>
            <div>
              <span className="text-blue-600">Gender:</span>{" "}
              <span className="font-medium italic">{data.personalInfo.gender}</span>
            </div>
            <div>
              <span className="text-blue-600">Father's Name:</span>{" "}
              <span className="font-medium italic">{data.personalInfo.fathersName}</span>
            </div>
            <div>
              <span className="text-blue-600">PAN/TAN:</span>{" "}
              <span className="font-medium italic">{data.personalInfo.panTan}</span>
            </div>
            <div>
              <span className="text-blue-600">Mobile:</span>{" "}
              <span className="font-medium italic">{data.personalInfo.mobileNumber}</span>
            </div>
            <div>
              <span className="text-blue-600">Email:</span>{" "}
              <span className="font-medium italic">{data.personalInfo.email}</span>
            </div>
          </div>
        </div>
        
        {/* Establishment Information */}
        <div className="review-section establishment">
          <h4 className="text-sm font-semibold text-blue-800 mb-3">Establishment Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-600">Business Name:</span>{" "}
              <span className="font-medium italic">{data.establishmentInfo.establishmentName}</span>
            </div>
            <div>
              <span className="text-blue-600">Area of Jurisdiction:</span>{" "}
              <span className="font-medium italic">{data.establishmentInfo.areaOfJurisdiction}</span>
            </div>
            <div>
              <span className="text-blue-600">Address:</span>{" "}
              <span className="font-medium italic">
                {data.establishmentInfo.establishmentAddress}, {data.establishmentInfo.district}, {data.establishmentInfo.pinCode}
              </span>
            </div>
            <div>
              <span className="text-blue-600">Charge:</span>{" "}
              <span className="font-medium italic">{data.establishmentInfo.charge}</span>
            </div>
            <div>
              <span className="text-blue-600">Category:</span>{" "}
              <span className="font-medium italic">Category ID: {data.establishmentInfo.categoryId}</span>
            </div>
            <div>
              <span className="text-blue-600">Sub Category:</span>{" "}
              <span className="font-medium italic">Subcategory ID: {data.establishmentInfo.subcategoryId}</span>
            </div>
          </div>
        </div>
        
        {/* Other Details */}
        <div className="review-section">
          <h4 className="text-sm font-semibold text-blue-800 mb-3">Other Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-600">Engaged With:</span>{" "}
              <span className="font-medium italic">{data.establishmentType.engagementTypes.join(", ")}</span>
            </div>
          </div>
        </div>
        
        {/* Employment Details */}
        <div className="review-section employment">
          <h4 className="text-sm font-semibold text-green-800 mb-3">Employment Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-green-600">Date of Commencement:</span>{" "}
              <span className="font-medium italic">{data.detailedInfo.dateOfCommencement}</span>
            </div>
            <div>
              <span className="text-green-600">Period of Standing:</span>{" "}
              <span className="font-medium italic">{data.detailedInfo.periodOfStanding}</span>
            </div>
            <div>
              <span className="text-green-600">Registered Under VAT:</span>{" "}
              <span className="font-medium italic">{data.detailedInfo.registeredUnderVAT || "Not Provided"}</span>
            </div>
            <div>
              <span className="text-green-600">Registered Under CST:</span>{" "}
              <span className="font-medium italic">{data.detailedInfo.registeredUnderCST || "Not Provided"}</span>
            </div>
            <div>
              <span className="text-green-600">Registered Under GST:</span>{" "}
              <span className="font-medium italic">{data.detailedInfo.registeredUnderGST || "Not Provided"}</span>
            </div>
            <div>
              <span className="text-green-600">Employer Name:</span>{" "}
              <span className="font-medium italic">{data.detailedInfo.employerName || "Not Provided"}</span>
            </div>
            <div>
              <span className="text-green-600">Employer Address:</span>{" "}
              <span className="font-medium italic">{data.detailedInfo.employerAddress || "Not Provided"}</span>
            </div>
            <div>
              <span className="text-green-600">Applicant Salary:</span>{" "}
              <span className="font-medium italic">{data.detailedInfo.applicantSalary || "Not Provided"}</span>
            </div>
            <div>
              <span className="text-green-600">Simultaneous Employment:</span>{" "}
              <span className="font-medium italic">{data.detailedInfo.simultaneousEmployment ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>
        
        {/* Declaration */}
        <div className="mb-6">
          <label className="flex items-start space-x-3 cursor-pointer">
            <Checkbox 
              checked={agreed}
              onCheckedChange={setAgreed}
              className="mt-1"
            />
            <span className="text-sm text-gray-700">
              I hereby declare that the details furnished above are true and correct to the best of my knowledge 
              and belief and I undertake to inform you of any changes therein, immediately. In case any of the 
              above information is found to be false or untrue or misleading or misrepresenting, I am aware that 
              I may be held liable for it.
            </span>
          </label>
        </div>
        
        {/* Captcha */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Security Check <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center space-x-4">
            <div className="captcha-container">
              <span className="captcha-text">{captchaQuestion}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={refreshCaptcha}
                className="p-0 h-auto"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
            <Input
              placeholder="Expression Result"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              className="w-32"
            />
          </div>
        </div>
      </div>
      
      <div className="form-section-footer flex justify-between">
        <Button onClick={onPrev} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex space-x-4">
          <Button onClick={onEdit} variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button onClick={handleSubmit} className="gov-button-primary">
            <Send className="w-4 h-4 mr-2" />
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
