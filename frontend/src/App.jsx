import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Homepage from "./components/Homepage";
import Test from "./components/Test";
import './index.css'


const App = () => (
  <Router>

  <DndProvider backend={HTML5Backend}>
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  </DndProvider>
  </Router>
);

export default App;