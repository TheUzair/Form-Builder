import { Button } from "@/components/ui/button";
import { FileText, Eye, BarChart2, Settings } from "lucide-react";

const Navbar = () => (
  <div className="flex justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 shadow-md">
    
    <div className="flex gap-4">
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-gray-600 hover:text-blue-600 transition"
      >
        <FileText className="h-5 w-5" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-gray-600 hover:text-blue-600 transition"
      >
        <Eye className="h-5 w-5" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-gray-600 hover:text-blue-600 transition"
      >
        <BarChart2 className="h-5 w-5" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-gray-600 hover:text-blue-600 transition"
      >
        <Settings className="h-5 w-5" />
      </Button>
    </div>

    
    <div className="flex gap-4">
      <Button 
        variant="outline" 
        className="border-gray-400 text-gray-600 hover:bg-gray-100 transition"
      >
        Save & Proceed
      </Button>
    </div>
  </div>
);

export default Navbar;
