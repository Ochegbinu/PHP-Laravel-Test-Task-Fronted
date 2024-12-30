import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-full p-4">
      <ul>
        <li>
          <Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-700">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/brts" className="block py-2 px-4 hover:bg-gray-700">
            BRT List
          </Link>
        </li>
        {/* Add more sidebar links as needed */}
      </ul>
    </aside>
  );
};

export default Sidebar;
