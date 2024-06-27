import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCheckmarkDone } from "react-icons/io5";
import { clearSocketMessages, handleReceiverId, handleSocketMessage } from "../../../Store/slice";
import useGetApi from "../../api";
import { socket } from "../../../Store/slice";
import { OnlineStatus } from "../../../Store/slice";
const ChatUsers = () => {
  const [profile, setProfiles] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const searchUser = useSelector((state) => state.searchVal);
  const senderId = localStorage.getItem("user_id");
  console.log(senderId,'sen')
  const apiUrl = `http://localhost:3001/user/contactedUser/${senderId}`;
  const { data } = useGetApi(apiUrl);
  const searchBack=useSelector((state)=>state.serchBack)
  const onlineStatus=useSelector((state)=>state.userOnlineStatus)
  useEffect(() => {
   
    if (data && data.length > 0) {
      const fetchProfile = async (id) => {
        const profileUrl = `http://localhost:3001/user/getmyprofile/${id}`;
        try {
          const response = await fetch(profileUrl);
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          const profileData = await response.json();
          return profileData;
        } catch (err) {
          console.error('Error fetching profile for', id, ':', err);
          throw err;
        }
      };

      const fetchAllProfiles = async () => {
        try {
          const profilesData = await Promise.all(data.map(id => fetchProfile(id)));
          setProfiles(profilesData);
        } catch (err) {
          setError(err);
        }
      };

      fetchAllProfiles();
    }
  }, [data, senderId,searchBack]);
 
 const socketMessage=useSelector((state)=>state.socketMessage)
  const handleUserChatting = (id) => {
   
    socket.emit("userStatus",{senderId})
    dispatch(handleReceiverId(id));
    dispatch(clearSocketMessages())
  };

  return (
    <div className="p-2">
    {
      searchUser?(
        searchUser.length>0?(
          searchUser.map((user)=>(
            <UserProfile key={user._id} user={user} handleUserChatting={handleUserChatting} />
        ))
        ):(
          <div className="w-full h-[60vh] flex items-center justify-center " ><span>no match found</span></div>
        )
       
      ):(
        profile.map((user) => (
          <UserProfile key={user?.user?._id} user={user.user} handleUserChatting={handleUserChatting} />
        ))
      )
    }
     
    </div>
  );
};

const UserProfile = ({ user, handleUserChatting }) => {
  const receiverId = useSelector((state) => state.receiverId);

  return (
    <div
      onClick={() => handleUserChatting(user?._id)}
      className={`flex items-center justify-between px-5 py-3 mb-2 cursor-pointer hover:bg-neutral-100 ${
        receiverId === user?._id && 'bg-neutral-200 hover:bg-neutral-200 rounded-lg'
      }`}
    >
      <div className="flex items-center gap-3">
        <div>
          <img
            src={user.avatar}
            className="h-[50px] w-[50px] rounded-full object-cover"
            alt={user.name}
          />
        </div>
        <div>
          <div>
            <span className="text-[1rem] font-medium">
              {user.name}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-blue-600">
              <IoCheckmarkDone />
            </span>
            <span className="text-neutral-600 text-[15px]">hello</span>
          </div>
        </div>
      </div>
      <div>
        <div>
          <span className="text-neutral-600 text-[12px]">9:45 Pm</span>
        </div>
        <div className="bg-green-600 text-center text-white text-[12px] h-5 w-5 rounded-[50%] mt-1">
          <span>20</span>
        </div>
      </div>
    </div>
  );
};

export default ChatUsers;
