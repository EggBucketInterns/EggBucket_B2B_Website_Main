import React, { useState } from 'react';
import { Camera } from 'lucide-react';

const AddNewOutlet = () => {
  const [formData, setFormData] = useState({
    outletNumber: '128284', // Example automatic serial number
    outletArea: '',
    outletPartners: '',
    deliveryPartners: '',
    phoneNumber: '',
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
    console.log(formData);
    // Handle form submission logic here
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Add New Outlet</h1>
      
      <div className="mb-6 text-center">
        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
          <Camera className="w-8 h-8 text-gray-400" />
        </div>
        <label className="cursor-pointer text-blue-500 text-sm font-medium">
          Upload Shop Photo
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Outlet Number (automatic serial number)</label>
            <input
              type="text"
              name="outletNumber"
              value={formData.outletNumber}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Outlet Area</label>
            <input
              type="text"
              name="outletArea"
              value={formData.outletArea}
              onChange={handleChange}
              placeholder="Enter Area Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Outlet Partners</label>
            <select
              name="outletPartners"
              value={formData.outletPartners}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Outlet Parners</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Partners</label>
            <select
              name="deliveryPartners"
              value={formData.deliveryPartners}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="DP_1">DP_1</option>
              <option value="DP_2">DP_2</option>
              <option value="DP_3">DP_3</option>
            </select>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your Phone Number"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
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

export default AddNewOutlet;