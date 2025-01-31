import React from "react";
export default function CheckoutSteps2(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? "active" : ""}>Loan Pricer</div>
      <div className={props.step2 ? "active" : ""}>Loan Pricer Summary</div>
      <div className={props.step3 ? "active" : ""}>Borrower Information</div>
      <div className={props.step4 ? "active" : ""}>Entity Information</div>
      <div className={props.step5 ? "active" : ""}>Property Information</div>
      <div className={props.step6 ? "active" : ""}>Loan Details</div>
      <div className={props.step7 ? "active" : ""}>Summary</div>
    </div>
  );
}
