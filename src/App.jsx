import { useEffect } from "react";
import Login from "./Pages/Auth/Login/Login";
import Home from "./Pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Auth/Signup/Signup";
import Header from "./Components/UserConversasion/Header/Header";
import { Sidebar } from "./Components";
import Chattine from "./Components/UserConversasion/Chatting/Chatting";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/singnup" element={<Signup />} />
          <Route
            exact
            path="/chat"
            element={
              <div className="w-full fixed  bg-primary-hover h-screen flex ">
                <div className="h-full sm:block hidden sm:w-[25%] w-full ">
                  <Sidebar />
                </div>
                <div className="h-full sm:w-[75%] w-full bg-slate-400">
                  <Header />
                  <Chattine />
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
