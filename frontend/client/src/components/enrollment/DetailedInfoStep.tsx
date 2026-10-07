import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { detailedInfoSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { DetailedInfo } from "@shared/schema";
import type { MasterDataItem } from "@/types/enrollment";

interface DetailedInfoStepProps {
  data: DetailedInfo;
  periodOptions?: MasterDataItem[];
  onNext: (data: DetailedInfo) => void;
  onPrev: () => void;
}

export default function DetailedInfoStep({ data, periodOptions, onNext, onPrev }: DetailedInfoStepProps) {
  const form = useForm<DetailedInfo>({
    resolver: zodResolver(detailedInfoSchema),
    defaultValues: data,
  });

  const onSubmit = (formData: DetailedInfo) => {
    onNext(formData);
  };

  return (
    <div className="form-section">
      <div className="form-section-header">
        <h2 className="text-lg font-semibold">Step: 5 of 8</h2>
      </div>
      
      <div className="form-section-content">
        <h3 className="text-lg font-semibold text-primary mb-6">Professional Details</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="dateOfCommencement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Date of Commencement <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="periodOfStanding"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Period of Standing <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Period" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {periodOptions?.map((period) => (
                          <SelectItem key={period.id} value={period.code}>
                            {period.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="registeredUnderVAT"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registered Under VAT</FormLabel>
                    <FormControl>
                      <Input placeholder="1111111111" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="registeredUnderCST"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registered Under CST</FormLabel>
                    <FormControl>
                      <Input placeholder="1111111111" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="registeredUnderGST"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registered Under GST</FormLabel>
                    <FormControl>
                      <Input placeholder="Not Provided" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="employerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Employer Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="employerAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employer Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Employer Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="applicantSalary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Applicant Salary</FormLabel>
                    <FormControl>
                      <Input placeholder="1000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="simultaneousEmployment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Simultaneously engaged in Employment of more than one Employer</FormLabel>
                    <Select onValueChange={(value) => field.onChange(value === 'true')} value={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="false">No</SelectItem>
                        <SelectItem value="true">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="form-section-footer flex justify-between">
              <Button onClick={onPrev} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
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
