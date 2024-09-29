"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-200 text-gray-300  absolute z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 dark:text-black">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <span className="sr-only">PlanMaster </span>
              <svg
                className="h-8 w-8 text-purple-500 dark:text-purple-800"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
               
                viewBox="0 0 48 48"
                id="brain-side"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                  <path d="M45.89 16.27A5.81 5.81 0 0 1 42.59 19c.41 3.13-1.71 5-2.59 5a1 1 0 0 1-.55-1.83A2.88 2.88 0 0 0 40.57 19c-2.94-.65-5.15-4-5.42-4.46a1 1 0 0 1 1.7-1.06c.66 1 2.8 3.73 4.81 3.63 1.78-.09 3.23-3 3.23-3.13A4.93 4.93 0 0 0 39.6 10a5 5 0 0 0-2.35-2.5c-.17 1.69-.83 3.71-2.93 4.41a1 1 0 0 1-.64-1.9c1.47-.49 1.65-2.55 1.61-3.8a4.94 4.94 0 0 0-6-.46A4 4 0 0 0 25 4.12c1.31 5.45-3.38 7.77-8.84 8.86a2.39 2.39 0 0 0-1.84 1.19c-.67 1.36.16 3.63.54 4.38a1 1 0 0 1-1.79.9c-1.84-3.59-1.4-7.61 2.69-8.43 4.47-.89 8.4-2.39 7.24-6.66a6 6 0 0 0-6.55 1.69A5 5 0 0 0 12.94 8.1a6 6 0 0 0-4.62 4 3.94 3.94 0 0 0-3.27 4.42A6 6 0 0 0 3 21a5 5 0 0 0 .42 8.23 19.07 19.07 0 0 1 7.31-6.08 5.86 5.86 0 0 0-1.44-2.46 1 1 0 0 1 1.42-1.42 8 8 0 0 1 1.91 3.21 13.7 13.7 0 0 1 4.43-.5 1 1 0 0 1-.1 2c-6-.3-10.12 4-12 6.57a3.94 3.94 0 0 0 5.61.47 6 6 0 0 0 8.12.68 4.89 4.89 0 0 0 5.46.78C24.08 29.34 23.51 28 21 28a11.31 11.31 0 0 0-4.56.9 1 1 0 0 1-.89-1.79A13 13 0 0 1 21 26a5.56 5.56 0 0 1 3.45 1.05c1.39.71 5.15 2.1 5.6.63.37-1.11-1.18-1.67-1.36-1.73a1 1 0 0 1-.64-1.26c.54-1.57 3.07 0 3.76 1.35 1 1.92-.16 5.6-5.93 3.74a12.44 12.44 0 0 1 .27 2.61 7 7 0 0 0 5.15.22 4 4 0 0 0 5.08-1.47c-.1-2.24-.73-7.5-4.55-8.15-5.84-1-10.29 0-15.6-6.35a1 1 0 0 1 1.54-1.28 17.3 17.3 0 0 0 2.77 2.7A5.55 5.55 0 0 1 26 14a1 1 0 0 1 0 2c-1.89 0-3.13 1.06-3.7 3.13 6.43 3.15 14.25-1.47 15.88 9.86a4 4 0 0 0 2.66-1.18A4 4 0 0 0 45.5 22.1 3.93 3.93 0 0 0 45.89 16.27zM34.68 20c-5.4-1.8-6.07-6.12-5.66-8.15a1 1 0 0 1 2 .39c0 .19-.7 4.18 4.34 5.86A1 1 0 0 1 34.68 20zM21.92 35a6 6 0 0 1-5.27 5A15.53 15.53 0 0 0 16 44h5c.61-5 2.66-5 5.72-9.29a9.18 9.18 0 0 1-1.47-.53A6.76 6.76 0 0 1 21.92 35zM19.94 34.68a7.08 7.08 0 0 1-1.3-.56 8 8 0 0 1-8.28-.61 5.82 5.82 0 0 1-3.36.4A3 3 0 0 0 10 37h3.36A4 4 0 0 0 19.94 34.68z"></path>
                 
                <line x1="12" x2="12" y1="22" y2="12" />
              </svg>
              
              <span className="ml-2 text-xl font-bold">PlanMaster</span>
            </Link>
            <p className="text-sm">
              Transform your ideas into actionable plans with the power of AI.
              Our platform helps you create detailed, step-by-step guides for
              any goal or project.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/Aboutus"
                  className="hover:text-white dark:hover:text-purple-800 dark:hover:font-semibold  transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/HowitWorks"
                  className="hover:text-white  dark:hover:text-purple-800 dark:hover:font-semibold   transition-colors"
                >
                  How It Works
                </Link>
              </li>
             
              <li>
                <Link
                  href="/Contactus"
                  className="hover:text-white  dark:hover:text-purple-800 dark:hover:font-semibold transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for the latest updates and tips.
            </p>
            <form className="flex">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 dark:bg-gray-200 text-white dark:text-black border-gray-700 focus:border-purple-500"
              />
              <Button
                type="submit"
                className="ml-2 bg-purple-600  hover:bg-purple-700"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>
        </div>

        {/* Social Links and Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 dark:text-black flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 sm:mb-0">
            <Link
              href="https://facebook.com"
              className="hover:text-white dark:hover:text-purple-800 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="https://twitter.com"
              className="hover:text-white dark:hover:text-purple-800 transition-colors"
              
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="https://instagram.com"
              className="hover:text-white dark:hover:text-purple-800 transition-colors"
              
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="https://linkedin.com"
              className="hover:text-white dark:hover:text-purple-800 transition-colors"
              
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} AI Plan Generator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
