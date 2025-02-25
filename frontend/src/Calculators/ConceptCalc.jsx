import { useState } from "react";

const ConceptCalc = () => {
  const [downPayment, setDownPayment] = useState(50000);
  const [operatingExpenses, setOperatingExpenses] = useState(800);
  const [interestRate, setInterestRate] = useState(6);
  const [results, setResults] = useState([]);

  const mortgagePayment = (principal, rate, years) => {
    let monthlyRate = rate / 100 / 12;
    let numPayments = years * 12;
    if (rate === 0) return principal / numPayments;
    return (
      (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments))
    );
  };

  const calculateDSCR = () => {
    const loanTerm = 30;
    const creditScores = [800, 780, 750, 720, 700, 680, 660, 640];
    const ltvValues = {
      800: 0.85,
      780: 0.8,
      750: 0.78,
      720: 0.75,
      700: 0.73,
      680: 0.7,
      660: 0.68,
      640: 0.65,
    };

    const calculatedResults = creditScores.map((creditScore) => {
      let ltv = ltvValues[creditScore] || 0.75;
      let maxLoanAmount = downPayment / (1 - ltv);
      let loanAmount = maxLoanAmount * ltv;
      let purchasePrice = maxLoanAmount;
      let monthlyMortgage = mortgagePayment(loanAmount, interestRate, loanTerm);
      let minRequiredRent = (monthlyMortgage + operatingExpenses) * 1.1;
      let dscr = minRequiredRent / (monthlyMortgage + operatingExpenses);

      return {
        creditScore,
        ltv: (ltv * 100).toFixed(1) + "%",
        purchasePrice: `$${purchasePrice.toFixed(2)}`,
        loanAmount: `$${loanAmount.toFixed(2)}`,
        monthlyMortgage: `$${monthlyMortgage.toFixed(2)}`,
        operatingExpenses: `$${operatingExpenses.toFixed(2)}`,
        minRequiredRent: `$${minRequiredRent.toFixed(2)}`,
        dscr: dscr.toFixed(2),
      };
    });

    setResults(calculatedResults);
  };

  return (
    <div className="container p-4">
      <h2 className="text-center">Rental DSCR Calculator Optimizer</h2>
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Down Payment ($)</label>
          <input
            type="number"
            className="form-control"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Operating Expenses ($/month)</label>
          <input
            type="number"
            className="form-control"
            value={operatingExpenses}
            onChange={(e) => setOperatingExpenses(Number(e.target.value))}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Interest Rate (%)</label>
          <input
            type="number"
            className="form-control"
            value={interestRate}
            step="0.1"
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
        </div>
      </div>

      <button className="btn btn-primary" onClick={calculateDSCR}>
        Calculate
      </button>

      <div className="mt-4">
        <h4>Results</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Credit Score</th>
              <th>LTV</th>
              <th>Max Purchase Price ($)</th>
              <th>Loan Amount ($)</th>
              <th>Monthly Mortgage ($)</th>
              <th>Operating Expenses ($)</th>
              <th>Min Required Rent ($)</th>
              <th>DSCR</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.creditScore}</td>
                <td>{result.ltv}</td>
                <td>{result.purchasePrice}</td>
                <td>{result.loanAmount}</td>
                <td>{result.monthlyMortgage}</td>
                <td>{result.operatingExpenses}</td>
                <td>{result.minRequiredRent}</td>
                <td>{result.dscr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConceptCalc;
