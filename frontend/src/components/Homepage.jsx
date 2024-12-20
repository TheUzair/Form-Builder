import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navbar from "./Navbar";
import ClozeFormsContainer from "./ClozeFormComponent/ClozeFormsContainer";
import ComprehensionForm from "./ComprehensionComponent/ComprehensionForm";
import CategoriesForm from "./CategoriseComponent/CategoriesForm";
import { ArrowRight } from "lucide-react";

const Homepage = () => {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState(null);

  const handleTestStart = () => {
    navigate("/test");
  };

  const renderForm = () => {
    switch (activeForm) {
      case "cloze":
        return <ClozeFormsContainer />;
      case "comprehension":
        return <ComprehensionForm />;
      case "categories":
        return <CategoriesForm />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-slate-50 to-slate-100">
    <Navbar />

    <main className="flex-grow">
      
      <section className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
              Interactive Learning Platform
            </h1>
            <p className="text-xl text-slate-700 mb-8">
              Enhance your learning experience with our diverse question formats
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg 
                           hover:from-indigo-700 hover:to-purple-700 hover:shadow-indigo-200/50 
                           transition-all duration-300"
                onClick={handleTestStart}
              >
                Start Test
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-gradient-to-b from-white to-indigo-50">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Question Types
          </h2>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button
              onClick={() => setActiveForm("cloze")}
              variant={activeForm === "cloze" ? "default" : "outline"}
              className={`
                ${activeForm === "cloze" 
                  ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                  : "text-slate-700 hover:text-indigo-600 border-slate-300 hover:border-indigo-300"}
                transition-all duration-300
              `}
            >
              Cloze Test
            </Button>
            <Button
              onClick={() => setActiveForm("comprehension")}
              variant={activeForm === "comprehension" ? "default" : "outline"}
              className={`
                ${activeForm === "comprehension" 
                  ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                  : "text-slate-700 hover:text-indigo-600 border-slate-300 hover:border-indigo-300"}
                transition-all duration-300
              `}
            >
              Comprehension
            </Button>
            <Button
              onClick={() => setActiveForm("categories")}
              variant={activeForm === "categories" ? "default" : "outline"}
              className={`
                ${activeForm === "categories" 
                  ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                  : "text-slate-700 hover:text-indigo-600 border-slate-300 hover:border-indigo-300"}
                transition-all duration-300
              `}
            >
              Categories
            </Button>
          </div>
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            {renderForm()}
          </div>
        </div>
      </section>

      
      <section className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-700">
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Ready to Test Your Knowledge?
          </h2>
          <p className="mb-6 text-lg text-indigo-100">
            Try our interactive learning platform with various question formats
          </p>
          <Button
            size="lg"
            className="bg-white text-indigo-700 hover:bg-indigo-50 
                       shadow-xl hover:shadow-2xl hover:shadow-white/20
                       transition-all duration-300"
            onClick={handleTestStart}
          >
            Begin Test Now
          </Button>
        </div>
      </section>
    </main>

    <Footer />
  </div>
  );
};

export default Homepage;
