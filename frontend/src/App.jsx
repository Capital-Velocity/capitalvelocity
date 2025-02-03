import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/oldNavbar";
import LegacyNavbar from "./components/navbar";
import Footer from "./components/footer";
import "./App.css";
import Home from "./pages/home";
import WhyUs from "./pages/WhyUs";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import BecomePartner from "./pages/BecomePartner";
import Landing from "./pages/landing";
import Register from "./pages/Register";
import DsciCalculator from "./Calculators/DsciCalculator";
import FixandFlipCalc from "./Calculators/FixandFlipCalc";
import Login from "./pages/Login";
import UserDashHome from "./pages/UserDashHome";
import UserDashFileUpload from "./pages/UserDashFileUpload";
import LoanForm from "./pages/LoanForm";
import Project99 from "./pages/Project99";

function App() {
  return (
    <Router>
      <Navbar />
      <LegacyNavbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/becomePartner" element={<BecomePartner />}></Route>
        <Route path="/WhyUs" element={<WhyUs />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/project99" element={<Project99 />}></Route>
        <Route path="/contactUs" element={<ContactUs />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/DsciCalculator" element={<DsciCalculator />} />
        <Route path="/FixandFlipCalc" element={<FixandFlipCalc />} />
        <Route path="/userDash" element={<UserDashHome />} />
        <Route path="/userDashFile" element={<UserDashFileUpload />} />
        <Route path="/loan-form-realestate" element={<LoanForm />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
