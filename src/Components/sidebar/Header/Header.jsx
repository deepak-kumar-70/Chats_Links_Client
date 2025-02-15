
import { FaUsers } from "react-icons/fa6";
import statusIcon from "../../../assets/image/statusicon.webp";
import { PiChatCircleText } from "react-icons/pi";
import { MdAddComment } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import GetApi from "../../api";
import Profile from "./Profile";
import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import { useSelector } from "react-redux";
import { backendUrl } from "../../../Store/slice";
import { Link } from "react-router-dom";
const Header = () => {
  const [profile,setProfile]=useState(false)
  const user_id= useSelector((state)=>state.senderId)
  const [makeGroup,setMakeGroup]=useState(false)
  const apiUrl =  `${backendUrl}/user/getmyprofile/${user_id}`;
  const {  data } = GetApi(apiUrl)

  const isProfile=()=>{
    setProfile(!profile)
  }
  const showGroupOption=()=>{
    setMakeGroup(!makeGroup)
  }
  return (
    <div className="w-full h-[66px] py-4 px-5 bg-[#fff] flex items-center justify-between border-b-[1px] border-b-neutral-300 border-t-[1px] border-t-neutral-300">
      <div>
     <Link to={`/?Profile?=${data?.user._id}`} onClick={isProfile}><img
        src={data?.user.avatar}
        className='h-[40px] w-[40px] rounded-full object-cover cursor-pointer' />
       </Link>
     {
      profile &&
      <div className="z-10"><Profile  setProfile={setProfile}/></div>
     }
      
       
      </div>
      <div className="flex items-center gap-7 text-neutral-600">
        <div className="text-[1.25rem]  cursor-pointer">
          <FaUsers />
        </div>
        <div className="text-[1.25rem]  cursor-pointer">
          <img src={statusIcon} className="h-6 w-6" />
        </div>
        <div className="text-[1.25rem]  cursor-pointer">
          <PiChatCircleText />
        </div>
        <div className="text-[1.25rem]  cursor-pointer">
          <MdAddComment />
        </div>
        <div className="text-[1.15rem] rounded-full cursor-pointer" onClick={showGroupOption}>
          <BsThreeDotsVertical />
        </div>
        {
         makeGroup && 
         <div className="w-[300px] absolute inset-0 z-50 bg-neutral-600 p-2 h-auto">
         <SearchBox/>
         
         </div>
        }
      </div>
    </div>
  );
};

export default Header;
