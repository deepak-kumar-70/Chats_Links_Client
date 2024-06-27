import { Sidebar, UserCoversasion } from "../../Components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { handleSenderId } from "../../Store/slice";
import useWindowWidth from "../../Components/component/WindowWidth";
import { useSelector } from "react-redux";
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { windowWidth, isSmallScreen, isLargeScreen } = useWindowWidth();
  const receiverId = useSelector((state) => state.receiverId);
  useEffect(() => {
    const senderId = localStorage.getItem("user_id");
    if (senderId) {
      dispatch(handleSenderId(senderId));
    } else {
      navigate("/singnup");
    }
  }, []);
  return (
    <div className="w-full fixed  bg-primary-hover h-screen flex ">
      {isSmallScreen ? (
        !receiverId ? (
          <div className="h-full sm:w-[25%] w-full ">
            <Sidebar />
          </div>
        ) : (
          <div className="h-full sm:w-[75%] w-full bg-slate-400">
            <UserCoversasion />
          </div>
        )
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
