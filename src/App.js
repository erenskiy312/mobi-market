import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from './components/Product/Home';
import CreatePassword from "./components/Auth/CreatePassword";
import Profile from "./components/Profile/Profile";
function App() {
  return (
    <div>
      
      <Routes>

      <Route 
      path="/"
      element={<Home/>} 
      />

      <Route
      path='/register'
      element={<Register/>}
      />
      
      <Route 
      path="/login"
      element={<Login/>} 
      />

      <Route
      path="/create-password"
      element={<CreatePassword/>}
      />

      <Route
      path="/profile"
      element={<Profile/>}
      />

      </Routes>

  </div>
  );
}

export default App;
