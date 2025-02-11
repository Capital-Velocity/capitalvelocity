import LoanForm2 from "../components/LoanForm2";
import project99 from "../Images/project99.png";

function BusinessLoan() {
  return (
    <div>
      <LoanForm2 />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={project99} className="text-center" style={{ width: "25%" }} />
      </div>
    </div>
  );
}

export default BusinessLoan;
