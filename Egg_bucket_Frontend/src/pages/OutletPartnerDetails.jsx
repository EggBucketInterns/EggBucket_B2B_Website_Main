import React, { useState, useEffect } from 'react';
import { Filter, Search, RotateCcw, Edit, Delete, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OutletPartnerDetails = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [outletPartners, setOutletPartners] = useState([]);

  const fetchOutletPartners = async (query) => {
    try {
      const response = await fetch('http://127.0.0.1:3577/outletPartners/egg-bucket-b2b/displayAll-outlet_partner'+query);
      const data = await response.json();
      if (data.status === 'success') {
        setOutletPartners(data.data);
      } else {
        console.error('Error fetching outlet partners:', data);
      }
    } catch (error) {
      console.error('Error fetching outlet partners:', error);
    }
  };

  useEffect(() => {
    
    fetchOutletPartners('?firstName=');
  }, []);


  return (
    <div className="h-full pt-7 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Outlet Partner Details</h1>
      
      <div className="bg-white rounded-lg shadow p-4 flex flex-col flex-grow">
        <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100">
              <Filter className="w-4 h-4 mr-2" />
              Filter By
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name"
                className="pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                value={searchTerm}
                onChange={(e) =>{setSearchTerm(e.target.value);  fetchOutletPartners('?firstName='+e.target.value);}}
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-blue-600 hover:bg-blue-100">
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset Filter
            </button>
            <button onClick={() => navigate('/outlet-partners/new')} className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
              ADD NEW OUTLET PARTNER
            </button>
            <button className="px-3 py-2 bg-emerald-500 text-white rounded-md text-sm hover:bg-emerald-600">
              SPREADSHEET
            </button>
          </div>
        </div>
        
        <div className="overflow-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* <th className="text-left p-2 text-sm font-semibold text-gray-600">ID</th> */}
                <th className="text-left p-2 text-sm font-semibold text-gray-600">NAME</th>
                <th className="text-left p-2 text-sm font-semibold text-gray-600">PHONE NO</th>
                <th className="text-left p-2 text-sm font-semibold text-gray-600">AADHAR NUMBER</th>
                <th className="text-left p-2 text-sm font-semibold text-gray-600">PHOTO</th>
                <th className="text-left p-2 text-sm font-semibold text-gray-600">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {outletPartners.map(partner => (
                <tr key={partner._id} className="hover:bg-gray-100">
                  {/* <td className="text-left p-2 text-sm text-gray-600">{partner._id}</td> */}
                  <td className="text-left p-2 text-sm text-gray-600">{`${partner.firstName} ${partner.lastName}`}</td>
                  <td className="text-left p-2 text-sm text-gray-600">{partner.phoneNumber}</td>
                  <td className="text-left p-2 text-sm text-gray-600">{partner.aadharNumber || 'N/A'}</td>
                  <td className="text-left p-2 text-sm text-gray-600">
                    <img src={partner.img} alt={partner.firstName} className="w-12 h-12 object-cover rounded-md" />
                  </td>
                  <td>
                    <button className='text-purple-600'>
                      <Edit className='w-5 h-5'/>
                    </button>&nbsp;
                    <button className='text-red-600'>
                      <Trash className='w-5 h-5'/>
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

export default OutletPartnerDetails;
