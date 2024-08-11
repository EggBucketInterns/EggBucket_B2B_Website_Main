import React, { useState } from 'react';
import { Filter, ChevronDown, Search, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CustomerDetails = () => {
  const navigate = useNavigate();
  const [outlet, setOutlet] = useState('Outlet');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="h-full pt-7 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Customer Details</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-4 flex-grow flex flex-col">
        <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter By
            </button>
            <div className="relative">
              <select 
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm"
                value={outlet}
                onChange={(e) => setOutlet(e.target.value)}
              >
                <option>Outlet</option>
                <option>Outlet 1</option>
                <option>Outlet 2</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-blue-600">
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset Filter
            </button>
            <button onClick={() => navigate('/contact/newcustomer')} className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm">
             REGISTER NEW CUSTOMER
            </button>
            <button className="px-3 py-2 bg-emerald-500 text-white rounded-md text-sm">
              SPREADSHEET
            </button>
          </div>
        </div>
        
        <div className="flex-grow overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2 text-sm font-semibold text-gray-600">CID</th>
                <th className="text-left p-2 text-sm font-semibold text-gray-600">OUTLET NAME</th>
                <th className="text-left p-2 text-sm font-semibold text-gray-600">NAME</th>
                <th className="text-left p-2 text-sm font-semibold text-gray-600">ADDRESS/URL</th>
                <th className="text-left p-2 text-sm font-semibold text-gray-600">SHOP NAME</th>
                <th className="text-left p-2 text-sm font-semibold text-gray-600">PHOTO</th>
                <th className="text-left p-2 text-sm font-semibold text-gray-600">PHONE NO</th>
              </tr>
            </thead>
            <tbody>
              {/* Add table rows here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;