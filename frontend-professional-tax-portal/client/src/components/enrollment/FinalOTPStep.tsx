import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpVerificationSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Shield, Check, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import type { OtpVerification } from "@/types/enrollment";

interface FinalOTPStepProps {
  mobileNumber: string;
  onNext: () => void;
  onSendOtp: (data: { mobile: string; type: 'mobile' | 'final' }) => void;
  onVerifyOtp: (data: OtpVerification) => Promise<boolean>;
  isVerifying: boolean;
  isSending: boolean;
}

export default function FinalOTPStep({
  mobileNumber,
  onNext,
  onSendOtp,
  onVerifyOtp,
  isVerifying,
  isSending
}: FinalOTPStepProps) {
  const [timeLeft, setTimeLeft] = useState(102); // 1 min 42 sec
  const [canResend, setCanResend] = useState(false);
  
  const form = useForm<{ otp: string }>({
    resolver: zodResolver(otpVerificationSchema.pick({ otp: true })),
    defaultValues: { otp: '' },
  });

  useEffect(() => {
    // Send OTP automatically when component mounts
    if (mobileNumber) {
      onSendOtp({ mobile: mobileNumber, type: 'final' });
    }
  }, [mobileNumber, onSendOtp]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const onSubmit = async (data: { otp: string }) => {
    const verified = await onVerifyOtp({
      mobile: mobileNumber,
      otp: data.otp,
      type: 'final'
    });
    
    if (verified) {
      onNext();
    }
  };

  const handleResend = () => {
    onSendOtp({ mobile: mobileNumber, type: 'final' });
    setTimeLeft(102);
    setCanResend(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} Min ${secs} Sec`;
  };

  return (
    <div className="form-section">
      <div className="form-section-header">
        <h2 className="text-lg font-semibold">Step: 7 of 8</h2>
      </div>
      
      <div className="form-section-content">
        <div className="text-center mb-6">
          <Shield className="mx-auto text-primary text-4xl mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Final OTP Verification</h3>
          <p className="text-green-600 mb-4">
            We have sent an OTP on your Mobile Number <span className="font-medium">{mobileNumber}</span>.
          </p>
          <p className="text-blue-600 mb-4">
            You must enter the OTP to finally submit the Enrolment Form.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="58394"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value.replace(/\D/g, '').substring(0, 6))}
                        className="w-full text-center text-lg font-mono py-3"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="text-center mb-6">
                <Button 
                  type="submit" 
                  disabled={isVerifying}
                  className="gov-button-primary"
                >
                  <Check className="w-4 h-4 mr-2" />
                  {isVerifying ? "Verifying..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {canResend ? (
                "You can now resend the OTP"
              ) : (
                <>
                  If you don't receive OTP in <span className="text-red-500">{formatTime(timeLeft)}</span> you may click on Resend Button.
                </>
              )}
            </p>
            <Button
              type="button"
              onClick={handleResend}
              disabled={!canResend || isSending}
              className="mt-2"
              variant="outline"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {isSending ? "Sending..." : "Resend"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
