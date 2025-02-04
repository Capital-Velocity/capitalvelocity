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
import LoanForm2 from "./pages/LoanForm2";
import Project99 from "./pages/Project99";
import Cookies from "js-cookie";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsofUse from "./pages/TermsofUse";

function App() {
  const firstnameCookie = Cookies.get("firstName");

  return (
    <Router>
      <Navbar />
      {/* <LegacyNavbar /> */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/becomePartner" element={<BecomePartner />}></Route>
        <Route path="/contactUs" element={<ContactUs />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/DsciCalculator" element={<DsciCalculator />} />
        <Route path="/FixandFlipCalc" element={<FixandFlipCalc />} />
        <Route path="/termsofUse" element={<TermsofUse />}></Route>
        <Route path="/privacyPolicy" element={<PrivacyPolicy />}></Route>
        <Route
          path="/userDash"
          element={
            firstnameCookie ? (
              <UserDashHome />
            ) : (
              <Navigate to="/register"></Navigate>
            )
          }
        />{" "}
        <Route
          path="/userDashFile"
          element={
            firstnameCookie ? (
              <UserDashFileUpload />
            ) : (
              <Navigate to="/register"></Navigate>
            )
          }
        />{" "}
        <Route
          path="/loan-form-realestate"
          element={
            firstnameCookie ? (
              <LoanForm />
            ) : (
              <Navigate to="/register"></Navigate>
            )
          }
        />{" "}
        <Route
          path="/loan-form-business-loans"
          element={
            firstnameCookie ? (
              <LoanForm2 />
            ) : (
              <Navigate to="/register"></Navigate>
            )
          }
        />{" "}
        <Route
          path="/project99"
          element={
            firstnameCookie ? (
              <Project99 />
            ) : (
              <Navigate to="/register"></Navigate>
            )
          }
        />{" "}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
