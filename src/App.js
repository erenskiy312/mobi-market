import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from './components/Auth/Home';
import CreatePassword from "./components/Auth/CreatePassword";
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

      <Route
      path="/create-password"
      element={<CreatePassword/>}
      />

      </Routes>

  </div>
  );
}

export default App;
