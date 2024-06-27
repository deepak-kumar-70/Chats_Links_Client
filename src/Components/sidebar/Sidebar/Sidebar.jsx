import ChatUsers from "../ChatUsers/ChatUsers"
import Header from "../Header/Header"
import SearchBox from "../SearchBox/SearchBox"

const Sidebar = () => {
  return (
    <div className="border-r-[1px] border-r-neutral-300 ">
    <Header/>
    <SearchBox/>
    <div className="overflow-y-auto h-[85vh] scrollbar-hidden scrollbar">
    <ChatUsers/>
    
    </div>
    </div>
  )
}

export default Sidebar