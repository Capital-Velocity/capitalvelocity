import Categories3 from "../components/Categories3";
import LoanForm2 from "../components/LoanForm2";
import project99 from "../Images/project99.png";
import { Helmet } from "react-helmet";
function BusinessLoan() {
  return (
    <>
      <Helmet>
        <title>Business Loans | Capital Velocity</title>
        <meta
          name="description"
          content="Discover flexible business loan options at Capital Velocity. Fast funding solutions tailored to support small business growth and financial needs."
        />
        <link
          rel="canonical"
          href="https://www.capitalvelocity.com/loan-form-business-loans"
        />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Business Loans",
              "url": "https://www.capitalvelocity.com/loan-form-business-loans",
              "description": "Capital Velocity provides small businesses with access to tailored financing solutions. Apply for working capital, expansion funding, and more.",
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
      <div style={{ backgroundColor: "#c0dced" }}>
        {/* <LoanForm2 /> */}
        <Categories3 />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={project99}
            className="text-center"
            style={{ width: "25%" }}
          />
        </div>
      </div>
    </>
  );
}

export default BusinessLoan;
