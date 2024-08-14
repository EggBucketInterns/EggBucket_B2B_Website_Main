import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FunnelIcon, ChevronDownIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { CurrencyDollarIcon, CubeIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/solid';

const OutletDashboard = () => {
  
  const [summary, setSummary] = useState({
    totalOutlets: 0,
    totalOrders: 0,
    ordersPending: 0,
    ordersCompleted: 0,
    totalAmtCollected: 0,
    ordersIntransit: 0,
    ordersCancelled: 0,
  });

  useEffect(() => {
    // Replace 'your-api-endpoint' with the actual API endpoint
    axios.get('http://127.0.0.1:3577/admin/egg-bucket-b2b/dashboard')
      .then(response => {
        setSummary(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the summary!', error);
      });
  }, []);
  
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
          value={summary.totalAmtCollected}
          icon={<CurrencyDollarIcon className="h-6 w-6 text-green-500" />}
          color="bg-green-100"
        />
        <StatCard 
          title="Total Orders"
          value= {summary.totalOrders}
          icon={<CubeIcon className="h-6 w-6 text-yellow-500" />}
          color="bg-yellow-100"
        />
        <StatCard 
          title="Orders Completed"
          value={summary.ordersCompleted}
          icon={<CheckCircleIcon className="h-6 w-6 text-green-500" />}
          color="bg-green-100"
        />
        <StatCard 
          title="Orders Pending"
          value={summary.ordersPending}
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