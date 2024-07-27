import { Sidebar, UserCoversasion } from "../../Components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { handleSenderId } from "../../Store/slice";
import useWindowWidth from "../../Components/component/WindowWidth";
import { useSelector } from "react-redux";
import IncomingCall from "../../Components/component/IncomingCall";
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { windowWidth, isSmallScreen, isLargeScreen } = useWindowWidth();
  const receiverId = useSelector((state) => state.receiverId);

  useEffect(() => {
  
    try {
      const senderId = localStorage.getItem("user_id");
      if (senderId) {
        dispatch(handleSenderId(senderId));
      } else {
        navigate("/login") || navigate("/singnup");
      }
    } catch (error) {
      console.log(error);
    }
  }, [receiverId]);
  return (
    <div className="w-full fixed  bg-primary-hover h-screen flex ">
   
      {isSmallScreen ? (
        <div className="h-full sm:w-[25%] w-full ">
          <Sidebar />
        </div>
      ) : (
        <>
          <div className="h-full sm:w-[25%] w-full ">
            <Sidebar />
          </div>
          <div className="h-full w-[75%] bg-slate-400">
            <UserCoversasion />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
