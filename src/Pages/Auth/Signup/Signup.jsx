import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Notify from '../../../Components/component/Notify';
import { backendUrl } from '../../../Store/slice';

const Signup = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before the request

    const formData = new FormData();
    formData.append('name', name);
    formData.append('mobile', mobile);
    formData.append('password', password);
    formData.append('avatar', avatar);

    try {
      const response = await fetch(`${backendUrl}/user/Resister`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Account created successfully');
        localStorage.setItem("user_id", result.user._id);
        localStorage.setItem("token", result.token);
        setNotification({ success: true, message: "Account created successfully" });
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setMessage(result.message);
        setNotification({ success: false, message: result.message });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Internal server error');
      setNotification({ success: false, message: 'Internal server error' });
    } finally {
      setLoading(false); // Set loading to false after the request is completed
    }
  };

  return (
    <div className="w-full relative h-[90vh] flex justify-center gap-64 items-center">
      {notification && (
        <Notify success={notification.success} message={notification.message} />
      )}
      <div className='sm:block hidden'>
        <img className="h-[80vh]" src="http://productivealliance.com/static/media/FAQ.05b518db2ed89321c4e9.jpg" alt="Signup" />
      </div>
      <div className="px-5 sm:w-[25%] w-[90%] bg-white z-50 border-neutral-300 border-2 h-[66vh] py-5 rounded-lg flex flex-col gap-7">
        <div className="text-center mb-2 text-2xl font-semibold">
          <h4>Contact with us</h4>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <div>
            <input
              type="text"
              className="outline-none bg-neutral-100 border-2 w-full py-2 px-3 border-neutral-200 rounded-md"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              className="outline-none bg-neutral-100 w-full py-2 px-3 border-2 border-neutral-200 rounded-md"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              className="outline-none bg-neutral-100 w-full py-2 px-3 border-2 border-neutral-200 rounded-md"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="file"
              className="outline-none bg-neutral-100 w-full py-2 px-3 border-2 border-neutral-200 rounded-md"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"} 
            </button>
          </div>
          <div>
            <span className="text-neutral-600 text-[14px]">Already have account?</span>
            <Link className="text-blue-700 text-[14px]" to='/login'>Login</Link>
          </div>
        </form>
        {message && <div className="text-center mt-2 text-red-500">{message}</div>}
      </div>
    </div>
  );
};

export default Signup;
