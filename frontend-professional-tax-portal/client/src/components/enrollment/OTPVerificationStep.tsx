import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpVerificationSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Check, Smartphone } from "lucide-react";
import { useState } from "react";
import type { OtpVerification } from "@/types/enrollment";

interface OTPVerificationStepProps {
  mobile: string;
  userName: string;
  onNext: () => void;
  onPrev: () => void;
  onSendOtp: (data: { mobile: string; type: 'mobile' | 'final' }) => void;
  onVerifyOtp: (data: OtpVerification) => Promise<boolean>;
  isVerifying: boolean;
  isSending: boolean;
}

export default function OTPVerificationStep({
  mobile,
  userName,
  onNext,
  onPrev,
  onSendOtp,
  onVerifyOtp,
  isVerifying,
  isSending
}: OTPVerificationStepProps) {
  const [otpSent, setOtpSent] = useState(false);
  
  const form = useForm<{ otp: string }>({
    resolver: zodResolver(otpVerificationSchema.pick({ otp: true })),
    defaultValues: { otp: '' },
  });

  const handleSendOtp = () => {
    onSendOtp({ mobile, type: 'mobile' });
    setOtpSent(true);
  };

  const onSubmit = async (data: { otp: string }) => {
    const verified = await onVerifyOtp({
      mobile,
      otp: data.otp,
      type: 'mobile'
    });
    
    if (verified) {
      onNext();
    }
  };

  const maskedNumber = mobile?.replace(/(\d{6})(\d{4})/, 'XXXXXX$2') || '';

  return (
    <div className="form-section">
      <div className="form-section-header">
        <h2 className="text-lg font-semibold">Step: 2 of 8</h2>
      </div>
      
      <div className="form-section-content">
        <div className="text-center mb-6">
          <Smartphone className="mx-auto text-primary text-4xl mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">OTP Verification</h3>
          <p className="text-gray-600">
            Dear <span className="font-medium">{userName}</span>, To proceed further with the 
            Enrolment/Registration process you need to verify Your Mobile Number.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          {!otpSent ? (
            <div className="text-center">
              <div className="info-box mb-6">
                <p className="text-sm text-blue-800">
                  We will send a 6 Digit Numeric OTP to your Mobile Number <span className="font-medium">{maskedNumber}</span>.
                </p>
              </div>
              
              <Button 
                onClick={handleSendOtp}
                disabled={isSending}
                className="gov-button-primary"
              >
                {isSending ? "Sending..." : "Send OTP"}
              </Button>
            </div>
          ) : (
            <>
              <div className="info-box mb-6">
                <p className="text-sm text-blue-800">
                  We have sent a 6 Digit Numeric OTP on Your Mobile Number <span className="font-medium">{maskedNumber}</span>.
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  Do you want to change the Name/Mobile Number/Email? 
                  <button type="button" className="text-blue-600 hover:text-blue-800 underline ml-1">
                    Click Here
                  </button>
                </p>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Enter the Numeric OTP received on Mobile <span className="text-red-500">*</span>
                        </FormLabel>
                        <div className="flex items-center space-x-4">
                          <Smartphone className="text-gray-400" />
                          <FormControl>
                            <Input 
                              placeholder="393326" 
                              {...field}
                              onChange={(e) => field.onChange(e.target.value.replace(/\D/g, '').substring(0, 6))}
                              className="text-center font-mono text-lg"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="text-center">
                    <Button 
                      type="submit" 
                      disabled={isVerifying}
                      className="gov-button-primary"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      {isVerifying ? "Verifying..." : "Verify & Proceed Further"}
                    </Button>
                  </div>
                </form>
              </Form>
            </>
          )}
        </div>
      </div>
      
      <div className="form-section-footer flex justify-between">
        <Button onClick={onPrev} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div></div>
      </div>
    </div>
  );
}
