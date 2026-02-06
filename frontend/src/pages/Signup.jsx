import { LockIcon, MailIcon, User2Icon, Eye, EyeOff } from 'lucide-react';
import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import AppContext from '../context/AppContext';

const Signup = () => {
  const {
    navigate,
    axios,
    loading,
    setLoading,
    showPassword,
    setShowPassword,
  } = useContext(AppContext);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post('/api/auth/register', formData);
      if (data.success) {
        toast.success(data.message);
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Server error';

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="py-15 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="sm:w-87.5  text-center bg-lime-50-900 border border-slate-300 rounded-2xl px-8"
      >
        <h1 className="text-black text-3xl mt-10 font-medium">Sign up</h1>

        <p className="text-gray-400 text-sm mt-2">Please sign in to continue</p>

        <div className="flex items-center mt-6 w-full bg-sky-50 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
          <User2Icon />{' '}
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full bg-transparent text-black placeholder-gray-400 border-none outline-none "
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center w-full mt-4 bg-sky-50 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
          <MailIcon />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="w-full bg-transparent text-black placeholder-gray-400 border-none outline-none "
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className=" flex items-center mt-4 w-full bg-sky-50 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
          <LockIcon />
          <input
            type={showPassword ? 'password':'text'}
            name="password"
            placeholder="Password"
            className="w-full bg-transparent text-black placeholder-gray-400 border-none outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            className="mr-3"
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          className="mt-4 w-full h-11 rounded-full text-white  bg-orange-500 hover:bg-orange-800 transition cursor-pointer "
        >
          {loading ? 'loading...' : 'Sign up'}
        </button>

        <p className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer">
          Already have an account?
          <Link to={'/login'} className="text-indigo-500 dark:text-indigo-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
