import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppContext from './AppContext';
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(() => {
    return localStorage.getItem('admin') === 'true';
  });
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/api/category/all');
      if (data.success) {
        setCategories(data.categories);
      } else {
        console.log('Failed to fetch categories');
      }
    } catch (error) {
      console.log(error);
    }
  };
 const fetchMenus = async () => {
   try {
     const { data } = await axios.get('/api/menu/all');

     if (data.success) {
       setMenus(data.menuItems);
     } else {
       console.log('Failed to fetch menus');
     }
   } catch (error) {
     console.log('Error fetching menus:', error);
   }
 };


  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await axios.get('/api/auth/is-auth');
        if (data.success) {
          setUser(data.user);
        }

        await fetchCategories();
        await fetchMenus();
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, []);
  const value = {
    navigate,
    loading,
    setLoading,
    user,
    setUser,
    axios,
    showPassword,
    setShowPassword,
    admin,
    setAdmin,
    categories,
    fetchCategories,
    menus,
    fetchMenus,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
