import useGetApi from "../../api";
import { useSelector } from "react-redux";
import { backendUrl } from "../../../Store/slice";
import { Link } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { IoIosArrowRoundBack } from "react-icons/io";
const Profile = () => {
  const user_id=  useSelector((state)=>state.senderId)
  const apiUrl =  `${backendUrl}/user/getmyprofile/${user_id}`;
const {data}=useGetApi(apiUrl)

const handleLogOut=({setProfile})=>{
  localStorage.removeItem('user_id')
  localStorage.removeItem('token')
}
  return (
    <div className="sm:w-[32%] w-full absolute sm:inset-0 h-[70vh]  z-50 bg-transparent left-[10px] sm:left-10 flex rounded-lg sm:mt-10 shadow-xl overflow-hidden">
      <div className="w-[30%] flex flex-col justify-between bg-neutral-200 h-[100%] p-2">
      <div><Link 
      to='/' 
      onClick={()=>setProfile(false)}
      className=" rounded-full w-8 h-8 flex items-center justify-center  hover:bg-neutral-50 bg-white"
      ><span className="text-2xl"><IoIosArrowRoundBack/></span></Link></div>
      <div><Link 
      to='/singnup' 
      onClick={handleLogOut}
      className="flex items-center gap-2 px-3 py-1 rounded-md hover:text-[#FF0000] bg-neutral-100"
      ><span><CiLogin/></span><span className="text-sm sm:text-base">Logout</span></Link></div>
      </div>
      <div className="w-[70%] bg-white h-full">
        <div className="w-full flex flex-col justify-center items-center gap-3 mt-10">
          <img src={data?.user?.avatar} className="w-[140px] h-[140px] rounded-full object-cover" />

          <p className="text-2xl font-bold">{data?.user?.name}</p>
        </div>

        <div className="ml-6 mt-6">
          <p className="text-neutral-600 text-[13px]">Phone number</p>
          <p className="text-[16px] mt-1"><span>+91</span><span className="ml-1">{data?.user?.mobile}</span></p>
        </div>
      </div>
    
    </div>
  );
};

export default Profile;
