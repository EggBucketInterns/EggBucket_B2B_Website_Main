import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import {
  FunnelIcon,
  ChevronDownIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import {
  CurrencyDollarIcon,
  CubeIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

const OutletDashboard = () => {
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

  const [outlets, setOutlets] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [outletFilter, setOutletFilter] = useState("Outlet");
  const [customerFilter, setCustomerFilter] = useState("Customer");

  const navigate = useNavigate(); // Initialize navigate

  // Fetch the list of outlets
  useEffect(() => {
    const fetchOutlets = async () => {
      try {
        const response = await axios.get(
          "https://eggbucket-website.onrender.com/egg-bucket-b2b/get-all-outlets"
        );
        setOutlets(response.data.data); // Adjust based on response structure
      } catch (error) {
        console.error("Error fetching outlets:", error);
      }
    };
    fetchOutlets();
  }, []);

  // Fetch the list of customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "https://eggbucket-website.onrender.com/customers/egg-bucket-b2b/getAllCustomer"
        );
        setCustomers(response.data); // Adjust based on response structure
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  // Fetch summary data with filters
  useEffect(() => {
    const fetchSummary = async () => {
      let url =
        "https://eggbucket-website.onrender.com/admin/egg-bucket-b2b/dashboard";
      const filters = [];

      // Apply outlet filter
      if (outletFilter !== "Outlet") {
        const selectedOutlet = outlets.find(
          (outlet) => `Outlet ${outlet.outletArea}` === outletFilter
        );
        if (selectedOutlet) {
          filters.push(`outletId=${selectedOutlet._id}`);
        }
      }

      // Apply customer filter
      if (customerFilter !== "Customer") {
        const selectedCustomer = customers.find(
          (customer) => `Customer ${customer.customerId}` === customerFilter
        );
        if (selectedCustomer) {
          filters.push(`customerId=${selectedCustomer._id}`);
        }
      }

      // Add filters to URL
      if (filters.length) {
        url += `?${filters.join("&")}`;
      }

      try {
        const response = await axios.get(url);
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };

    fetchSummary();
  }, [outletFilter, customerFilter, outlets, customers]);

  // Handle navigation on card click
  const handleCardClick = (statusFilter) => {
    let filters = { statusFilter };
    
    // Add outlet filter to navigation state if selected
    if (outletFilter !== "Outlet") {
      filters.outletFilter = outletFilter.split(" ")[1]; // Extract outlet name
    }
    
    navigate("/order-details", { state: filters });
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Outlet Dashboard</h1>

      {/* Filter Section */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex items-center bg-white rounded-md shadow">
          <FunnelIcon className="h-5 w-5 text-gray-400 ml-2" />
          <span className="px-3 py-2 text-sm text-gray-600">Filter By</span>
        </div>

        {/* Outlet Filter Dropdown */}
        <FilterDropdown
          value={outletFilter}
          onChange={setOutletFilter}
          options={[
            "Outlet",
            ...outlets.map((outlet) => `Outlet ${outlet.outletArea}`),
          ]}
        />

        {/* Customer Filter Dropdown */}
        <FilterDropdown
          value={customerFilter}
          onChange={setCustomerFilter}
          options={[
            "Customer",
            ...customers.map((customer) => `Customer ${customer.customerId}`),
          ]}
        />

        <button
          className="flex items-center text-red-500 text-sm"
          onClick={() => {
            setOutletFilter("Outlet");
            setCustomerFilter("Customer");
          }}
        >
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
          onClick={() => handleCardClick("Completed")} // Navigate to order details with 'Completed' status
        />
        <StatCard
          title="Total Orders"
          value={summary.totalOrders}
          icon={<CubeIcon className="h-6 w-6 text-yellow-500" />}
          color="bg-yellow-100"
          onClick={() => handleCardClick("All")} // Navigate to all order details
        />
        <StatCard
          title="Orders Completed"
          value={summary.ordersCompleted}
          icon={<CheckCircleIcon className="h-6 w-6 text-green-500" />}
          color="bg-green-100"
          onClick={() => handleCardClick("Completed")} // Navigate to order details with 'Completed' status
        />
        <StatCard
          title="Orders Pending"
          value={summary.ordersPending}
          icon={<ClockIcon className="h-6 w-6 text-red-500" />}
          color="bg-red-100"
          onClick={() => handleCardClick("Pending")} // Navigate to order details with 'Pending' status
        />
        <StatCard
          title="Orders Delivered"
          value={summary.ordersDelivered}
          icon={<ClockIcon className="h-6 w-6 text-yellow-500" />}
          color="bg-red-100"
          onClick={() => handleCardClick("Delivered")} // Navigate to order details with 'Pending' status
        />
      </div>
    </div>
  );
};

const FilterDropdown = ({ value, onChange, options }) => (
  <div className="relative">
    <select
      className="appearance-none bg-white border border-gray-200 rounded-md py-2 pl-4 pr-8 text-sm font-medium"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <ChevronDownIcon className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

const StatCard = ({ title, value, icon, color, onClick }) => (
  <div
    className="bg-white p-6 rounded-lg shadow-sm cursor-pointer"
    onClick={onClick}
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className={`p-2 rounded-full ${color}`}>{icon}</div>
    </div>
  </div>
);

export default OutletDashboard;
