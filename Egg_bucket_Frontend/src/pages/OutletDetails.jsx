import React, { useState, useEffect } from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';

const OutletDetails = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [outlets, setOutlets] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchOutlets = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3577/egg-bucket-b2b/get-all-outlets');
        const result = await response.json();

        if (result.status === 'success') {
          // Map API response to the required format
          const outletData = result.data.map(outlet => ({
            id: outlet._id,
            outletNumber: outlet.outletNumber,
            outletArea: outlet.outletArea,
            phoneNumber: outlet.phoneNumber,
            outletPartner: `${outlet.outletPartner.firstName} ${outlet.outletPartner.lastName}`,
            deliveryPartners: outlet.deliveryPartner.map(partner => `${partner.firstName} ${partner.lastName}`),
          }));

          setOutlets(outletData);
        } else {
          console.error('Failed to fetch outlets');
        }
      } catch (error) {
        console.error('Error fetching outlets:', error);
      }
    };

    fetchOutlets();
  }, []);

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
                  {outlet.deliveryPartners.slice(0, 3).map((partner, index) => (
                    <div key={index}>{partner}</div>
                  ))}
                  {outlet.deliveryPartners.length > 3 && <div>{outlet.deliveryPartners.length - 3} more...</div>}
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
