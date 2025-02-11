import LoanForm from "../components/LoanForm";
import project99 from "../Images/project99.png";
import Container from "../screens/Container";

function RealEstateLoan() {
  return (
    <div style={{ backgroundColor: "#c0dced" }}>
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
