import { useEffect } from "react";
import Login from "./Pages/Auth/Login/Login";
import Home from "./Pages/Home/Home";
import { BrowserRouter, Route, Routes , Navigate} from "react-router-dom";
import Signup from "./Pages/Auth/Signup/Signup";
import Header from "./Components/UserConversasion/Header/Header";
import { Sidebar } from "./Components";
import Chattine from "./Components/UserConversasion/Chatting/Chatting";
import { useDispatch } from "react-redux";
import { handleReceiverId } from "./Store/slice";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
const App = () => {
  const receiverId = useSelector((state) => state.receiverId);
  const dispatch=useDispatch()
  // const navigate=useNavigate()
  useEffect(()=>{
    const id = new URLSearchParams(window.location.search).get('id');
    if(id){
      dispatch(handleReceiverId(id))
    }
    console.log(id, 'idloc');
  })
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
        receiverId ? (
          <div className="w-full fixed bg-primary-hover h-screen flex">
            <div className="h-full sm:block hidden sm:w-[25%] w-full">
              <Sidebar />
            </div>
            <div className="h-full sm:w-[75%] w-full bg-slate-400">
              <Header />
              <Chattine />
            </div>
          </div>
        ) : (
          <Navigate to="/" />
        )
      }
    />
   
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
