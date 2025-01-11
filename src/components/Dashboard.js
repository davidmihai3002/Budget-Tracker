import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import Homepage from "./Homepage/Homepage";

const Dashboard = () =>{
    return (
        <Router basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            
            <Route path="/home" element={<Homepage />} />
          </Routes>
        </Router>
      );
}

export default Dashboard;
