import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Search, Filter, ChevronDown, RotateCcw } from "lucide-react";
import * as XLSX from 'xlsx'; // Import xlsx

const OrderDetails = () => {
  const location = useLocation();
  const initialStatusFilter = location.state?.statusFilter || "Status";

  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("Date");
  const [outletFilter, setOutletFilter] = useState("Outlet");
  const [customerFilter, setCustomerFilter] = useState("Customer");
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter);
  const [startDate, setStartDate] = useState("");  // New state for start date
  const [endDate, setEndDate] = useState("");      // New state for end date
  const [orders, setOrders] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Fetch the list of outlets
  useEffect(() => {
    const fetchOutlets = async () => {
      try {
        const response = await fetch(
          "http://localhost:3577/egg-bucket-b2b/get-all-outlets"
        );
        const data = await response.json();
        if (data.status === "success") {
          setOutlets(data.data);
        }
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
        const response = await fetch(
          "http://localhost:3577/customers/egg-bucket-b2b/getAllCustomer"
        );
        const data = await response.json();
        if (data) {
          setCustomers(data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  // Fetch filtered orders based on selected filters
  useEffect(() => {
    const fetchFilteredOrders = async () => {
      let url = "http://localhost:3577/orders/egg-bucket-b2b/getAllOrder";
      const filters = [];

      if (outletFilter !== "Outlet") {
        const selectedOutlet = outlets.find(
          (outlet) => `${outlet.outletArea}` === outletFilter
        );
        if (selectedOutlet) {
          filters.push(`outletId=${selectedOutlet._id}`);
        }
      }

      if (customerFilter !== "Customer") {
        const selectedCustomer = customers.find(
          (customer) => `Customer ${customer.customerId}` === customerFilter
        );
        if (selectedCustomer) {
          filters.push(`customerId=${selectedCustomer._id}`);
        }
      }

      if (statusFilter !== "Status" && statusFilter !== "All") {
        filters.push(`status=${statusFilter.toLowerCase()}`);
      }

      // Apply date filter
      if (startDate) {
        filters.push(`createdAt[gte]=${startDate}`);
      }
      if (endDate) {
        filters.push(`createdAt[lte]=${endDate}`);
      }

      if (filters.length) {
        url += `?${filters.join("&")}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching filtered orders:", error);
      }
    };

    fetchFilteredOrders();
  }, [outletFilter, customerFilter, statusFilter, outlets, customers, startDate, endDate]);

  const resetFilters = () => {
    setDateFilter("Date");
    setOutletFilter("Outlet");
    setCustomerFilter("Customer");
    setStatusFilter("Status");
    setStartDate("");  // Reset start date
    setEndDate("");    // Reset end date
  };

  const handleDelete = async (orderId) => {
    const confirmed = window.confirm("Are you sure you want to delete this order?");
    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:3577/orders/egg-bucket-b2b/order/${orderId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
        alert('Order deleted successfully!')
      } else {
        console.error("Failed to delete the order");
        alert('Order is not in pending or intransit state!')
      }
    } catch (error) {
      console.error("Error deleting the order:", error);
      alert('Something went wrong..')
    }
  };

  const exportToSpreadsheet = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      orders.map(order => ({
        Outlet: order.outletId ? `${order.outletId.outletArea} (ID: ${order.outletId.outletNumber})` : "N/A",
        Customer: order.customerId ? order.customerId.customerId : "N/A",
        "Number of Trays": order.numTrays,
        "Delivery Partner": order.deliveryId ? order.deliveryId.firstName : "N/A",
        "Amount Collected": `₹${order.amount}`,
        Status: order.status
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    XLSX.writeFile(workbook, "Orders.xlsx");
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders Details</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 flex-grow flex flex-col">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <FilterDropdown
            value={outletFilter}
            onChange={setOutletFilter}
            options={[
              "Outlet",
              ...outlets.map((outlet) => `${outlet.outletArea}`),
            ]}
          />
          <FilterDropdown
            value={customerFilter}
            onChange={setCustomerFilter}
            options={[
              "Customer",
              ...customers.map((customer) => `Customer ${customer.customerId}`),
            ]}
          />
          <FilterDropdown
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              "Status",
              "Intransit",
              "Pending",
              "Cancelled",
              "Completed",
              "Delivered"
            ]}
          />
          <FilterDropdown
            value={dateFilter}
            onChange={setDateFilter}
            options={["Date", "Choose Start & End Dates"]}
          />
          {dateFilter === "Choose Start & End Dates" && (
            <div className="flex items-center gap-4">
              <div>
                <label className="text-sm font-medium">Start Date</label>
                <input
                  type="date"
                  className="ml-2 p-2 border rounded"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">End Date</label>
                <input
                  type="date"
                  className="ml-2 p-2 border rounded"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          )}

          <button
            className="flex items-center px-4 py-2 text-orange-600 font-medium text-sm"
            onClick={resetFilters}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Filter
          </button>
          <button className="px-10 py-2 bg-emerald-500 text-white rounded-md text-sm" onClick={exportToSpreadsheet}>
              EXPORT TO SPREADSHEET
          </button>
        </div>

        <div className="flex-grow overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-medium text-gray-600">
                {/* <th className="p-4">Order ID</th> */}
                <th className="p-4">Outlet</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Trays</th>
                <th className="p-4">Delivery Partner</th>
                <th className="p-4">Amount Collected</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter((order) => order._id.includes(searchTerm))
                .map((order) => (
                  <tr key={order._id} className="border-b text-sm text-gray-700">
                    {/* <td className="p-4">{order._id}</td> */}
                    <td className="p-4">
                      {order.outletId
                        ? `${order.outletId.outletArea} (ID: ${order.outletId.outletNumber})`
                        : "N/A"}
                    </td>
                    <td className="p-4">
                      {order.customerId ? order.customerId.customerId : "N/A"}
                    </td>
                    <td className="p-4">{order.numTrays}</td>
                    <td className="p-4">
                      {order.deliveryId ? order.deliveryId.firstName : "N/A"}
                    </td>
                    <td className="p-4">₹{order.amount}</td>
                    <td className="p-4">{order.status}</td>
                    <td className="p-4">
                      <button
                        className="text-red-500"
                        onClick={() => handleDelete(order._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const FilterDropdown = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        className="flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium bg-white text-gray-600 hover:bg-gray-100 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value} <ChevronDown className="w-4 h-4 ml-2" />
      </button>
      {isOpen && (
        <div className="absolute mt-2 py-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
