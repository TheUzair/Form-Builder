import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navbar from "./Navbar";
import ClozeFormsContainer from "./ClozeFormComponent/ClozeFormsContainer";
import ComprehensionFormsContainer from "./ComprehensionComponent/ComprehensionFormsContainer";
import CategoriesFormContainer from "./CategoriseComponent/CategoriseFormsContainer";

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
        return <ComprehensionFormsContainer />;
      case "categories":
        return <CategoriesFormContainer />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-slate-50 to-slate-100">
      <Navbar />

      <main className="flex-grow flex flex-col">
        {!activeForm ? (
          // when no form is active
          <>
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
                      Sample Test
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-b from-white to-indigo-50 flex-grow">
              <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
                  Question Types
                </h2>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button
                    onClick={() => setActiveForm("categories")}
                    variant="outline"
                    className="text-slate-700 hover:text-indigo-600 border-slate-300 hover:border-indigo-300 transition-all duration-300"
                  >
                    Categories
                  </Button>
                  <Button
                    onClick={() => setActiveForm("cloze")}
                    variant="outline"
                    className="text-slate-700 hover:text-indigo-600 border-slate-300 hover:border-indigo-300 transition-all duration-300"
                  >
                    Cloze Test
                  </Button>
                  <Button
                    onClick={() => setActiveForm("comprehension")}
                    variant="outline"
                    className="text-slate-700 hover:text-indigo-600 border-slate-300 hover:border-indigo-300 transition-all duration-300"
                  >
                    Comprehension
                  </Button>
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
                  Begin Sample Test Now
                </Button>
              </div>
            </section>
          </>
        ) : (
          // when a form is active
          <div className="flex-grow bg-white p-4">
            <div className="container mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  {activeForm.charAt(0).toUpperCase() + activeForm.slice(1)} Question
                </h2>
                <Button
                  variant="outline"
                  onClick={() => setActiveForm(null)}
                  className="text-slate-700 hover:text-indigo-600"
                >
                  Back to Home
                </Button>
              </div>
              {renderForm()}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;