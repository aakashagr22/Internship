import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/apollo247.jpg"
                alt="Apollo 247"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav
            className={`md:flex items-center space-x-8 ${
              mobileMenuOpen
                ? "block absolute top-16 left-0 right-0 bg-white p-4 shadow-md z-50"
                : "hidden"
            }`}
          >
            <Link
              href="/specialties/general-physician-internal-medicine"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Doctors
            </Link>
            <Link href="#" className="text-gray-700 hover:text-purple-600 font-medium">
              Pharmacy
            </Link>
            <Link href="#" className="text-gray-700 hover:text-purple-600 font-medium">
              Lab Tests
            </Link>
            <Link href="#" className="text-gray-700 hover:text-purple-600 font-medium">
              Health Records
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-purple-600">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-gray-700 hover:text-purple-600">
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button className="text-gray-700 hover:text-purple-600">
              <User className="h-5 w-5" />
            </button>
            <button
              className="md:hidden text-gray-700 hover:text-purple-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}