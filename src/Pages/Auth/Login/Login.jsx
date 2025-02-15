import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notify from "../../../Components/component/Notify";
import { backendUrl } from "../../../Store/slice";

const Login = () => {
  const [mobile, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    setNotification(null);
    setLoading(true); // Set loading to true before the request
    try {
      const response = await fetch(`${backendUrl}/user/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile, password }),
        credentials: "include",
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
        }, 1000);
      }
    } catch (err) {
      setError(err.message);
      setNotification({ success: false, message: err.message });
    } finally {
      setLoading(false); // Set loading to false after the request is completed
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full h-[90vh] sm:gap-64">
      {notification && (
        <Notify success={notification.success} message={notification.message} />
      )}
      <div className="sm:block hidden">
        <img
          className="h-[80vh]"
          src="http://productivealliance.com/static/media/FAQ.05b518db2ed89321c4e9.jpg"
          alt="FAQ"
        />
      </div>
      <div className="flex flex-col items-center sm:w-[25%] w-[90%] px-5 py-5 bg-white border-2 border-neutral-300 rounded-lg z-50 h-[64vh] gap-6">
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
            disabled={loading} // Disable the button when loading
          >
            {loading ? "Loading..." : "Submit"} {/* Change text based on loading state */}
          </button>
        </div>
        <div>
          <span className="text-neutral-600 text-[14px]">Not a member?</span>
          <Link className="text-blue-700 text-[14px]" to='/singnup'>Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
