import React from "react";
export default function CheckoutSteps3(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? "active" : ""}>Background Information</div>
      <div className={props.step2 ? "active" : ""}>
        Individual Owner Information
      </div>
      <div className={props.step3 ? "active" : ""}>Personal Finance</div>

      <div className={props.step4 ? "active" : ""}>Business Information</div>
    </div>
  );
}
