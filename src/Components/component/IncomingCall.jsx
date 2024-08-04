import { useState, useEffect, useRef } from "react";
import { IoCallOutline } from "react-icons/io5";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { motion } from "framer-motion";
import ringtone from "../../assets/audio/ringtone.mp3";
import useWebRTC from "../Hook/WebRtc";
import { useDispatch, useSelector } from "react-redux";
import {
  isInComingCall,
  isVideoCallAccepted,
  inComingVideoCall,
} from "../../Store/slice";
import { socket } from "../../Store/slice";
import VideoCall from "../VideoCall/VideoCall";

const IncomingCall = () => {
  const [show, setShow] = useState(true);
  const [timeLeft, setTimeLeft] = useState(5);

  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const { peer, createAnswer } = useWebRTC();
  const offer = useSelector((state) => state.offer);
  const isvideoAccepted = useSelector((state) => state.isVideoCallAccepted);

  const handleClose = () => {
    setShow(false);
    dispatch(isInComingCall(false));
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleAnswerCall = async () => {
    await createAnswer(offer);
    dispatch(inComingVideoCall(true));
    dispatch(isVideoCallAccepted(true));
    handleClose();
  };

  useEffect(() => {
    if (timeLeft === 0) {
      handleClose();
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 3000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    show && (
      <motion.div
        initial={{ opacity: 0, y: "-600px" }}
        animate={{ opacity: 1, y: "0px" }}
        transition={{
          delay: 0.1,
          duration: 0.5,
        }}
        className="w-full h-full flex justify-center"
      >
        <div className="w-[500px] z-50 h-[70px] bg-white mt-4 rounded-lg flex px-3 py-1 shadow-xl border justify-between items-center">
          <div className="flex gap-2 items-center">
            <span>
              <img
                src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRGyP54W_HZgqJlgd3T4dBfFyiZfZZuWfZz7c3zgiVBajv-LxSmQlEzpPFemzj4sKCFlyxWc63gf2ZE1tgQABvvc-_SF0_3fqRJMG97Gdg"
                className="h-10 w-10 rounded-full object-cover"
                alt="avatar"
              />
            </span>
            <span>Deepak Kr</span>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={handleAnswerCall}
              className="p-2 rounded-full bg-green-600 text-white text-2xl"
            >
              <HiOutlineVideoCamera />
            </button>
            <button
              onClick={handleClose}
              className="text-2xl text-neutral-200 rotate-[135deg] p-2 bg-[#FF0000] hover:bg-[#ff0000d3] rounded-full transition-all duration-200"
            >
              <IoCallOutline />
            </button>
          </div>
        </div>
        <audio ref={audioRef} src={ringtone} loop></audio>
      </motion.div>
    )
  );
};

export default IncomingCall;
