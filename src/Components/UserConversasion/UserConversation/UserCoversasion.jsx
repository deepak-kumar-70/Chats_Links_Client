import { useState } from "react"
import Chattine from "../Chatting/Chatting"
import Header from "../Header/Header"
import WhatsappWindow from "../Chatting/WhatsappWindow"
import { useSelector } from "react-redux"



const UserCoversasion = () => {
  const [isUserChat,setUserChat]=useState(true)
  const receiverId=useSelector((state)=>state.receiverId)
  return (
    <div>
    {
      receiverId?
      <div>
      <Header/>
      <Chattine/>
      </div>:
      <div><WhatsappWindow/></div>
    }
    
    </div>

  )
}

export default UserCoversasion