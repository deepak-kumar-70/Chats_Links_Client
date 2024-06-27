import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoFilterOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { handleSearchUser } from "../../../Store";
import { searchBack } from "../../../Store/slice";
const SearchBox = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchVal,setSearchVal]=useState('');

  const[data,setData]=useState('')
  const handleSeachActive = () => {
    setSearchActive(!searchActive);
  };
  const dispatch=useDispatch()

  const handleSearch=async(event)=>{
   setSearchVal(event.target.value)
   const url=`http://localhost:3001/user/searchUser?name=${searchVal}`
   try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setData(data)
     dispatch(handleSearchUser(data))
   } catch (error) {
    console.error('Error fetching data:', error);
   }
   
    
  }
  const handleSearchBack=()=>{
     dispatch(searchBack())
     setSearchVal('')
     
  }
  return (
    <div className="w-full p-3 flex items-center gap-5 ">
      <div
        onClick={handleSeachActive}
        className={`w-[90%]
         flex items-center gap-0 border-[1px] px-2 rounded-lg border-b-[1px] ${
          searchActive
            ? "border-b-[#00A884]  border-b-[2px]"
            : "border-b-[rgba(0,0,0,0.55)]"
        } `}
      >
        <div className="text-neutral-600">
       
        {!searchVal?<span><CiSearch /> </span>: <span onClick={handleSearchBack} className="text-2xl cursor-pointer"><IoIosArrowRoundBack/></span>} 
        </div>
        <input
          type="search"
          value={searchVal}
          onChange={handleSearch}
          placeholder="Search or start a new chat"
          className="w-[80%] py-1  px-3 outline-none "
        />
      </div>
      <div className="text-[1.3rem] text-neutral-700 cursor-pointer hover:bg-neutral-100 p-2 rounded-md">
      <IoFilterOutline/>
      </div>
    </div>
  );
};

export default SearchBox;
