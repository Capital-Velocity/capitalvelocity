import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";
import DsciCalculator from "./Calculators/DsciCalculator";
import FixandFlipCalc from "./Calculators/FixandFlipCalc";
import Footer from "./components/footer";
import Navbar from "./components/oldNavbar";
import BecomePartner from "./pages/BecomePartner";
import Contact from "./pages/Contact";
import Landing from "./pages/landing";
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
import LoanForm from "./components/LoanForm";

function App() {
  const firstnameCookie = Cookies.get("firstName");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/test" element={<LoanForm />} />
        <Route path="/ROKAffiliateTest" element={<ROKAffiliateForm />} />
        <Route path="/becomePartner" element={<BecomePartner />} />
        <Route path="/contactUs" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lendio" element={<Lendio />} />
        <Route path="/DsciCalculator" element={<DsciCalculator />} />
        <Route path="/FixandFlipCalc" element={<FixandFlipCalc />} />
        <Route path="/termsofUse" element={<TermsofUse />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route
          path="/userDash"
          element={
            firstnameCookie ? <UserDashHome /> : <Navigate to="/register" />
          }
        />
        <Route
          path="/userDashFile"
          element={
            firstnameCookie ? (
              <UserDashFileUpload />
            ) : (
              <Navigate to="/register" />
            )
          }
        />
        <Route path="/loan-form-realestate" element={<RealEstateLoan />} />
        <Route path="/loan-form-business-loans" element={<BusinessLoan />} />
        <Route
          path="/project99"
          element={
            firstnameCookie ? <Project99 /> : <Navigate to="/register" />
          }
        />
        <Route
          path="/loan-form-realestate-fixandflip"
          element={
            firstnameCookie ? (
              <FixAndFlipNewForm />
            ) : (
              <Navigate to="/register" />
            )
          }
        />
      </Routes>

      {/* Wrap Footer in a component that uses useLocation() */}
      <FooterWrapper />
    </Router>
  );
}

// ✅ Create a separate FooterWrapper component inside the Router
function FooterWrapper() {
  const location = useLocation(); // Now it's inside a descendant of <Router>

  return location.pathname !== "/loan-form-realestate-fixandflip" ? (
    <Footer />
  ) : null;
}

export default App;
