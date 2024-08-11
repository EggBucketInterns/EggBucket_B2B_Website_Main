import React, { useState } from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';

const OutletDetails = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - replace with your actual data source
  const outlets = [
    {
      id: 1,
      outletNumber: '13646',
      outletArea: 'JP Nagar',
      phoneNumber: '1234567898',
      outletPartner: 'Name1',
      deliveryPartners: ['Name1', 'Name1', 'Name1', 'Name1'],
    },
    // Add more outlet objects as needed
  ];

  const filteredOutlets = outlets.filter(outlet =>
    Object.values(outlet).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Outlet Details</h1>
      
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3">Outlet Number</th>
              <th className="px-6 py-3">Outlet Area</th>
              <th className="px-6 py-3">Phone Number</th>
              <th className="px-6 py-3">Outlet Partner</th>
              <th className="px-6 py-3">Delivery Partners</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOutlets.map((outlet) => (
              <tr key={outlet.id}>
                <td className="px-6 py-4 whitespace-nowrap">{outlet.outletNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{outlet.outletArea}</td>
                <td className="px-6 py-4 whitespace-nowrap">{outlet.phoneNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{outlet.outletPartner}</td>
                <td className="px-6 py-4">
                  {outlet.deliveryPartners.map((partner, index) => (
                    <div key={index}>{partner}</div>
                  ))}
                  {outlet.deliveryPartners.length > 3 && <div>Name1 ...</div>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OutletDetails;