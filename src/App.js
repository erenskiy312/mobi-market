import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from './components/Auth/Home';
function App() {
  return (
    <div>
      
      <Routes>

      <Route 
      path="/login"
      element={<Login/>} 
      />

      <Route
      path='/register'
      element={<Register/>}
      />
      
      <Route 
      path="/"
      element={<Home/>} 
      />

      </Routes>

  </div>
  );
}

export default App;
