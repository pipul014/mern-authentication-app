import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";


const App = () => {
  return (
    <Router>
      <div className="flex flex-1">
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

