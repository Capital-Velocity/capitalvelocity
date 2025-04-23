import Categories2 from "../components/Categories2";
import LoanForm from "../components/LoanForm";
import NewRealEstateCategories from "../components/NewRealEstateCategories";
import project99 from "../Images/project99.png";
import Container from "../screens/Container";
import { Helmet } from "react-helmet";

function RealEstateLoan() {
  return (
    <>
      <Helmet>
        <title>Real Estate Loans | Capital Velocity</title>
        <meta
          name="description"
          content="Explore Capital Velocity's real estate loan solutions designed for business owners and investors. Flexible commercial loan options to fuel your property ventures."
        />
        <link
          rel="canonical"
          href="https://www.capitalvelocity.com/loan-form-realestate"
        />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Real Estate Loans",
              "url": "https://www.capitalvelocity.com/loan-form-realestate",
              "description": "Capital Velocity's real estate financing options for commercial and investment properties. Flexible funding solutions tailored to your growth.",
              "publisher": {
                "@type": "Organization",
                "name": "Capital Velocity",
                "url": "https://www.capitalvelocity.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.capitalvelocity.com/assets/cvlogo-BWrm997-.png"
                }
              }
            }
          `}
        </script>
      </Helmet>

      <div style={{}}>
        {/* <Categories2 /> */}
        <NewRealEstateCategories />
        {/* <LoanForm /> */}
        {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={project99} className="text-center" style={{ width: "25%" }} />
      </div> */}
      </div>
    </>
  );
}

export default RealEstateLoan;
