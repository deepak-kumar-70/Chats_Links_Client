
import { IoCallOutline } from "react-icons/io5";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { AiOutlineSearch } from "react-icons/ai";
import datas from "../../Data/UserData";
import { useSelector } from "react-redux";
import useGetApi from "../../api";
const Header = () => {
  const OnlineStatus=useSelector((state)=>state.userOnlineStatus)
  console.log(OnlineStatus)
  const receiverId=useSelector((state)=>state.receiverId)
  const apiUrl =  `http://localhost:3001/user/getmyprofile/${receiverId}`;
  const { data} = useGetApi(apiUrl)
 

  return (
    <div>
      {datas
        .filter((user) => user.id === "1a")
        .map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between px-5 py-[7.4px] cursor-pointer bg-[#fff] border-t-[1px] border-t-neutral-300"
          >
            <div className="flex items-center gap-5">
              <div>
                <img
                  src={data?.user?.avatar}
                  className={`h-[50px] w-[50px] rounded-full object-cover`}
                />
              </div>

              <div>
                <div>
                  <span className="text-[1rem] font-medium">{data?.user?.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600"></span>
                  <span className="text-neutral-600 text-[13px]">{OnlineStatus}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex text-xl  rounded-md border-2">
              
                  <span className="py-3 px-4 border-r-2 hover:bg-neutral-50">
                    <IoCallOutline />
                  </span>
                
                <div className="py-3 px-4 hover:bg-neutral-50">
                  <HiOutlineVideoCamera />
                </div>
              </div>
              <div className="text-[1.25rem] mr-6">
                <AiOutlineSearch />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Header;
