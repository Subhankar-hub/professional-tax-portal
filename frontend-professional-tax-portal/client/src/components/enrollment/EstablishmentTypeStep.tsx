import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { establishmentTypeSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { EstablishmentType } from "@shared/schema";

interface EstablishmentTypeStepProps {
  data: EstablishmentType;
  onNext: (data: EstablishmentType) => void;
  onPrev: () => void;
}

const engagementOptions = [
  { value: 'profession', label: 'Profession' },
  { value: 'trade', label: 'Trade' },
  { value: 'calling', label: 'Calling' },
  { value: 'employment', label: 'Employment' },
];

export default function EstablishmentTypeStep({ data, onNext, onPrev }: EstablishmentTypeStepProps) {
  const form = useForm<EstablishmentType>({
    resolver: zodResolver(establishmentTypeSchema),
    defaultValues: data,
  });

  const onSubmit = (formData: EstablishmentType) => {
    onNext(formData);
  };

  return (
    <div className="form-section">
      <div className="form-section-header">
        <h2 className="text-lg font-semibold">Step: 4 of 8</h2>
      </div>
      
      <div className="form-section-content">
        <h3 className="text-lg font-semibold text-primary mb-6">Other Details</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="engagementTypes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Engaged With <span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {engagementOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(option.value)}
                            onCheckedChange={(checked) => {
                              const updatedValue = checked
                                ? [...(field.value || []), option.value]
                                : (field.value || []).filter(value => value !== option.value);
                              field.onChange(updatedValue);
                            }}
                          />
                        </FormControl>
                        <label className="text-sm font-medium cursor-pointer">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
