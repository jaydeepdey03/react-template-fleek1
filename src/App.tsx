import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Analysis from "./Analysis";
import Marketplace from "./Marketplace";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/analysis/:id" element={<Analysis />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
