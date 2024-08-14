import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, Search, RotateCcw, Edit, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EditOutletPartner from '../components/forms/EditOutletPartner';

const OutletPartnerDetails = () => {
  const navigate = useNavigate();
  const [outlet, setOutlet] = useState('Outlet');
  const [searchTerm, setSearchTerm] = useState('');
  const [outletPartners, setOutletPartners] = useState([]);
  const [editingOutletPartner, setEditingOutletPartner] = useState(null);

  const fetchOutletPartners = async (query) => {
    try {
      const response = await fetch('http://127.0.0.1:3577/outletPartners/egg-bucket-b2b/displayAll-outlet_partner' + query);
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

  const handleEditClick = (outletpartner) => {
    setEditingOutletPartner(outletpartner);
  };

  const handleCloseEdit = () => {
    setEditingOutletPartner(null);
  };

  const handleSaveEdit = async (formData) => {
    try {
      const response = await fetch(`http://127.0.0.1:3577/outletPartners/egg-bucket-b2b/update-outlet_partner/${editingOutletPartner._id}`, {
        method: 'PUT',
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        setOutletPartners(outletPartners.map(op => op._id === editingOutletPartner._id ? data : op));
        setEditingOutletPartner(null);
        alert('Outlet partner updated successfully');
      } else {
        alert('Failed to update outlet partner');
      }
    } catch (error) {
      console.error('Error updating outlet partner:', error);
      alert('Error updating outlet partner');
    }
  };

  return (
    <div className="h-full pt-7 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Outlet Partner Details</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-4 flex-grow flex flex-col">
        <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter By
            </button>
            <div className="relative">
              <select 
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm"
                value={outlet}
                onChange={(e) => setOutlet(e.target.value)}
              >
                <option>Outlet</option>
                {/* Add more outlet options if needed */}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Name"
                className="pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); fetchOutletPartners('?firstName=' + e.target.value); }}
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-blue-600">
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset Filter
            </button>
            <button onClick={() => navigate('/contact/newoutletpartner')} className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm">
              REGISTER NEW OUTLET PARTNER
            </button>
            <button className="px-3 py-2 bg-emerald-500 text-white rounded-md text-sm">
              SPREADSHEET
            </button>
          </div>
        </div>
        
        <div className="flex-grow overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2 text-sm font-semibold text-gray-600">NAME</th>
                <th className="text-left p-2 text-sm font-semibold text-gray-600">PHONE NO</th>
                <th className="text-left p-2 text-sm font-semibold text-gray-600">AADHAR NUMBER</th>
                <th className="text-left p-2 text-sm font-semibold text-gray-600">PHOTO</th>
                <th className="text-left p-2 text-sm font-semibold text-gray-600">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {outletPartners.map(partner => (
                <tr key={partner._id}>
                  <td className="text-left p-2 text-sm text-gray-600">{`${partner.firstName} ${partner.lastName}`}</td>
                  <td className="text-left p-2 text-sm text-gray-600">{partner.phoneNumber}</td>
                  <td className="text-left p-2 text-sm text-gray-600">{partner.aadharNumber || 'N/A'}</td>
                  <td className="text-left p-2 text-sm text-gray-600">
                    <img src={partner.img} alt={partner.firstName} className="w-12 h-12 object-cover rounded-md" />
                  </td>
                  <td className="text-left p-2 text-sm text-gray-600">
                    <button className='text-purple-600' onClick={() => handleEditClick(partner)}>
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
      {editingOutletPartner && (
        <EditOutletPartner 
          outletpartner={editingOutletPartner}
          onClose={handleCloseEdit}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default OutletPartnerDetails;
