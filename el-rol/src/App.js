import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Dash";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Landing} />
          {/* <Route exact path="/login" Component={login}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
