import React from "react";
export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? "active" : ""}>Borrower Information</div>
      <div className={props.step2 ? "active" : ""}>Entity Information</div>
      <div className={props.step3 ? "active" : ""}>Property Infromation</div>
      <div className={props.step4 ? "active" : ""}>Loan Details</div>
      <div className={props.step5 ? "active" : ""}>Summary</div>
    </div>
  );
}
