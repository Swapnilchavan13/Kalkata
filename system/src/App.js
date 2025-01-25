import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './Component/AuthContex';

import { Dashboard } from './Component/Dashboard';
import { Login } from './Component/Login';
import ProtectedRoute from './Component/ProtectedRoute';
import { Merchantcontent } from './Component/Merchantcontent';
import { Merchantdatacollection } from './Component/Merchantdatacollection';
import { Merchantonboarding } from './Component/Merchantonboarding';
import { Registration } from './Component/Registration';
import { Allmerchantdata } from './Pages/Allmerchantdata';
import { Contentbymerchant } from './Component/Contentbymerchant';
import { Editmerchant } from './Component/Editmerchant';
import { MerchantcontentByTeam } from './Component/MerchantcontentByTeam';
import MerchantDetails from './Pages/MerchantDetails';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addcontent" element={<Contentbymerchant />} />

          <Route path="/merchantcontentbyteam" element={<MerchantcontentByTeam />} />

          {/* MerchantDetails */}
          <Route path="/onboardeddata" element={<MerchantDetails />} />

          <Route path="/allmerchant" element={<Allmerchantdata />} />

          <Route path="/registration9049127078" element={<Registration />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/editmerchant" element={<ProtectedRoute element={<Editmerchant />} />} />

          <Route path="/merchantcontent" element={<ProtectedRoute element={<Merchantcontent />} />} />
          <Route path="/merchantdata" element={<ProtectedRoute element={<Merchantdatacollection />} />} />
          <Route path="/merchantonboarding" element={<ProtectedRoute element={<Merchantonboarding />} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
