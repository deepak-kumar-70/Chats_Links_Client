import wallpaper from "../../../assets/image/wallpaper.png";
import { IoLockClosedOutline, IoCheckmarkDone } from "react-icons/io5";
import MessageInput from "./MessageInput";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { socket } from "../../../Store";
import { backendUrl, handleReceiverId } from "../../../Store/slice";
import { useDispatch } from "react-redux";
const Chattine = () => {
  const [userData, setUserData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  const senderId = useSelector((state)=>state.senderId)
  const receiverId = useSelector((state) => state.receiverId);
  const socketMessage = useSelector((state) => state.socketMessage);
  // const headerHeight=useSelector((state)=>state.headerHeight)
  const chatContainerRef = useRef(null);
 const dispath=useDispatch()
  useEffect(() => {
  
    const Url = `${backendUrl}/user/readChat/${senderId}/${receiverId}`;

    const fetchApi = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (receiverId) {
      fetchApi(Url);
    }
  }, [senderId, receiverId]);

  useEffect(() => {
  
    setCombinedData([...userData, ...socketMessage]);
    socket.on("messageTick", (data) => {
      console.log(data, "tick");
    });
  }, [socketMessage, userData]);

  useEffect(() => {
   
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [combinedData, combinedData?.attachment]);

  const formatTime = (isoString) => {
    return moment(isoString).format(" HH:mm");
  };

  return (
    <div
     className="flex flex-col h-[91vh] bg-slate-100 bg-cover"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div ref={chatContainerRef} className="overflow-y-auto flex-1  p-2 sm:pb-3 pb-16">
        <div className="w-full flex justify-center sm:mt-4 sm:mb-4 mt-2 mb-2">
          <span className="bg-neutral-200 px-2 py-1 sm:text-[14px] text-[11px] text-neutral-500 rounded-sm">
            20-9-2023
          </span>
        </div>
        <div className="text-center w-full flex justify-center items-center sm:mb-4 mb-2">
        
          <div className="flex items-center p-1 bg-[#FFEECD] sm:gap-3 gap-1
          font-semibold leading-[13px]
           text-neutral-700 sm:font-thin rounded-md text-[9px] sm:text-[13px]">
            <span className="">
              <IoLockClosedOutline />
            </span>
            <span>
              Messages are end-to-end encrypted. No one outside of this chat,
              not even WhatsApp, can read or listen to them. Click to learn.
            </span>
          </div>
        </div>

        {combinedData.map((data, index) => (
          <div key={data._id ? data._id : index}>
            {data.message && (
              <div
                className={`w-full flex flex-col ${
                  data.senderId === senderId ? "items-end" : "items-start"
                } mt-1`}
              >
                <span
                  className={`sm:px-2  px-[10px] max-w-[68%] sm:py-[2px] py-[5px]  ${
                    data.senderId === senderId
                      ? "bg-[#D9FDD3] "
                      : "bg-[#fff]"
                  } rounded-[4px] flex items-center`}
                >
                  <span className="sm:text-[17px] text-[14px]">{data?.message}</span>
                  <span className="flex items-center sm:gap-2 gap-1 sm:ml-5 ml-1 sm:mt-4 mt-1">
                    <span className="sm:text-[10px] text-[8px] text-neutral-500">
                      {formatTime(data.createdAt)}
                    </span>
                    {data.senderId === senderId && (
                      <span className="text-blue-600 sm:text-[15px] text-[12px]">
                        <IoCheckmarkDone />
                      </span>
                    )}
                  </span>
                </span>
              </div>
            )}

            {data.attachment && (
              <div
                className={`w-full flex flex-col mt-1 mb-1 ${
                  data.senderId === senderId ? "items-end " : "items-start"
                }`}
              >
                <div
                  className={` max-h-[350px] 
 ${data.senderId === senderId ? "bg-[#D9FDD3] " : "bg-[#fff]"}
 sm:p-2 p-1 overflow-hidden rounded-lg sm:max-w-[350px] max-w-[220px]`}
                >
                  <img
                    src={data?.attachment}
                    className={`max-h-[340px] w-full object-cover `}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="sticky bottom-0 right-0 left-0">
        <MessageInput showEmoji={true} />
      </div>
    </div>
  );
};

export default Chattine;
