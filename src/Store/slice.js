import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import io from "socket.io-client";
const senderId = localStorage.getItem("user_id");
const socket = io(`http://localhost:3001/`);


const initialState = {
    Inputval:'',
    searchVal:'',
    receiverId:'',
    senderId:'',
    socketMessage:[],
    serchBack:false,
    userOnlineStatus:'Offline'
};
const Slice = createSlice({
  name: "whatsapp",
  initialState,
  reducers: {
    handleInputVal(state,action){
      state.Inputval=action.payload
  },
    handleSearchUser(state,action){
      state.searchVal=action.payload
  },
    handleReceiverId(state,action){
      state.receiverId=action.payload
  },
    handleSenderId(state,action){
      state.senderId=action.payload
  },
    handleSocketMessage(state,action){
      state.socketMessage = [...state.socketMessage, action.payload];
  },
    clearSocketMessages(state) {
    state.socketMessage = [];
  },
    searchBack(state){
     state.serchBack!=state.serchBack
  },
    OnlineStatus(state,action){
      state.senderId=action.payload
  }
  },
});
export default Slice.reducer;
export {socket}
export const {
 handleInputVal,
 handleSearchUser,
 handleSenderId,
 handleReceiverId,
 handleSocketMessage,
 clearSocketMessages,
 searchBack,
 OnlineStatus,
}=Slice.actions
