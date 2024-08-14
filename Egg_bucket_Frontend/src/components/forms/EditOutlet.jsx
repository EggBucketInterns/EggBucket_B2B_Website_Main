import React, { useState, useEffect } from 'react';

const EditOutlet = ({ outlet, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    outletNumber: '',
    outletArea: '',
    phoneNumber: '',
    outletPartner: '',
    deliveryPartners: [],
  });

  useEffect(() => {
    setFormData({
      outletNumber: outlet.outletNumber,
      outletArea: outlet.outletArea,
      phoneNumber: outlet.phoneNumber,
      outletPartner: outlet.outletPartner,
      deliveryPartners: outlet.deliveryPartners,
    });
  }, [outlet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDeliveryPartnerChange = (index, value) => {
    const updatedPartners = formData.deliveryPartners.map((partner, i) => 
      i === index ? value : partner
    );
    setFormData(prevState => ({
      ...prevState,
      deliveryPartners: updatedPartners
    }));
  };

  const handleAddDeliveryPartner = () => {
    setFormData(prevState => ({
      ...prevState,
      deliveryPartners: [...prevState.deliveryPartners, '']
    }));
  };

  const handleRemoveDeliveryPartner = (index) => {
    const updatedPartners = formData.deliveryPartners.filter((_, i) => i !== index);
    setFormData(prevState => ({
      ...prevState,
      deliveryPartners: updatedPartners
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.outletNumber || !formData.outletArea || !formData.phoneNumber) {
      alert("Please fill in all required fields.");
      return;
    }

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Edit Outlet</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Outlet Number</label>
              <input
                type="text"
                name="outletNumber"
                value={formData.outletNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Outlet Area</label>
              <input
                type="text"
                name="outletArea"
                value={formData.outletArea}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Outlet Partner</label>
              <input
                type="text"
                name="outletPartner"
                value={formData.outletPartner}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Partners</label>
            {formData.deliveryPartners.map((partner, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={partner}
                  onChange={(e) => handleDeliveryPartnerChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveDeliveryPartner(index)}
                  className="ml-2 text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddDeliveryPartner}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add Delivery Partner
            </button>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOutlet;
