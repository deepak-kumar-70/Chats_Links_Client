import { useEffect } from "react";
import Login from "./Pages/Auth/Login/Login";
import Home from "./Pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Auth/Signup/Signup";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/singnup" element={<Signup/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
