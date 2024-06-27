import useGetApi from "../../api";
const Profile = () => {
  const user_id= localStorage.getItem('user_id')
  const apiUrl =  `http://localhost:3001/user/getmyprofile/${user_id}`;
const {data}=useGetApi(apiUrl)
  return (
    <div className="w-[32%] absolute inset-0 h-[70vh] bg-slate-800 z-50 left-10 flex rounded-lg mt-10 shadow-xl overflow-hidden">
      <div className="w-[30%] bg-neutral-200 h-[100%]"></div>
      <div className="w-[70%] bg-white h-full">
        <div className="w-full flex flex-col justify-center items-center gap-3 mt-10">
          <img src={data?.user?.avatar} className="w-[140px] h-[140px] rounded-full object-cover" />

          <p className="text-2xl font-bold">{data?.user?.name}</p>
        </div>

        <div className="ml-6 mt-6">
          <p className="text-neutral-600 text-[13px]">Phone number</p>
          <p className="text-[16px] mt-1"><span>+91</span><span className="ml-1">{data?.user?.mobile}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
