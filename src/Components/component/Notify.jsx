import { RxCross1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Notify = ({ success,  message }) => {
  const [show, setShow] = useState(true);
  const [timeLeft, setTimeLeft] = useState(5); 

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setShow(false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000); 

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    show && (
      <motion.div
        initial={{ opacity: 0, y: '-600px' }}
        animate={{ opacity: 1, y: '0px' }}
        transition={{
          delay: 0.1,
          duration: 0.5,
        }}
        className={`h-[110px] top-10 absolute inset-0 border left-[40%] z-[10000] w-[400px] bg-white rounded-lg shadow-lg px-4 py-4
          ${success ? 'border-green-600' : 'border-red-600'}
          `}
      >
        <div className="w-full flex justify-end">
          <span
            className="px-3 py-3 text-neutral-600 rounded-full bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
            onClick={handleClose}
          >
            <RxCross1 />
          </span>
        </div>
        <div className="w-full flex items-center gap-5 ">
          <span className={`px-3 py-3 text-white rounded-full ${success ? 'bg-green-600' : 'bg-red-600'}`}>
            {success ? <FaCheck /> : <RxCross1 />}
          </span>
          <span className={`text-xl ${success ? 'text-green-600' : 'text-red-600'}`}>
          {message}
          </span>
          <span className="px-3 py-3 text-neutral-700 text-sm rounded-full ">
        
         </span>
        </div>
       
      </motion.div>
    )
  );
};

export default Notify;
