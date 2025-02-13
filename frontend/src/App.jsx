import Cookies from "js-cookie";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import DsciCalculator from "./Calculators/DsciCalculator";
import FixandFlipCalc from "./Calculators/FixandFlipCalc";
import Footer from "./components/footer";
import Navbar from "./components/oldNavbar";
import BecomePartner from "./pages/BecomePartner";
import Contact from "./pages/Contact";
import Landing from "./pages/landing";
// import LoanForm from "../components/LoanForm";
// import LoanForm2 from "../components/LoanForm2";
import Login from "./pages/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Project99 from "./pages/Project99";
import Register from "./pages/Register";
import TermsofUse from "./pages/TermsofUse";
import UserDashFileUpload from "./pages/UserDashFileUpload";
import UserDashHome from "./pages/UserDashHome";
import Lendio from "./pages/Lendio";
import ROKForm from "./pages/ROKForm";
import ROKAffiliateForm from "./pages/ROKAffiliateForm";
import RealEstateLoan from "./pages/RealEstateLoan";
import BusinessLoan from "./pages/BusinessLoan";
import FixAndFlipNewForm from "./pages/FixAndFlipNewForm";

function App() {
  const firstnameCookie = Cookies.get("firstName");

  return (
    <Router>
      <Navbar />
      {/* <LegacyNavbar /> */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/test" element={<ROKForm />} />
        <Route path="/ROKAffiliateTest" element={<ROKAffiliateForm />} />
        <Route path="/becomePartner" element={<BecomePartner />}></Route>
        <Route path="/contactUs" element={<Contact />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lendio" element={<Lendio />} />
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
          element={<RealEstateLoan />}
        ></Route>
        {/* <Route
          path="/loan-form-realestate"
          element={
            firstnameCookie ? (
              <LoanForm />
            ) : (
              <Navigate to="/register"></Navigate>
            )
          }
        />{" "} */}
        <Route
          path="/loan-form-business-loans"
          element={<BusinessLoan />}
        ></Route>
        {/* <Route
          path="/loan-form-business-loans"
          element={
            firstnameCookie ? (
              <LoanForm2 />
            ) : (
              <Navigate to="/register"></Navigate>
            )
          }
        />{" "} */}
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
        <Route
          path="/loan-form-realestate-fixandflip"
          element={
            firstnameCookie ? (
              <FixAndFlipNewForm />
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
