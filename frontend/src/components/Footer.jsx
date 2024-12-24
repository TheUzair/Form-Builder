const Footer = () => {
  return (
    <footer className="border-t bg-gradient-to-r from-blue-50 to-blue-100 shadow-md py-6 sm:py-8 mt-auto"> 
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-sm sm:text-base text-gray-800">
              Form Builder
            </span>
            <span className="text-xs sm:text-sm text-gray-600">
              © 2024 All rights reserved.
            </span>
          </div>

          <div className="flex gap-4 sm:gap-6">
            <a 
              href="#" 
              className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300 
                         hover:underline decoration-2 underline-offset-4"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300
                         hover:underline decoration-2 underline-offset-4"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300
                         hover:underline decoration-2 underline-offset-4"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;