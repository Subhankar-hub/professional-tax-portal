import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { establishmentInfoSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Plus, InfoIcon } from "lucide-react";
import { useState } from "react";
import type { EstablishmentInfo } from "@shared/schema";
import type { MasterDataItem, CategoryItem, SubcategoryItem, DistrictItem, AreaItem, ChargeItem } from "@/types/enrollment";

interface EstablishmentInfoStepProps {
  data: EstablishmentInfo;
  masterData: {
    districts?: DistrictItem[];
    areas?: AreaItem[];
    charges?: ChargeItem[];
    categories?: CategoryItem[];
    subcategories?: SubcategoryItem[];
  };
  onNext: (data: EstablishmentInfo) => void;
  onPrev: () => void;
  onDistrictChange: (districtCode: string) => void;
  onAreaChange: (areaCode: string) => void;
  onCategoryChange: (categoryId: number) => void;
}

export default function EstablishmentInfoStep({
  data,
  masterData,
  onNext,
  onPrev,
  onDistrictChange,
  onAreaChange,
  onCategoryChange
}: EstablishmentInfoStepProps) {
  const [additionalEstablishments, setAdditionalEstablishments] = useState(
    data.additionalEstablishments || []
  );
  
  const form = useForm<EstablishmentInfo>({
    resolver: zodResolver(establishmentInfoSchema),
    defaultValues: data,
  });

  const onSubmit = (formData: EstablishmentInfo) => {
    onNext({ ...formData, additionalEstablishments });
  };

  const addEstablishment = () => {
    if (additionalEstablishments.length < 5) {
      setAdditionalEstablishments([...additionalEstablishments, { name: '', address: '' }]);
    }
  };

  const removeEstablishment = (index: number) => {
    setAdditionalEstablishments(additionalEstablishments.filter((_, i) => i !== index));
  };

  const updateEstablishment = (index: number, field: 'name' | 'address', value: string) => {
    const updated = [...additionalEstablishments];
    updated[index][field] = value;
    setAdditionalEstablishments(updated);
  };

  return (
    <div className="form-section">
      <div className="form-section-header">
        <h2 className="text-lg font-semibold">Step: 3 of 8</h2>
      </div>
      
      <div className="form-section-content">
        <h3 className="text-lg font-semibold text-primary mb-4">Establishment Information</h3>
        
        <div className="info-box warning mb-6">
          <p className="text-sm text-orange-800">
            <InfoIcon className="inline w-4 h-4 mr-2" />
            <strong>Note:</strong> You may be engaged with any one or multiple among 
            Profession/Trade/Calling/Employment, but here you need to furnish the details of only one 
            among Profession/Trade/Calling/Employment from which you have the maximum earning.
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="establishmentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name of Establishment (Profession/Trade/Calling/Employment) <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Establishment Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      District <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        onDistrictChange(value);
                      }} 
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select District" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {masterData.districts?.map((district) => (
                          <SelectItem key={district.district_lgd_code} value={district.district_lgd_code?.toString()}>
                            {district.district_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      <button type="button" className="text-blue-600 hover:text-blue-800 underline text-xs">
                        Know your Jurisdiction.
                      </button>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="jurisdictionArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Area of Jurisdiction <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        onAreaChange(value);
                      }} 
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Area" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {masterData.areas?.map((area) => (
                          <SelectItem key={area.code} value={area.code}>
                            {area.name_en}
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
                name="charge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Charge <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Charge" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {masterData.charges?.map((charge) => (
                          <SelectItem key={charge.code} value={charge.code}>
                            {charge.charge}
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
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      PIN Code <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="799001" 
                        {...field}
                        onChange={(e) => field.onChange(e.target.value.replace(/\D/g, '').substring(0, 6))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="establishmentAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Establishment Address <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Establishment Address" {...field} />
                    </FormControl>
                    <FormDescription>
                      Shop Number / Building Number / Street Name / Road Name etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Additional Establishments */}
            <div className="mt-6">
              <div className="info-box">
                <p className="text-sm text-blue-800 mb-4">
                  <Plus className="inline w-4 h-4 mr-2" />
                  If you are having Additional Place of work, please specify Name and Address
                </p>
                
                {additionalEstablishments.map((establishment, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name of Establishment (Profession/Trade/Calling/Employment)
                      </label>
                      <Input
                        placeholder="Establishment Type"
                        value={establishment.name}
                        onChange={(e) => updateEstablishment(index, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Establishment Address (Full Address)
                      </label>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Establishment Address"
                          value={establishment.address}
                          onChange={(e) => updateEstablishment(index, 'address', e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeEstablishment(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {additionalEstablishments.length < 5 && (
                  <Button
                    type="button"
                    onClick={addEstablishment}
                    className="gov-button-secondary"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add More (Max 5)
                  </Button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Category of Profession/Trade/Calling/Employment <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        onCategoryChange(parseInt(value));
                      }} 
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {masterData.categories?.map((category) => (
                          <SelectItem key={category.cat_id} value={category.cat_id?.toString()}>
                            {category.cat_description}
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
                name="subcategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Sub-Category of Profession/Trade/Calling/Employment <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(value)} 
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Sub-Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {masterData.subcategories?.map((subcategory) => (
                          <SelectItem key={subcategory.subcat_code} value={subcategory.subcat_code?.toString()}>
                            {subcategory.subcat_description}
                          </SelectItem>
                        ))}
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
