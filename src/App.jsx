import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>

      <p className="App">Powered by Anaïs Engler, based on USGS database.</p>
    </div>
  );
}

export default App;
