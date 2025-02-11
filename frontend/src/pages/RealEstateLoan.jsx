import LoanForm from "../components/LoanForm";
import project99 from "../Images/project99.png";

function RealEstateLoan() {
  return (
    <div>
      <LoanForm />
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

export default RealEstateLoan;
