import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-hidden p-4 bg-gray-50">
            <Routes>
              <Route path="/" element={<Dash />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/order" element={<Order />} />

              <Route path="/outlet-dashboard" element={<OutletDashboard />} />
              <Route path="/outlet-details" element={<OutletDetails />} />

              <Route path="/contact" element={<Contact />} />
              <Route path="/contact/newcustomer" element={<AddNewCustomer />} />
              <Route path="/contact/newdeliverypartner" element={<AddNewDeliveryPartner />} />
              <Route path="/contact/newoutlet" element={<AddNewOutlet />} />
              <Route path="/contact/newoutletpartner" element={<AddNewOutletPartner />} />

              <Route path="*" element={<NotFound />}  />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;