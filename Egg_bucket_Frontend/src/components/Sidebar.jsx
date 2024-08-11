import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Heart, 
  MessageSquare, 
  List, 
  Box, 
  Tag, 
  Calendar, 
  CheckSquare, 
  Users, 
  FileText, 
  Layers, 
  UserPlus, 
  Table as TableIcon, 
  Settings, 
  LogOut,
  UserCircle,
  Store, // Added for Outlet Dashboard
  Clipboard // Added for Outlet Details
} from 'lucide-react';

const MenuItem = ({ icon: Icon, text, active, onClick }) => (
  <li 
    className={`flex items-center px-4 py-2 mb-1 text-sm cursor-pointer ${active ? 'bg-blue-100 text-blue-600 rounded-lg font-medium' : 'text-gray-700 hover:bg-gray-100 rounded-lg'}`}
    onClick={onClick}
  >
    <Icon className="h-5 w-5 mr-3" />
    {text}
  </li>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, text: 'Dashboard', path: '/'},
    { icon: Store, text: 'Outlet Dashboard', path: '/outlet-dashboard' }, // Added Outlet Dashboard
    { icon: Package, text: 'Products', path: '/pack' },
    { icon: Heart, text: 'Favorites', path: '/favorites' },
    { icon: MessageSquare, text: 'Inbox', path: '/inbox' },
    { icon: List, text: 'Order Lists', path: '/order' },
    { icon: Clipboard, text: 'Outlet Details', path: '/outlet-details' }, // Added Outlet Details
    { icon: UserCircle, text: 'Customer Details', path:'/customer'},
    { icon: Box, text: 'Product Stock', path:'/stock'},
  ];

  const pageItems = [
    { icon: Tag, text: 'Pricing', path: '/pricing' },
    { icon: Calendar, text: 'Calendar', path: '/calendar' },
    { icon: CheckSquare, text: 'To-Do', path: '/todo' },
    { icon: Users, text: 'Contact', path: '/contact' },
    { icon: FileText, text: 'Invoice', path: '/invoice' },
    { icon: Layers, text: 'UI Elements', path: '/ui-elements' },
    { icon: UserPlus, text: 'Team', path: '/team' },
    { icon: TableIcon, text: 'Table', path: '/table' },
    { icon: Settings, text: 'Settings', path: '/settings' },
    { icon: LogOut, text: 'Logout', path: '/logout' },
  ];

  const handleItemClick = (path) => {
    navigate(path);
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 overflow-y-auto">
      <br />
      
      <nav>
        <ul className="px-2">
          {menuItems.map((item) => (
            <MenuItem 
              key={item.text}
              icon={item.icon} 
              text={item.text} 
              active={location.pathname === item.path}
              onClick={() => handleItemClick(item.path)}
            />
          ))}
        </ul>
        
        <div className="mt-8 mb-4 px-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">PAGES</h2>
        </div>
        
        <ul className="px-2">
          {pageItems.map((item) => (
            <MenuItem 
              key={item.text}
              icon={item.icon} 
              text={item.text} 
              active={location.pathname === item.path}
              onClick={() => handleItemClick(item.path)}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;