// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AudioLibrary from "./components/AudioLibrary";
import SubscriptionPlans from "./components/SubscriptionPlans";
import Dashboard from "./components/Dashboard";  // Import the Dashboard component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AudioLibrary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/subscriptions" element={<SubscriptionPlans />} />
        <Route path="/dashboard" element={<Dashboard />} />  {/* Dashboard route */}
      </Routes>
    </Router>
  );
}

export default App;
