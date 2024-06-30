
import { IoCallOutline } from "react-icons/io5";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { AiOutlineSearch } from "react-icons/ai";
import datas from "../../Data/UserData";
import { useSelector } from "react-redux";
import useGetApi from "../../api";
import { backendUrl } from "../../../Store/slice";
import { useEffect } from "react";
import { handleHeaderheaight } from "../../../Store/slice";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
const Header = () => {
  const divRef = useRef(null);
  const dispatch=useDispatch()
  useEffect(() => {
    if (divRef.current) {
     dispatch(handleHeaderheaight(divRef.current.offsetHeight));
    }
  }, []);
  const OnlineStatus=useSelector((state)=>state.userOnlineStatus)
  console.log(OnlineStatus)
  const receiverId=useSelector((state)=>state.receiverId)
  const apiUrl =  `${backendUrl}/user/getmyprofile/${receiverId}`;
  const { data} = useGetApi(apiUrl)
 

  return (
    <div >
      {datas
        .filter((user) => user.id === "1a")
        .map((user) => (
          <div
          ref={divRef}
            key={user.id}
            className="flex sm:h-[9.4vh] h-[8vh] items-center justify-between sm:px-5  cursor-pointer bg-[#fff] border-t-[1px] border-t-neutral-300"
          >
            <div className="flex items-center sm:gap-5 gap-2">
            <Link to='/' className="text-[1rem]  sm:hidden block">
             <IoMdArrowBack/>
            </Link>
              <div>
                <img
                  src={data?.user?.avatar}
                  className={`sm:h-[50px] sm:w-[50px] h-[35px] w-[35px] rounded-full object-cover`}
                />
              </div>

              <div>
                <div>
                  <span className="sm:text-[1rem] text-sm font-medium">{data?.user?.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600"></span>
                  <span className="text-neutral-600 sm:text-[13px] text-[10px]">{OnlineStatus}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex sm:text-xl gap-4 text-[15px] rounded-md sm:border-2">
              
                  <span className="sm:py-3 sm:px-4 sm:border-r-2 hover:bg-neutral-50">
                    <IoCallOutline />
                  </span>
                
                <div className="sm:py-3 sm:px-4  hover:bg-neutral-50">
                  <HiOutlineVideoCamera />
                </div>
              </div>
              <div className="text-[1.25rem] mr-6 sm:block hidden">
                <AiOutlineSearch />
              </div>
              <div className="text-[1rem]  sm:hidden block">
             <BsThreeDotsVertical/>
            </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Header;
