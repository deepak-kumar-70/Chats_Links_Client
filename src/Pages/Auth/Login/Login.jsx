import  { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notify from "../../../Components/component/Notify";

const Login = () => {
  const [mobile, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null); // State for notification
  const navigate = useNavigate();
  useEffect(()=>{
    const senderId= localStorage.getItem('user_id')
    if(!senderId){
     alert('please login to access all routes')
    }
  },[])
  const handleLogin = async () => {
    setError(null); // Reset error state before new request
    setNotification(null); // Reset notification state before new request
    try {
      const response = await fetch("http://localhost:3001/user/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile, password }),
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      if (data) {
        localStorage.setItem("user_id", data.user._id);
        localStorage.setItem("token", data.token);
        setNotification({ success: true, message: "Login successful" }); 
        setTimeout(() => {
          navigate('/');
        }, 3000); 
      }
    } catch (err) {
      setError(err.message);
      setNotification({ success: false, message: err.message }); // Set error notification
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full h-[90vh] gap-64">
      {notification && (
        <Notify success={notification.success} message={notification.message} />
      )}
      <div>
        <img
          className="h-[80vh]"
          src="http://productivealliance.com/static/media/FAQ.05b518db2ed89321c4e9.jpg"
          alt="FAQ"
        />
      </div>
      <div className="flex flex-col items-center w-[25%] px-5 py-5 bg-white border-2  border-neutral-300 rounded-lg z-50 h-[64vh] gap-6">
        <div className="text-3xl font-bold text-center mb-2">
          <h4>Login</h4>
        </div>

        {error && <div className="text-red-500">{error}</div>}
       

        <div className="w-[90%]">
          <input
            className="w-full px-3 py-2 bg-neutral-100 border-2 border-neutral-200 rounded-md outline-none"
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        <div className="w-[90%]">
          <input
            className="w-full px-3 py-2 bg-neutral-100 border-2 border-neutral-200 rounded-md outline-none mb-2"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="mt-3 ml-1 text-[14px] text-neutral-500 font-normal cursor-pointer">
            forget password?
          </span>
        </div>
        <div className="w-[90%]">
          <button
            className="w-full py-2 text-white bg-black rounded-md"
            onClick={handleLogin}
          >
            Submit
          </button>
        </div>
        <div>
          <span className="text-neutral-600 text-[14px]">Not a member?</span>
          <Link className="text-blue-700 text-[14px]" to='/'>Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
