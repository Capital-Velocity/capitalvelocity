import Categories3 from "../components/Categories3";
import LoanForm2 from "../components/LoanForm2";
import project99 from "../Images/project99.png";

function BusinessLoan() {
  return (
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
        <img src={project99} className="text-center" style={{ width: "25%" }} />
      </div>
    </div>
  );
}

export default BusinessLoan;
