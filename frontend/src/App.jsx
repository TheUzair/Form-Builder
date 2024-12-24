import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Homepage from "./components/Homepage";
import Test from "./components/Test";
import './index.css'
import { Toaster } from "@/components/ui/toaster"


const App = () => (
  <Router>

  <DndProvider backend={HTML5Backend}>
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
    <Toaster />
  </DndProvider>
  </Router>
);

export default App;