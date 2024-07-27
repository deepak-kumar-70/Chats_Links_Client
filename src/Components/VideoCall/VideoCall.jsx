import React, { useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { MdMicNone } from "react-icons/md";
import { CgArrowUpR } from "react-icons/cg";
import { IoCallOutline } from "react-icons/io5";
import ringtone from "../../assets/audio/ringtone.mp3";
import { useDispatch, useSelector } from "react-redux";
import { inComingVideoCall, isInComingCall } from "../../Store/slice";
import useWebRTC from "../Hook/WebRtc";
import { socket } from "../../Store/slice";
const VideoCall = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const isVideoCallAccepted = useSelector((state) => state.isVideoCallAccepted);
  const { peer } = useWebRTC;

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        if (peer) {
          stream.getTracks().forEach((track) => peer.addTrack(track, stream));
        }
      })
      .catch((err) => {
        console.error("Error accessing the camera: ", err);
      });
   
    
    if (audioRef.current) {
      audioRef.current.play();
    }

  
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        localVideoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
        localVideoRef.current.srcObject = null;
      }
      if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
        remoteVideoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
        remoteVideoRef.current.srcObject = null;
      }
    };
  }, [peer]);

  const handleEndCall = () => {
    if (window.confirm("Are you sure you want to end the call?")) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        localVideoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
        localVideoRef.current.srcObject = null;
      }
      if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
        remoteVideoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
        remoteVideoRef.current.srcObject = null;
      }
      dispatch(inComingVideoCall(false));
    }
  };

  return isVideoCallAccepted ? (
    <div className="w-[34vw] absolute inset-0 z-40 h-[95vh] bg-neutral-900 left-[35%] top-[2%] rounded-xl overflow-hidden">
      <video
        className="w-full h-full object-cover relative"
        ref={localVideoRef}
        autoPlay
        muted={false}
      ></video>
      <video
        className="w-[150px] h-[100px] object-cover top-0 right-0 absolute"
        ref={remoteVideoRef}
        autoPlay
        muted={false}
        id="remoteVideo"
      ></video>
      <div className="w-full h-[10%] flex items-center gap-1 justify-center bg-[rgba(0,0,0,0.8)] absolute bottom-0 right-0 left-0">
        <button className="text-2xl text-neutral-400 mr-2 p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-all duration-200">
          <HiOutlineVideoCamera />
        </button>
        <button className="text-2xl text-neutral-400 mr-2 p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-all duration-200">
          <MdMicNone />
        </button>
        <button className="text-2xl text-neutral-400 mr-2 p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-all duration-200">
          <CgArrowUpR />
        </button>
        <button
          className="text-2xl text-neutral-200 px-4 mr-2 p-2 bg-[#FF0000] hover:bg-[#ff0000d3] rounded-full transition-all duration-200"
          onClick={handleEndCall}
        >
          <IoCallOutline className="rotate-[135deg]" />
        </button>
      </div>
      <audio ref={audioRef} src={ringtone} loop></audio>
    </div>
  ) : (
    <div className="w-[58vw] absolute inset-0 z-40 h-[95vh] px-2 bg-neutral-900 left-[20%] top-[2%] rounded-xl overflow-hidden flex flex-col justify-between">
      <div className="w-full h-[10%] flex items-center justify-end">
        <button
          className="text-2xl text-neutral-400 mr-2 p-2 hover:bg-neutral-700 rounded-full transition-all duration-200"
          onClick={handleEndCall}
        >
          <RxCross2 />
        </button>
      </div>
      <div
        style={{
          backgroundImage: `url(https://wallpapercave.com/wp/wp10254485.jpg)`,
          backgroundRepeat: "no-repeat",
        }}
        className="bg-neutral-500 w-full h-full bg-cover rounded-xl flex justify-center flex-col items-center text-white gap-1 text-2xl"
      >
        <img
          className="h-[60px] w-[60px] rounded-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOdBB_126J0dJy3PCPirs-QNxG0-x8vwcI7Q&s"
          alt="videocall"
        />
        <p>Deepak kr</p>
        <p className="text-neutral-400 text-xl">Calling...</p>
        <div>
          <div className="h-[240px] w-[400px] mt-9 rounded-2xl overflow-hidden bg-slate-400">
            <video
              className="w-full h-full object-cover"
              ref={localVideoRef}
              autoPlay
              muted={false}
            ></video>
          </div>
        </div>
      </div>
      <div className="w-full h-[20%] flex items-center gap-1 justify-center">
        <button className="text-2xl text-neutral-400 mr-2 p-3 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-all duration-200">
          <HiOutlineVideoCamera />
        </button>
        <button className="text-2xl text-neutral-400 mr-2 p-3 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-all duration-200">
          <MdMicNone />
        </button>
        <button className="text-2xl text-neutral-400 mr-2 p-3 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-all duration-200">
          <CgArrowUpR />
        </button>
        <button
          className="text-2xl text-neutral-200 px-6 mr-2 p-3 bg-[#FF0000] hover:bg-[#ff0000d3] rounded-full transition-all duration-200"
          onClick={handleEndCall}
        >
          <IoCallOutline className="rotate-[135deg]" />
        </button>
      </div>
      <audio ref={audioRef} src={ringtone} loop></audio>
    </div>
  );
};

export default VideoCall;
