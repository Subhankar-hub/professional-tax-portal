import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Professional Tax Portal</h3>
            <p className="text-gray-300 text-sm">
              Government of Tripura official portal for professional tax enrollment and management.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Enrollment</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Payment</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p><MapPin className="inline mr-2 w-4 h-4" />Agartala, Tripura</p>
              <p><Phone className="inline mr-2 w-4 h-4" />0381-XXXXXX</p>
              <p><Mail className="inline mr-2 w-4 h-4" />support@ptax.tripura.gov.in</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Government of Tripura. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
