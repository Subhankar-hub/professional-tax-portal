import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, RefreshCw } from "lucide-react";
import { useState } from "react";
import type { PersonalInfo } from "@shared/schema";

interface PersonalInfoStepProps {
  data: PersonalInfo;
  onNext: (data: PersonalInfo) => void;
}

export default function PersonalInfoStep({ data, onNext }: PersonalInfoStepProps) {
  const [captchaQuestion, setCaptchaQuestion] = useState("10+65=");
  const [captchaAnswer, setCaptchaAnswer] = useState("75");
  
  const form = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: data,
  });

  const refreshCaptcha = () => {
    const num1 = Math.floor(Math.random() * 50) + 1;
    const num2 = Math.floor(Math.random() * 50) + 1;
    setCaptchaQuestion(`${num1}+${num2}=`);
    setCaptchaAnswer((num1 + num2).toString());
  };

  const onSubmit = (formData: PersonalInfo) => {
    if (formData.captchaValue !== captchaAnswer) {
      form.setError("captchaValue", { message: "Incorrect captcha answer" });
      return;
    }
    onNext(formData);
  };

  return (
    <div className="form-section">
      <div className="form-section-header">
        <h2 className="text-lg font-semibold">Step: 1 of 8</h2>
      </div>
      
      <div className="form-section-content">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4">Applying as:</p>
              <FormField
                control={form.control}
                name="applicantType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Individual" id="individual" />
                          <Label htmlFor="individual" className="text-red-500">Individual</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Others" id="others" />
                          <Label htmlFor="others" className="text-primary">Others</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Name of the Applicant <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        Name (Individual/Business Entity) must match with the name provided on your PAN/TAN card.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Gender <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fatherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Father's Name of the Applicant <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Father's Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please, Do not write Mr/Shri/Er/Doc etc.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="pan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        PAN or TAN <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="AAAAA1111G" 
                          {...field}
                          onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                        />
                      </FormControl>
                      <FormDescription>
                        PAN/TAN issued to you
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Mobile Number <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="9999999999" 
                          {...field}
                          onChange={(e) => field.onChange(e.target.value.replace(/\D/g, '').substring(0, 10))}
                        />
                      </FormControl>
                      <FormDescription>
                        Please write Valid Mobile Number only without Country Code (+91).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="test@gmail.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please provide a valid email address otherwise you will not be able to complete the Enrolment.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="captchaValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Prove that you are not a robot! <span className="text-red-500">*</span>
                      </FormLabel>
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
                        <FormControl>
                          <Input className="w-24" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="form-section-footer flex justify-end">
              <Button type="submit" className="gov-button-primary">
                <ArrowRight className="w-4 h-4 mr-2" />
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
