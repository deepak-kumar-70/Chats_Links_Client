import React, { useState, useEffect } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoMdAttach } from "react-icons/io";
import { LuMic } from "react-icons/lu";
import EmojiPicker from "emoji-picker-react";
import { TfiGallery } from "react-icons/tfi";
import { VscSend } from "react-icons/vsc";
import { socket } from "../../../Store";
import { useSelector, useDispatch } from "react-redux";
import { OnlineStatus, handleSocketMessage } from "../../../Store/slice";

const MessageInput = ({ showEmoji }) => {
  const [isEmojiVisible, setEmojiVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isDocumentVisible, setDocumentVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const onlineStatus = useSelector((state) => state.userOnlineStatus);
  const receiverId = useSelector((state) => state.receiverId);
  const dispatch = useDispatch();
  const senderId = localStorage.getItem("user_id");

  useEffect(() => {
    const handleMessage = (msgData) => {
      dispatch(handleSocketMessage(msgData));
    };

    const handleUserStatus = (data) => {
      console.log(data.status, "on");
      dispatch(OnlineStatus(data?.status));
    };

    socket.on("userStatus", handleUserStatus);

    socket.emit("findUser", { senderId, receiverId });
    socket.on("send message", handleMessage);

    return () => {
      socket.off("send message", handleMessage);
    };
  }, [dispatch, receiverId, senderId]);

  const handleEmojiClick = (event) => {
    const emoji = event.emoji;
    setMessage((prevText) => prevText + emoji);
    setEmojiVisible(false);
  };

  const sendMessage = async () => {
    if (!message && !file) return;

    const formData = new FormData();
    formData.append('message', message);
    formData.append('receiverId', receiverId);
    formData.append('senderId', senderId);
    if (file) {
      formData.append('attachment', file);
    }

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
    setSelectedImage(null);
      socket.emit("send message", data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }

    setFile(null);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleOnChange = (e) => {
    setMessage(e.target.value);
    socket.emit("typing", { val: e.target.value, receiverId });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setDocumentVisible(false);
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
    }
  };

  return (
    <div className="w-full px-5 py-3 bg-white border-t-[1px] border-t-neutral-300 flex items-center justify-between">
      <div className="flex items-center gap-7 w-[90%] cursor-pointer">
        {showEmoji && (
          <span onClick={() => setEmojiVisible(!isEmojiVisible)}>
            <BsEmojiSmile />
          </span>
        )}
        {isEmojiVisible && (
          <div className="absolute bottom-16">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        <span
          className="rotate-45"
          onClick={() => setDocumentVisible(!isDocumentVisible)}
        >
          <IoMdAttach />
        </span>
        {isDocumentVisible && (
          <div className="px-3 py-2 bg-white absolute bottom-[60px] rounded-md shadow-lg">
            <label
              htmlFor="file-input"
              className="relative cursor-pointer mt-10"
            >
              <input
                type="file"
                id="file-input"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="text-[15px] flex gap-2 items-center">
                <TfiGallery />
                <span>Photos & videos</span>
              </span>
            </label>
          </div>
        )}
        {selectedImage && (
          <div className="absolute bottom-[10vh] h-[45vh] w-[30vw] bg-white py-3">
            <img src={selectedImage} className="h-[35vh] w-full object-cover" alt="selected" />
            <div className="w-full flex justify-end items-center mt-2">
              <span
                onClick={sendMessage}
                className="text-xl mr-6 cursor-pointer text-white px-3 py-3 bg-green-700 rounded-full"
              >
                <VscSend />
              </span>
            </div>
          </div>
        )}
        <span className="w-[90%]">
          <input
            placeholder="Type a message"
            value={message}
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
            className="px-2 py-1 w-full outline-none"
          />
        </span>
      </div>
      <div>
        {message ? (
          <span
            onClick={sendMessage}
            className="text-xl text-neutral-800 cursor-pointer"
          >
            <VscSend />
          </span>
        ) : (
          <span className="text-xl text-neutral-800">
            <LuMic />
          </span>
        )}
      </div>
    </div>
  );
};

export default MessageInput;
