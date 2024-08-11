import React, { useState } from 'react';
import { Camera } from 'lucide-react';

const AddNewCustomer = () => {
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    businessName: '',
    locationUrl: '',
    phoneNumber: '',
    outlet: 'Male', // Default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Add New Customer</h1>
      
      <div className="mb-6 text-center">
        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
          <Camera className="w-8 h-8 text-gray-400" />
        </div>
        <label className="cursor-pointer text-blue-500 text-sm font-medium">
          Upload Customer Photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                console.log("Selected file:", file);
                // Handle the selected file here
              }
            }}
          />
        </label>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer ID</label>
            <input
              type="text"
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              placeholder="Enter Customer ID"
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">make it automatic</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter your Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Enter Business Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location URL/Address</label>
            <input
              type="text"
              name="locationUrl"
              value={formData.locationUrl}
              onChange={handleChange}
              placeholder="Enter URL"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Outlet</label>
            <select
              name="outlet"
              value={formData.outlet}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Male">#Outlet 1</option>
              <option value="Female">#Outlet 2</option>
              <option value="Other">#Outlet 3</option>
            </select>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Now
        </button>
      </form>
    </div>
  );
};

export default AddNewCustomer;