import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Dash';
import Home from './Pages/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Home}/>
          <Route exact path="/landing" Component={Landing}/>
          {/* <Route exact path="/login" Component={login}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
