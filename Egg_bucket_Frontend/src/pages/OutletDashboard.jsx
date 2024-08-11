import React from 'react';
import { FunnelIcon, ChevronDownIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { CurrencyDollarIcon, CubeIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/solid';

const OutletDashboard = () => {
  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Outlet Dashboard</h1>
      
      {/* Filter Section */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex items-center bg-white rounded-md shadow">
          <FunnelIcon className="h-5 w-5 text-gray-400 ml-2" />
          <span className="px-3 py-2 text-sm text-gray-600">Filter By</span>
        </div>
        <div className="flex items-center bg-white rounded-md shadow">
          <span className="px-3 py-2 text-sm text-gray-600">Date</span>
          <ChevronDownIcon className="h-5 w-5 text-gray-400 mr-2" />
        </div>
        <div className="flex items-center bg-white rounded-md shadow">
          <span className="px-3 py-2 text-sm text-gray-600">Outlet</span>
          <ChevronDownIcon className="h-5 w-5 text-gray-400 mr-2" />
        </div>
        <div className="flex items-center bg-white rounded-md shadow">
          <span className="px-3 py-2 text-sm text-gray-600">Customer</span>
          <ChevronDownIcon className="h-5 w-5 text-gray-400 mr-2" />
        </div>
        <button className="flex items-center text-red-500 text-sm">
          <ArrowPathIcon className="h-4 w-4 mr-1" />
          Reset Filter
        </button>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard 
          title="Total Amount Collected"
          value="89,000"
          icon={<CurrencyDollarIcon className="h-6 w-6 text-green-500" />}
          color="bg-green-100"
        />
        <StatCard 
          title="Total Orders"
          value="10293"
          icon={<CubeIcon className="h-6 w-6 text-yellow-500" />}
          color="bg-yellow-100"
        />
        <StatCard 
          title="Orders Completed"
          value="89,000"
          icon={<CheckCircleIcon className="h-6 w-6 text-green-500" />}
          color="bg-green-100"
        />
        <StatCard 
          title="Orders Pending"
          value="2040"
          icon={<ClockIcon className="h-6 w-6 text-red-500" />}
          color="bg-red-100"
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`p-2 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default OutletDashboard;