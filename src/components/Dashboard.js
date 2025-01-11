import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import Homepage from "./Homepage/Homepage";

const Dashboard = () =>{
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            
            <Route path="/home" element={<Homepage />} />
          </Routes>
        </BrowserRouter>
      );
}

export default Dashboard;
