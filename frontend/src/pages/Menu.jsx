import { useContext, useState } from 'react';
import { Search, X } from 'lucide-react';
import MenuCard from '../components/MenuCard';
import AppContext from '../context/AppContext';

const Menu = () => {
  const { menus = [] } = useContext(AppContext); // safety default

  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Always show all menus first, then filter when typing
  const filteredMenus =
    searchQuery.trim() === ''
      ? menus
      : menus.filter((menu) =>
          menu.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  const handleClearSearch = () => setSearchQuery('');

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-50">
      {/* ===== Header ===== */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">
          Our <span className="text-yellow-500">Menu</span>
        </h1>

        <p className="text-gray-600 mb-6">
          Explore our delicious range of handcrafted dishes prepared with the
          finest ingredients
        </p>

        {/* ===== Search Bar ===== */}
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

          <input
            type="text"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3 rounded-full border focus:border-yellow-500 outline-none shadow"
          />

          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* ===== Result Count ===== */}
      <p className="text-center text-gray-600 mb-8">
        Showing {filteredMenus.length}{' '}
        {filteredMenus.length === 1 ? 'dish' : 'dishes'}
      </p>

      {/* ===== Menu Grid ===== */}
      {filteredMenus.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMenus.map((menu) => (
            <MenuCard key={menu._id} menu={menu} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No dishes found</div>
      )}
    </div>
  );
};

export default Menu;
