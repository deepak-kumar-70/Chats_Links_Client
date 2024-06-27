import wallpaper from "../../../assets/wallpaper.png";
import { IoLockClosedOutline, IoCheckmarkDone } from "react-icons/io5";
import MessageInput from "./MessageInput";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { socket } from "../../../Store";
const Chattine = () => {
  const [userData, setUserData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  const senderId = localStorage.getItem("user_id");
  const receiverId = useSelector((state) => state.receiverId);
  const socketMessage = useSelector((state) => state.socketMessage);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const Url = `http://localhost:3001/user/readChat/${senderId}/${receiverId}`;

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
    // Scroll to bottom whenever combinedData changes
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
      className="sm:w-[75%] w-full h-[91vh] bg-slate-100 bg-contain fixed flex flex-col justify-between"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div ref={chatContainerRef} className="overflow-y-auto h-[82vh]">
        <div className="w-full flex justify-center mt-4 mb-4">
          <span className="bg-neutral-200 px-2 py-1 text-[14px] text-neutral-500 rounded-sm">
            20-9-2023
          </span>
        </div>
        <div className="text-center w-full flex justify-center items-center mb-4">
          <div className="flex items-center p-1 bg-[#FFEECD] gap-3 text-neutral-700 font-thin rounded-md text-[13px]">
            <span>
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
                  className={`px-2  max-w-[50%] py-[2px] ${
                    data.senderId === senderId
                      ? "bg-[#D9FDD3] mr-[40px]"
                      : "bg-[#fff] ml-[40px]"
                  } rounded-[4px] flex items-center`}
                >
                  <span className="sm:text-[17px] text-[12px]">{data?.message}</span>
                  <span className="flex items-center gap-2 ml-5 mt-4">
                    <span className="text-[10px] text-neutral-500">
                      {formatTime(data.createdAt)}
                    </span>
                    {data.senderId === senderId && (
                      <span className="text-blue-600">
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
                  className={`mr-[40px] ml-[40px] max-h-[350px] 
 ${data.senderId === senderId ? "bg-[#D9FDD3] " : "bg-[#fff]"}
 p-2 overflow-hidden rounded-lg max-w-[350px] `}
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
      <div className="absolute inset-0 top-[91%]">
        <MessageInput showEmoji={true} />
      </div>
    </div>
  );
};

export default Chattine;
