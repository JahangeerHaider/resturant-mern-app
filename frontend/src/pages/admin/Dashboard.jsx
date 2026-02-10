import { useContext, useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import AppContext from '../../context/AppContext';

const Logo = () => (
  <div className="flex items-center space-x-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-orange-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 10h18M3 6h18M3 14h18M3 18h18"
      />
    </svg>
    <span className="text-2xl font-bold text-black">Ordify</span>
  </div>
);

const Dashboard = () => {
  const { axios } = useContext(AppContext);

  const [stats, setStats] = useState({
    orders: 0,
    bookings: 0,
    categories: 0,
    menus: 0,
  });

  const [ordersData, setOrdersData] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);
  const [activeChart, setActiveChart] = useState('orders');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ordersRes, bookingsRes, categoriesRes, menusRes] =
          await Promise.all([
            axios.get('/api/order/orders'),
            axios.get('/api/booking/all-bookings'),
            axios.get('/api/category/all'),
            axios.get('/api/menu/all'),
          ]);

        // Fix: bookings key might be plural
        const bookingsArray = bookingsRes.data.bookings || [];

        setStats({
          orders: ordersRes.data.orders?.length || 0,
          bookings: bookingsArray.length,
          categories: categoriesRes.data.categories?.length || 0,
          menus: menusRes.data.menuItems?.length || 0,
        });

        // Orders graph
        const ordersGraph =
          ordersRes.data.orders?.reduce((acc, order) => {
            const date = new Date(order.createdAt).toLocaleDateString('en-GB');
            const found = acc.find((d) => d.date === date);
            if (found) {
              found.orders += 1;
            } else {
              acc.push({ date, orders: 1 });
            }
            return acc;
          }, []) || [];
        ordersGraph.sort((a, b) => new Date(a.date) - new Date(b.date));
        setOrdersData(ordersGraph);

        // Bookings graph
        const bookingsGraph =
          bookingsArray?.reduce((acc, booking) => {
            const date = new Date(booking.createdAt).toLocaleDateString(
              'en-GB',
            );
            const found = acc.find((d) => d.date === date);
            if (found) {
              found.bookings += 1;
            } else {
              acc.push({ date, bookings: 1 });
            }
            return acc;
          }, []) || [];
        bookingsGraph.sort((a, b) => new Date(a.date) - new Date(b.date));
        setBookingsData(bookingsGraph);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchStats();
  }, [axios]);

  // Prepare dummy data for categories/menus chart
  const categoriesData = [{ name: 'Categories', value: stats.categories }];
  const menusData = [{ name: 'Menus', value: stats.menus }];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Logo */}
      <div className="mb-6">
        <Logo />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {['orders', 'bookings', 'categories', 'menus'].map((type) => (
          <div
            key={type}
            className={`bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition cursor-pointer ${
              activeChart === type ? 'border-2 border-orange-500' : ''
            }`}
            onClick={() => setActiveChart(type)}
          >
            <h2 className="text-xl font-semibold capitalize">{type}</h2>
            <p className="text-3xl font-bold text-orange-500">{stats[type]}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 capitalize">
          {activeChart} Over Time
        </h2>

        {activeChart === 'orders' && ordersData.length === 0 && (
          <p className="text-gray-500 text-center">No orders yet</p>
        )}
        {activeChart === 'bookings' && bookingsData.length === 0 && (
          <p className="text-gray-500 text-center">No bookings yet</p>
        )}
        {(activeChart === 'orders' && ordersData.length > 0) ||
        (activeChart === 'bookings' && bookingsData.length > 0) ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={activeChart === 'orders' ? ordersData : bookingsData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={activeChart} // orders or bookings
                stroke="#FF6B00"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : null}

        {/* Categories or Menus bar chart */}
        {(activeChart === 'categories' || activeChart === 'menus') && (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={activeChart === 'categories' ? categoriesData : menusData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#FF6B00"
                barSize={50}
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
