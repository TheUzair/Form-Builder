const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto"> 
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">
            © 2024 Form Builder. All rights reserved.
          </div>

          <div className="flex gap-4">
            <a 
              href="#" 
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
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