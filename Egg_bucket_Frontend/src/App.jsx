import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Customer from "./pages/CustomerDetails.jsx";
import Order from "./pages/OrderDetails.jsx";
import Dash from "./pages/Dashboard.jsx";
import Contact from "./pages/Contact.jsx";
import AddNewCustomer from "./components/forms/AddNewCustomer.jsx";
import AddNewDeliveryPartner from "./components/forms/AddNewDeliveryPartner.jsx";
import AddNewOutlet from "./components/forms/AddNewOutlet.jsx";
import AddNewOutletPartner from "./components/forms/AddNewOutletPartner.jsx";
import OutletDashboard from "./pages/OutletDashboard.jsx";
import OutletDetails from "./pages/OutletDetails.jsx";
import NotFound from "./pages/NotFound.jsx";
import DeliveryPartnerList from "./pages/DeliveryPartnerDetails.jsx";
import OutletPartnerList from "./pages/OutletPartnerDetails.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is authenticated on page load
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      // You can also verify the token from the backend to ensure it's valid
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (token) => {
    // After a successful login, set the token
    localStorage.setItem("token", token); // Assuming token is passed on login
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token"); // Clear token on logout
    console.log("Token removed from localStorage");
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading screen while checking authentication
  }

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Routes>
          <Route path="/login" element={<LoginPage setIsAuthenticated={handleLogin} />} />
          
          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <>
                  <Header onLogout={handleLogout} />
                  <div className="flex flex-1 overflow-hidden">
                    <Sidebar onLogout={handleLogout} />
                    <main className="flex-1 overflow-auto p-4 bg-gray-50">
                      <Routes>
                        <Route path="/" element={<Dash />} />
                        <Route path="/customer" element={<Customer />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="/order-details" element={<Order />} />
                        <Route path="/outlets" element={<OutletDashboard />} />
                        <Route path="/outlet-details" element={<OutletDetails />} />
                        <Route path="/outlets/new" element={<AddNewOutlet />} />
                        <Route path="/delivery-partners" element={<DeliveryPartnerList />} />
                        <Route path="/delivery-partners/new" element={<AddNewDeliveryPartner />} />
                        <Route path="/outlet-partners" element={<OutletPartnerList />} />
                        <Route path="/outlet-partners/new" element={<AddNewOutletPartner />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/contact/newcustomer" element={<AddNewCustomer />} />
                        <Route path="/contact/newdeliverypartner" element={<AddNewDeliveryPartner />} />
                        <Route path="/contact/newoutlet" element={<AddNewOutlet />} />
                        <Route path="/contact/newoutletpartner" element={<AddNewOutletPartner />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                  </div>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
