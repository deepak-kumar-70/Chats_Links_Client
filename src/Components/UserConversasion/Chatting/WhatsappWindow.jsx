import { FaWhatsapp } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";
const WhatsappWindow = () => {
  return (
    <div className="w-full h-[100vh] bg-white flex justify-center items-center flex-col">
      <div className="h-[90%]  flex justify-center items-center">
        <div className="flex flex-col items-center ">
          <span className="text-[5rem] text-neutral-300">
            <FaWhatsapp />
          </span>
          <span className="text-xl mt-3">WhatsApp for Windows</span>
          <span className="text-[14px] text-neutral-500 mt-3">
            Send and receive any messages without keeping your phone online
          </span>
          <span className="text-[15px] text-neutral-500">
            Use whatsApp up to 4 linked devices and 1 phone at the same time
          </span>
        </div>
      </div>
      <div className="h-[10%] w-full flex justify-center items-center">
        <div className="flex items-center p-1 bg-neutral-100 gap-3 text-neutral-400 font-thin rounded-md text-[13px]">
          <span>
            <IoLockClosedOutline />
          </span>
          <span>End-to-end encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default WhatsappWindow;
