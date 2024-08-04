import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import io from "socket.io-client";
// https://chat-link-server.onrender.com
// http://localhost:3001
const socket = io(`https://chat-link-server.onrender.com`);
const backendUrl = `https://chat-link-server.onrender.com`;

const initialState = {
  Inputval: "",
  searchVal: "",
  receiverId: "",
  senderId: "",  
  socketMessage: [],
  serchBack: false,
  userOnlineStatus: "Offline",
  isTyping: false,
  isInComingCall:false,
  isVideoCall: false,
  isVideoCallAccepted:false,
  isVideoCallRejected: false,
  offer:''
};
const Slice = createSlice({
  name: "whatsapp",
  initialState,
  reducers: {
    handleInputVal(state, action) {
      state.Inputval = action.payload;
    },
    handleSearchUser(state, action) {
      state.searchVal = action.payload;
    },
    handleReceiverId(state, action) {
      state.receiverId = action.payload;
    },
    handleSenderId(state, action) {
      state.senderId = action.payload;
    },
    handleSocketMessage(state, action) {
      state.socketMessage = [...state.socketMessage, action.payload];
    },
    clearSocketMessages(state) {
      state.socketMessage = [];
    },
    searchBack(state) {
      state.serchBack != state.serchBack;
    },
    OnlineStatus(state, action) {
      state.userOnlineStatus = action.payload;
    },
    setTyping(state, action) {
      state.isTyping = action.payload;
    },
    inComingVideoCall(state,action){
      state.isVideoCall=action.payload;
    },
    isInComingCall(state,action){
      state.isInComingCall=action.payload
    },
    isVideoCallAccepted(state,action){
      state.isVideoCallAccepted=action.payload;
    },
    isVideoCallRejected(state,action){
      state.isVideoCallRejected=action.payload
    },
    handleOffer(state,action){
       state.offer=action.payload
    }

  },
});
export default Slice.reducer;
export { socket, backendUrl };
export const {
  handleInputVal,
  handleSearchUser,
  handleSenderId,
  handleReceiverId,
  handleSocketMessage,
  clearSocketMessages,
  searchBack,
  OnlineStatus,
  setTyping,
  inComingVideoCall,
  isVideoCallAccepted,
  isVideoCallRejected,
  isInComingCall,
  handleOffer
} = Slice.actions;
