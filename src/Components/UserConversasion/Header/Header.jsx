import { IoCallOutline } from "react-icons/io5";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { AiOutlineSearch } from "react-icons/ai";
import datas from "../../Data/UserData";
import { useSelector } from "react-redux";
import useGetApi from "../../api";
import { backendUrl, inComingVideoCall } from "../../../Store/slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import VideoCall from "../../VideoCall/VideoCall";
import useWebRTC from "../../Hook/WebRtc";
const Header = () => {
  const {createOffer}=useWebRTC()
 const dispatch=useDispatch()
  const OnlineStatus = useSelector((state) => state.userOnlineStatus);
  const isTyping = useSelector((state) => state.isTyping);
  const receiverId = useSelector((state) => state.receiverId);
  const senderId = useSelector((state) => state.senderId);
  const apiUrl = `${backendUrl}/user/getmyprofile/${receiverId}`;
  const { data } = useGetApi(apiUrl);
  const isVideoCall=useSelector((state)=>state.isVideoCall)
  const handleVideoCall=async()=>{
  
    dispatch(inComingVideoCall(true))
    await createOffer()
  }
  return (
    <div>
      {datas
        .filter((user) => user.id === "1a")
        .map((user) => (
          <div
          
            key={user.id}
            className="flex px-2 sm:h-[9.4vh] h-[8vh] items-center justify-between sm:px-5  cursor-pointer bg-[#fff] border-t-[1px] border-t-neutral-300"
          >
            <div className="flex items-center sm:gap-5 gap-2">
              <Link to="/" className="text-[1rem]  sm:hidden block">
                <IoMdArrowBack />
              </Link>
              <Link to="/profile">
                <div>
                  <img
                    src={data?.user?.avatar}
                    className={`sm:h-[50px] sm:w-[50px] h-[35px] w-[35px] rounded-full object-cover`}
                  />
                </div>
              </Link>

              <div>
                <div>
                  <span className="sm:text-[1rem] text-sm font-medium">
                    {data?.user?.name}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600"></span>
                  <span className="text-neutral-600 sm:text-[13px] text-[10px]">
                    {isTyping?'typing...':OnlineStatus}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex sm:text-xl gap-4 text-[15px] rounded-md sm:border-2">
                <div
                  onClick={handleVideoCall}
                  className="sm:py-3 sm:px-4 sm:border-r-2  hover:bg-neutral-50"
                >
                  <HiOutlineVideoCamera />
                </div>
                <span className="sm:py-3 sm:pr-4  hover:bg-neutral-50">
                  <IoCallOutline />
                </span>
              </div>
              <div className="text-[1.25rem] mr-6 sm:block hidden">
                <AiOutlineSearch />
              </div>
              <div className="text-[1rem]  sm:hidden block">
                <BsThreeDotsVertical />
              </div>
            </div>
            {isVideoCall && <VideoCall />}
          </div>
        ))}
    </div>
  );
};

export default Header;
