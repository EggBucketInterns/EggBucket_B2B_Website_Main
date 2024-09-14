import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Package, CheckCircle, Clock, TrendingUp, Coins, Truck } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalOutlets: 0,
    totalOrders: 0,
    ordersPending: 0,
    ordersCompleted: 0,
    totalAmtCollected: 0,
    ordersIntransit: 0,
    ordersCancelled: 0,
    ordersDelivered: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://eggbucket-website.onrender.com/admin/egg-bucket-b2b/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSummary(response.data);
      } catch (error) {
        console.error('There was an error fetching the summary!', error);
        if (error.response && error.response.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const navigateToOrderDetails = (status) => {
    navigate('/order-details', { state: { statusFilter: status } });
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div onClick={() => navigate('/outlet-details')} className="cursor-pointer">
          <StatCard
            title="Total Outlets"
            value={summary.totalOutlets}
            icon={<Building2 className="text-purple-500" />}
          />
        </div>
        <div onClick={() => navigateToOrderDetails('All')} className="cursor-pointer">
          <StatCard
            title='Total Orders'
            value={summary.totalOrders}
            icon={<Package className="text-yellow-500" />}
          />
        </div>
        <div onClick={() => navigateToOrderDetails('Completed')} className="cursor-pointer">
          <StatCard
            title="Orders Completed"
            value={summary.ordersCompleted}
            icon={<CheckCircle className="text-green-500" />}
          />
        </div>
        

        <div onClick={() => navigateToOrderDetails('Pending')} className="cursor-pointer">
          <StatCard
            title="Orders Pending"
            value={summary.ordersPending}
            icon={<Clock className="text-red-500" />}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div onClick={() => navigateToOrderDetails('Intransit')} className="cursor-pointer">
          <StatCard
            title="Orders Intransit"
            value={summary.ordersIntransit}
            icon={<Truck className="text-pink-500" />}
          />
        </div>
        <div onClick={() => navigateToOrderDetails('Delivered')} className="cursor-pointer">
          <StatCard
            title="Orders Delivered"
            value={summary.ordersDelivered}
            icon={<Truck className="text-pink-500" />}
          />
        </div>
        <div onClick={() => navigateToOrderDetails('Completed')} className="cursor-pointer">
          <StatCard 
            title="Total Amount Collected" 
            value={`₹${summary.totalAmtCollected}`} 
            icon={<TrendingUp className="text-green-500" />} 
          />
        </div>
        <div onClick={() => navigateToOrderDetails('Pending')} className="cursor-pointer">
          <StatCard
            title="Total Amount Pending"
            value={`₹${summary.totalAmtCollected}`}
            icon={<Coins className="text-orange-500" />}
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
      {icon}
    </div>
  </div>
);

export default Dashboard;
