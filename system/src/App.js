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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration9049127078" element={<Registration />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/merchantcontent" element={<ProtectedRoute element={<Merchantcontent />} />} />
          <Route path="/merchantdata" element={<ProtectedRoute element={<Merchantdatacollection />} />} />
          <Route path="/merchantonboarding" element={<ProtectedRoute element={<Merchantonboarding />} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
