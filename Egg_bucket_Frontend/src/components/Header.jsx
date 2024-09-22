import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import logo from "../assets/images/logo-egg.jpg";
import { useNavigate } from 'react-router-dom';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  // Handlers to open and close the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Function to show the confirmation message and auto-hide it after 3 seconds
  const showConfirmation = (message) => {
    
    alert(message)
  };

  // Handler for form submission
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showConfirmation("New Password and Confirm Password do not match.");
      return;
    }

    const bodyData = {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword
    };

    try {
      const response = await fetch('http://127.0.0.1:3577/admin/egg-bucket-b2b/admin', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
         body: JSON.stringify(bodyData)
      });

      if (response.ok) {
        showConfirmation("Password changed successfully.");
        onLogout();
        navigate('/login'); 

      } else {
        showConfirmation("Error: Unable to change the password.");
      }
    } catch (error) {
      showConfirmation("Error: Server not reachable.");
    }

    closeModal();
  };

  return (
    <>
      <header className="flex items-center justify-between px-4 py-2 bg-white shadow-sm">
        <div className="flex items-center w-1/3">
          <Menu className="mr-4 h-6 w-6 text-gray-500 md:hidden" />
          <img src={logo} alt="Logo" className="pl-12 h-20" />
        </div>

        <div className="w-1/3 flex justify-end">
          <button
            onClick={openModal}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 focus:outline-none"
          >
            Change Password
          </button>
        </div>
      </header>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                  Old Password
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 focus:outline-none"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Message */}
      {confirmationMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded shadow">
          {confirmationMessage}
        </div>
      )}
    </>
  );
};

export default Header;
