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
import MultiFamilyBridgeNewLoanForm from "./pages/MultiFamilyBridgeNewLoanForm";
import RentalPortfolioNewLoanForm from "./pages/RentalPortfolioNewLoanForm";
import SinglePropertyRentalNewLoanForm from "./pages/SinglePropertyRentalNewLoanForm";
import GroundUpNewLoanForm from "./pages/GroundUpNewLoanForm";
import CashedOutRefinanceNewLoanForm from "./pages/CashedOutRefinanceNewLoanForm";
import ProjectEpic99LoanForm from "./loanCheckout/ProjectEpic99LoanForm";
import OptimizerCalculator from "./Calculators/OptimizerCalculator";
import ConceptCalc from "./Calculators/conceptCalc";
import SBALoanForm from "./loanCheckout/SBALoanForm";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";
import ChatBot from "./components/Chatbot";
import CalculatorHub from "./pages/CalculatorHub";

function App() {
  const firstnameCookie = Cookies.get("firstName");

  return (
    <Router>
      <Navbar />
      <ChatBot />
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* <Route path="/smallbusinessloan" element={<ROKForm />} /> */}
        {/* <Route path="/ROKAffiliateTest" element={<ROKAffiliateForm />} /> */}
        <Route path="/become-partner" element={<BecomePartner />} />
        <Route path="/contactUs" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/lendio" element={<Lendio />} /> */}
        <Route path="/calculator-hub" element={<CalculatorHub />} />

        {/* <Route path="/dscr-calculator" element={<DsciCalculator />} />
        <Route
          path="/dscr-optimizer-calculator"
          element={<OptimizerCalculator />}
        /> */}
        {/* <Route path="/ConceptCalc" element={<ConceptCalc />} /> */}

        {/* <Route path="/fix-and-flip-calculator" element={<FixandFlipCalc />} /> */}
        <Route path="/terms-of-use" element={<TermsofUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
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
        {/* <Route
          path="/project99"
          element={
            firstnameCookie ? <Project99 /> : <Navigate to="/register" />
          }
        /> */}
        <Route
          path="/project99"
          element={
            firstnameCookie ? (
              <ProjectEpic99LoanForm />
            ) : (
              <Navigate to={`/login?redirect=/project99`} replace />
            )
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
        <Route
          path="/loan-form-realestate-multifamily"
          element={
            firstnameCookie ? (
              <MultiFamilyBridgeNewLoanForm />
            ) : (
              <Navigate to="/register" />
            )
          }
        />
        <Route
          path="/loan-form-realestate-rentalportfolio"
          element={
            firstnameCookie ? (
              <RentalPortfolioNewLoanForm />
            ) : (
              <Navigate to="/register" />
            )
          }
        />
        <Route
          path="/loan-form-realestate-singlepropertyrental"
          element={
            firstnameCookie ? (
              <SinglePropertyRentalNewLoanForm />
            ) : (
              <Navigate to="/register" />
            )
          }
        />
        <Route
          path="/loan-form-realestate-groundup"
          element={
            firstnameCookie ? (
              <GroundUpNewLoanForm />
            ) : (
              <Navigate to="/register" />
            )
          }
        />
        <Route
          path="/loan-form-realestate-cashedoutrefinance"
          element={
            firstnameCookie ? (
              <CashedOutRefinanceNewLoanForm />
            ) : (
              <Navigate to="/register" />
            )
          }
        />
        <Route
          path="/loan-form-business-loans-sba"
          element={
            firstnameCookie ? <SBALoanForm /> : <Navigate to="/register" />
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>

      {/* Wrap Footer in a component that uses useLocation() */}
      <FooterWrapper />
    </Router>
  );
}

// ✅ Create a separate FooterWrapper component inside the Router
function FooterWrapper() {
  const location = useLocation(); // Now it's inside a descendant of <Router>

  return location.pathname !== "/loan-form-realestate-fixandflip" &&
    location.pathname !== "/loan-form-realestate-multifamily" &&
    location.pathname !== "/loan-form-realestate-rentalportfolio" &&
    location.pathname !== "/loan-form-realestate-singlepropertyrental" &&
    location.pathname !== "/loan-form-realestate-groundup" &&
    location.pathname !== "/loan-form-realestate-cashedoutrefinance" &&
    location.pathname !== "/loan-form-business-loans-sba" &&
    location.pathname !== "/project99" ? (
    <Footer />
  ) : null;
}

export default App;
