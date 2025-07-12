import { Building2 } from "lucide-react";

export default function Header() {
  return (
    <header className="gov-header shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Building2 className="text-primary text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Professional Tax</h1>
              <p className="text-blue-200 text-sm">Commissionerate of Taxes & Excise</p>
              <p className="text-blue-200 text-xs">Government of Tripura</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm">Online Tax Portal</p>
              <p className="text-xs text-blue-200">Secure & Efficient</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
