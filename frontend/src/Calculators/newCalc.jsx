import React, { useState } from "react";
import { Typography } from "@mui/material";

const FixAndFlipCalculator = () => {
  const [values, setValues] = useState({
    purchasePrice: "",
    rehabCost: "",
    interestRate: "",
    projectLength: "",
    afterRepairValue: "",
    monthlyTaxes: "",
    monthlyInsurance: "",
    monthlyUtilities: "",
    otherMonthlyExpenses: "",
    realtorFee: "",
    closingCost: "",
    ltv: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const calculateLoanAmount = () => {
    return (
      (parseFloat(values.purchasePrice) || 0) *
        ((parseFloat(values.ltv) || 0) / 100) +
      (parseFloat(values.rehabCost) || 0)
    ).toFixed(2);
  };

  const calculateDownPayment = () => {
    return (
      (parseFloat(values.purchasePrice) || 0) -
      (parseFloat(values.purchasePrice) || 0) *
        ((parseFloat(values.ltv) || 0) / 100)
    ).toFixed(2);
  };

  const calculateCostsAndProfit = () => {
    const totalMonthlyCosts =
      (parseFloat(values.monthlyTaxes) || 0) +
      (parseFloat(values.monthlyInsurance) || 0) +
      (parseFloat(values.monthlyUtilities) || 0) +
      (parseFloat(values.otherMonthlyExpenses) || 0);

    const totalHoldingCost =
      totalMonthlyCosts * (parseFloat(values.projectLength) || 0);
    const totalInvestment =
      (parseFloat(values.purchasePrice) || 0) +
      (parseFloat(values.rehabCost) || 0) +
      totalHoldingCost;

    const sellingCosts =
      ((parseFloat(values.realtorFee) || 0) / 100) *
        (parseFloat(values.afterRepairValue) || 0) +
      ((parseFloat(values.closingCost) || 0) / 100) *
        (parseFloat(values.afterRepairValue) || 0);

    const totalCost = totalInvestment + sellingCosts;
    const anticipatedProfit =
      (parseFloat(values.afterRepairValue) || 0) - totalCost;
    const profitPercentage = ((anticipatedProfit / totalCost) * 100).toFixed(2);

    return {
      totalCost: totalCost.toFixed(2),
      anticipatedProfit: anticipatedProfit.toFixed(2),
      profitPercentage,
    };
  };

  const calculateMonthlyInterestPayment = () => {
    const loanAmount = parseFloat(calculateLoanAmount()) || 0;
    const interestRate = (parseFloat(values.interestRate) || 0) / 100;
    return ((loanAmount * interestRate) / 12).toFixed(2);
  };

  const { totalCost, anticipatedProfit, profitPercentage } =
    calculateCostsAndProfit();
  const loanAmount = calculateLoanAmount();
  const downPayment = calculateDownPayment();
  const monthlyInterestPayment = calculateMonthlyInterestPayment();

  return (
    <div>
      <Typography
        variant="button"
        display="block"
        gutterBottom
        style={{ color: "#498dd6", fontSize: 24 }}
      >
        Fix and Flip Calculator
      </Typography>
      {Object.keys(values).map((field) => (
        <div key={field}>
          <label>{field.replace(/([A-Z])/g, " $1").trim()}:</label>
          <input
            type="number"
            name={field}
            value={values[field]}
            onChange={handleChange}
          />
        </div>
      ))}
      <h3>Loan Amount: ${loanAmount}</h3>
      <h3>Down Payment: ${downPayment}</h3>
      <h3>Total Cost: ${totalCost}</h3>
      <h3>Anticipated Profit: ${anticipatedProfit}</h3>
      <h3>Profit Percentage: {profitPercentage}%</h3>
      <h3>Monthly Interest Payment: ${monthlyInterestPayment}</h3>$
      {values.purchasePrice}
    </div>
  );
};

export default FixAndFlipCalculator;
