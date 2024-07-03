import ChatUsers from "../ChatUsers/ChatUsers"
import Header from "../Header/Header"
import SearchBox from "../SearchBox/SearchBox"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { handleReceiverId } from "../../../Store/slice"
const Sidebar = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
    const id = new URLSearchParams(window.location.search).get('id');
    if(id){
      dispatch(handleReceiverId(id))
    }
    console.log(id, 'idloc');
  })
  return (
    <div className="border-r-[1px] border-r-neutral-300 ">
    <Header/>
    <SearchBox/>
    <div className="overflow-y-auto sm:h-[85vh] h-[71vh] scrollbar-hidden scrollbar pb-10">
    <ChatUsers/>
    
    </div>
    </div>
  )
}

export default Sidebar