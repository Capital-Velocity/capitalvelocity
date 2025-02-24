import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Chart } from "react-google-charts";
import InputAdornment from "@mui/material/InputAdornment";
import { ToastContainer, toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Legend } from "chart.js";
import {
  Typography,
  Grid,
  TextField,
  Container,
  Select,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Modal,
  Button,
  Box,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Cookies from "js-cookie";

// Register ChartJS components
// ChartJS.register(ArcElement, Tooltip, Legend);

const OptimizerCalculator = () => {
  const firstnameCookie = Cookies.get("firstName");

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  // Sample
  const [displayMonthlyIncomePayment, setdisplayMonthlyIncomePayment] =
    useState(0);
  const [totalProfitAnually, setTotalProfitAnnually] = useState(0);
  const [displayMonthly, setDisplayMonthly] = useState(0);
  const [displayTotalInterest, setDisplayTotalInterest] = useState(0);
  const [displayTotalPayment, setDisplayTotalPayment] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [principalInterestData, setPrincipalInterestData] = useState([]);
  const [loanSubtype, setLoanSubtype] = useState("");
  const [estimatedValue, setEstimatedValue] = useState("");
  const [ltv, setLtv] = useState("");
  const [totalOperatingYearly, setTotalOepratingYearly] = useState(0);
  const [totalOperating2Digits, setTotalOperating2Digits] = useState(0);
  const [monthlyMortagePayment, setMonthlyMortagePayment] = useState("");
  const [selectedCreditScore, setSelectedCreditScore] = useState("");
  const [interestRate] = useState(7);
  const [amortizingPeriod] = useState(30);
  const [grossAnualincome, setGrossAnualincome] = useState(0);
  const [totalOperatingExpenses, setTotalOperatingExpenses] = useState(0);
  const [loanAmount, setLoanAmount] = useState("");
  const [requiredDownPayment, setRequiredDownPayment] = useState("");
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyRent, setMonthlyRent] = useState("");
  const [formDone, setformDone] = useState("");
  const [dscrValue, setDscrValue] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [monthlyMarketRent, setMonthlyMarketRent] = useState("");
  // This is for the graph
  const [monthlyPayment, setmonthlyPayment] = useState("");
  const [totalPayment, settotalPayment] = useState("");
  const [interest, settotalInterest] = useState("");
  const [prevIsDeal, setPrevIsDeal] = useState(false); // Track previous state

  const [annualGrossRent, setAnnualGrossRent] = useState("");
  const [monthlyTaxes, setmonthlyTaxes] = useState("");
  const [monthlyInsurances, setmonthlyInsurances] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [monthlyHOAFee, setmonthlyHOAFee] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [monthlyOtherExpenses, setMonthlyOtherExpenses] = useState("");
  const [monthlyInterestPaymentDisplay, setMonthlyInterestPaymentDisplay] =
    useState("");
  const [netOperatingIncome, setNetOperatingIncome] = useState("");

  useEffect(() => {
    calculateLoanAmount();
  }, [ltv, estimatedValue]);

  const isDeal = dscrValue >= 1.25;

  useEffect(() => {
    if (!prevIsDeal && isDeal) {
      // Trigger confetti when switching from "Not a deal" to "It's a deal!"
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 3 seconds
    }
    setPrevIsDeal(isDeal);
  }, [isDeal]);

  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (selectedCreditScore > 740) {
      setLtv("80");
    } else if (selectedCreditScore >= 720 && selectedCreditScore <= 739) {
      setLtv("75");
    } else if (selectedCreditScore >= 700 && selectedCreditScore <= 719) {
      setLtv("75");
    } else if (selectedCreditScore >= 680 && selectedCreditScore <= 699) {
      setLtv("70");
    } else if (selectedCreditScore >= 660 && selectedCreditScore <= 679) {
      setLtv("65");
    } else {
      setLtv("");
    }
  }, [selectedCreditScore]);

  useEffect(() => {
    const cleanMonthlyRentInUseEffect = Number(
      String(monthlyRent).replace(/,/g, "")
    );

    setAnnualGrossRent((parseFloat(cleanMonthlyRentInUseEffect) || 0) * 12);
  }, [monthlyRent]);

  // Trigger live calculation when inputs change
  useEffect(() => {
    calculateLoan(); // Recalculate when any of the relevant values change
    setMonthlyInterestPaymentDisplay(calculateMonthlyPayment());
    // setNetOperatingIncome(calculateNetOperatingIncome());
    setDscrValue(calculateDSCR());
  }, [
    loanAmount,
    monthlyRent,
    monthlyTaxes,
    monthlyInsurances,
    monthlyHOAFee,
    monthlyOtherExpenses,
    selectedCreditScore,
    loanSubtype,
    estimatedValue,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example Axios POST request
    axios
      .post(
        "https://52.165.80.134:4000/api/calculatorContact/contact",
        formData
      )
      .then((response) => {
        toast.success("Thank you we have received your details");
        setShowModal(false);
        // Optionally close modal or show success message
      })
      .catch((error) => {
        toast.error("There was an error in submitting please try again later.");
        setShowModal(false);
      });
  };

  const calculateLoanAmount = () => {
    const ltvPercentage = parseFloat(ltv) / 100;

    const cleanestimatedValue = String(estimatedValue).replace(/,/g, "");

    const estimatedValueFloat = parseFloat(cleanestimatedValue);
    if (!isNaN(ltvPercentage) && !isNaN(estimatedValueFloat)) {
      setLoanAmount(ltvPercentage * estimatedValueFloat);
    } else {
      setLoanAmount("");
    }
  };

  const calculateNetOperatingIncome = () => {
    const cleanMonthlyIncomePayment = Number(
      String(displayMonthlyIncomePayment).replace(/,/g, "")
    );

    return (
      parseFloat(cleanMonthlyIncomePayment) - parseFloat(totalOperatingExpenses)
    );
  };

  const handleCreditScoreChange = (e) => {
    setSelectedCreditScore(e.target.value);
  };

  // const calculateGrossAnnualIncome = () => {
  //   return (parseFloat(monthlyRent) || 0) * 12;
  // };

  // const calculateAnnualMarketIncome = () => {
  //   return (parseFloat(monthlyMarketRent) || 0) * 12;
  // };

  // const calculateTotalOperatingExpenses = () => {
  //   return (
  //     (parseFloat(monthlyInsurances * 12) || 0) +
  //     (parseFloat(monthlyHOAFee * 12) || 0) +
  //     (parseFloat(monthlyOtherExpenses * 12) || 0) +
  //     (parseFloat(monthlyTaxes * 12) || 0).toFixed(2)
  //   );
  // };

  // const calculateIOPeriodDebtService = () => {
  //   const rate = parseFloat(interestRate) / 100 / 12; // Convert interest rate to decimal and monthly rate
  //   return parseFloat(loanAmount) * rate || 0;
  // };

  // const calculateDSCR = () => {
  //   const income = calculateGrossAnnualIncome();
  //   const debt = calculateTotalOperatingExpenses();

  //   return income / debt;
  // };
  // const calculateAmortizingDebtService = () => {
  //   const rate = parseFloat(interestRate) / 100 / 12; // Convert interest rate to decimal and monthly rate
  //   const n = parseFloat(amortizingPeriod) * 12; // Convert years to months
  //   if (rate === 0) {
  //     return parseFloat(loanAmount) / n || 0; // Handling case where interest rate is zero
  //   }
  //   return (parseFloat(loanAmount) * rate) / (1 - Math.pow(1 + rate, -n)) || 0;
  // };

  // const calculateIOPITIA = () => {
  //   const ioDebtService = calculateIOPeriodDebtService();
  //   const operatingExpenses = calculateTotalOperatingExpenses();
  //   const grossIncome = calculateGrossAnnualIncome();
  //   return grossIncome > 0
  //     ? (ioDebtService + operatingExpenses) / grossIncome
  //     : 0;
  // };

  const formatNumber = (num) => {
    if (isNaN(num)) return "0";

    // 1. Round the number to two decimal places
    let roundedNumber = Math.round(num * 100) / 100;

    // 2. Convert the number to a string
    let parts = roundedNumber.toString().split(".");

    // 3. Add commas to the integer part (thousands separator)
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // 4. Ensure there are always two decimal places
    if (parts[1]) {
      parts[1] = parts[1].padEnd(2, "0"); // If decimal part exists, pad it to 2 digits
    } else {
      parts[1] = "00"; // If no decimal part, add ".00"
    }

    return parts.join(".");
  };

  const calculateLoan = () => {
    const fields = {
      loanAmount,
      monthlyRent,
      monthlyTaxes,
      monthlyInsurances,
      monthlyHOAFee,
      monthlyOtherExpenses,
      estimatedValue,
    };
    // Check if any fields are empty or zero
    const emptyFields = Object.keys(fields).filter(
      (key) => !fields[key] || fields[key] === 0
    );

    if (emptyFields.length > 0) {
      // Show a toast error message if any fields are empty or zero
      // toast.error(
      //   `Please fill in all required fields: ${emptyFields.join(", ")}`
      // );
      // Optional: Set border color to red for empty fields (if needed)
      emptyFields.forEach((field) => {
        // Example: Assuming you have a way to get the input field by its name or id
        // document.getElementById(field).style.borderColor = 'red';
      });
      return; // Exit the function to prevent further execution
    }
    // console.log(loanAmount);
    // console.log(interestRate);
    // console.log(loanTerm);
    // console.log("loanAmount here: ", monthlyRent);
    const cleanMonthlyRent = Number(String(monthlyRent).replace(/,/g, ""));
    const cleanMonthlyTaxes = Number(String(monthlyTaxes).replace(/,/g, ""));
    const cleanMonthlyInsurances = Number(
      String(monthlyInsurances).replace(/,/g, "")
    );
    const cleanMonthlyHOAFee = Number(String(monthlyHOAFee).replace(/,/g, ""));
    const cleanMonthlyOtherExpenses = Number(
      String(monthlyOtherExpenses).replace(/,/g, "")
    );

    setdisplayMonthlyIncomePayment(formatNumber(cleanMonthlyRent));
    const loanAmountFloat = loanAmount;
    const interestRateFloat = interestRate / 100;
    const termMonths = loanTerm * 12;

    const monthlyInterestRate = interestRateFloat / 12;
    // console.log("This is the monthly interest" + monthlyInterestRate);
    // console.log("This is the terms Months" + termMonths);
    // Calculate monthly payment
    const monthlyPayment =
      (loanAmountFloat *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, termMonths))) /
      (Math.pow(1 + monthlyInterestRate, termMonths) - 1);
    setDisplayMonthly(formatNumber(monthlyPayment));

    const totalPayment = monthlyPayment * termMonths;
    // console.log("This is the total payment" + totalPayment);

    const totalInterest = totalPayment - loanAmountFloat;
    // console.log("This is the total interest" + totalInterest);

    // Prepare data for the pie chart
    const data = [
      ["Category", "Amount"],
      ["Principal", totalPayment], // Fixed: Use loanAmountFloat for Principal
      ["Interest", totalInterest],
    ];

    // console.log(data);
    setChartData(data);
    setmonthlyPayment(monthlyPayment);
    settotalInterest(totalInterest);
    setDisplayTotalInterest(formatNumber(totalInterest));
    settotalPayment(totalPayment);
    setDisplayTotalPayment(formatNumber(totalPayment));
    // console.log(chartData);

    // Now we need to calculate the PITTA.
    ///// if converted to monthlyTaxes, take away the / 12.
    const monthlyTax = cleanMonthlyTaxes;
    const monthlyInsurance = cleanMonthlyInsurances;
    const monthlyHOA = cleanMonthlyHOAFee;
    const monthlyExpenses = cleanMonthlyOtherExpenses;

    const paymentIntrestTaxesInsurance =
      parseFloat(monthlyPayment) +
      parseFloat(monthlyTax) +
      parseFloat(monthlyInsurance) +
      parseFloat(monthlyExpenses) +
      parseFloat(monthlyHOA);

    // // if converted to monthlyTaxes, multiply by 12.
    // const yearlyCost =
    //   parseFloat(monthlyPayment * 12) +
    //   parseFloat(cleanMonthlyTaxes * 12) +
    //   parseFloat(cleanMonthlyInsurances * 12) +
    //   parseFloat(cleanMonthlyOtherExpenses * 12) +
    //   parseFloat(cleanMonthlyHOAFee * 12);

    // const dscr = cleanMonthlyRent / paymentIntrestTaxesInsurance;

    // dscr = NOI / TDS

    // console.log("noi: ", netOperatingIncome);
    // console.log("ip: ", monthlyInterestPaymentDisplay);

    // const dscr =
    //   parseFloat(netOperatingIncome) /
    //   parseFloat(monthlyInterestPaymentDisplay);

    // setDscrValue(dscr.toFixed(2));

    const totalOperatingExpensesMonthly =
      cleanMonthlyTaxes +
      cleanMonthlyInsurances +
      cleanMonthlyOtherExpenses +
      cleanMonthlyHOAFee;

    // console.log("final: ", myTest);

    setTotalOperatingExpenses(formatNumber(totalOperatingExpensesMonthly));
    setTotalOepratingYearly(formatNumber(totalOperatingExpensesMonthly * 12));
    const monthlyPaymentValue = cleanMonthlyRent * 12;
    // set the gross annual
    setGrossAnualincome(formatNumber(monthlyPaymentValue));
    const totalProfit = cleanMonthlyRent - paymentIntrestTaxesInsurance;
    setTotalProfit(formatNumber(totalProfit));
    const convertYearly = totalProfit * 12;
    setTotalProfitAnnually(formatNumber(convertYearly));
  };

  const calculateDSCR = () => {
    if (!loanAmount || !interestRate || !amortizingPeriod) {
      console.error("Missing required loan parameters.");
      return null;
    }

    // Convert interest rate from percentage if needed
    let correctedInterestRate =
      interestRate > 1 ? interestRate / 100 : interestRate;
    let monthlyInterestRate = correctedInterestRate / 12;

    let totalPayments = amortizingPeriod * 12;

    const cleanLoanAmount = Number(String(loanAmount).replace(/,/g, ""));
    if (isNaN(cleanLoanAmount) || cleanLoanAmount <= 0) {
      console.error("Invalid loan amount:", loanAmount);
      return null;
    }

    let monthlyLoanPayment =
      (cleanLoanAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, totalPayments)) /
      (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

    if (isNaN(monthlyLoanPayment) || monthlyLoanPayment <= 0) {
      console.error("Invalid monthly loan payment:", monthlyLoanPayment);
      return null;
    }

    // Check if required fields are missing
    if (
      monthlyRent === undefined ||
      monthlyTaxes === undefined ||
      monthlyInsurances === undefined ||
      monthlyHOAFee === undefined ||
      monthlyOtherExpenses === undefined ||
      monthlyRent === "" ||
      monthlyTaxes === "" ||
      monthlyInsurances === "" ||
      monthlyHOAFee === "" ||
      monthlyOtherExpenses === ""
    ) {
      console.warn("Waiting for all required expense fields to be entered.");
      return "";
    }

    // Parse inputs and ensure they are numbers
    const cleanMonthlyRent = Number(String(monthlyRent).replace(/,/g, ""));
    const cleanMonthlyTaxes = Number(String(monthlyTaxes).replace(/,/g, ""));
    const cleanMonthlyInsurances = Number(
      String(monthlyInsurances).replace(/,/g, "")
    );
    const cleanMonthlyHOAFee = Number(String(monthlyHOAFee).replace(/,/g, ""));
    const cleanMonthlyOtherExpenses = Number(
      String(monthlyOtherExpenses).replace(/,/g, "")
    );

    // Ensure all parsed values are valid numbers
    if (
      isNaN(cleanMonthlyRent) ||
      isNaN(cleanMonthlyTaxes) ||
      isNaN(cleanMonthlyInsurances) ||
      isNaN(cleanMonthlyHOAFee) ||
      isNaN(cleanMonthlyOtherExpenses)
    ) {
      console.warn("Invalid input detected. Waiting for valid values.");
      return "";
    }

    // Calculate Net Operating Income (NOI)
    let noi =
      cleanMonthlyRent -
      (cleanMonthlyTaxes +
        cleanMonthlyInsurances +
        cleanMonthlyHOAFee +
        cleanMonthlyOtherExpenses);

    setNetOperatingIncome(noi);

    // Calculate DSCR
    let dscr = noi / monthlyLoanPayment;

    // Ensure DSCR is valid
    if (isNaN(dscr) || dscr < 0) {
      console.warn("Invalid DSCR calculation.");
      return "";
    }

    return dscr.toFixed(2);
  };

  const calculateMonthlyPayment = () => {
    if (!loanAmount || loanAmount <= 0) return 0; // Ensure a valid loan amount

    const principal = parseFloat(loanAmount.toString().replace(/,/g, "")) || 0; // Remove commas if present
    const monthlyRate = interestRate / 100 / 12; // Convert annual rate to monthly decimal
    const numPayments = loanTerm * 12; // Convert years to months

    if (monthlyRate === 0) return (principal / numPayments).toFixed(2); // Handle zero-interest cases

    // Mortgage formula: P * (r / (1 - (1 + r) ^ -n))
    const monthlyPayment =
      principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -numPayments)));

    return monthlyPayment.toFixed(2);
  };

  // // Example usage:
  // const loanAmount = 500000; // Example: $500,000 loan
  // const interestRate = 8; // Example: 8% annual interest rate
  // const loanTerm = 30; // Example: 30-year loan

  // console.log("Monthly Payment: $", calculateMonthlyPayment(loanAmount, interestRate, loanTerm));

  const profitBoxStyle = {
    backgroundColor: isDeal ? "green" : "#f44336",
    marginTop: 10,
  };

  //   const calculateMinimumRent = () => {
  //     if (!loanAmount || loanAmount <= 0) return 0;

  //     const principal = parseFloat(loanAmount.toString().replace(/,/g, "")) || 0;
  //     const monthlyRate = interestRate / 100 / 12;
  //     const numPayments = loanTerm * 12;

  //     const monthlyLoanPayment =
  //       principal *
  //         (monthlyRate / (1 - Math.pow(1 + monthlyRate, -numPayments))) || 0;

  //     const totalOperatingExpensesMonthly =
  //       parseFloat(monthlyTaxes || 0) +
  //       parseFloat(monthlyInsurances || 0) +
  //       parseFloat(monthlyHOAFee || 0) +
  //       parseFloat(monthlyOtherExpenses || 0);

  //     const minMonthlyRent =
  //       1.1 * monthlyLoanPayment + totalOperatingExpensesMonthly;

  //     setMonthlyRent(formatNumber(minMonthlyRent.toFixed(2)));

  //     console.log("minimum monthly rent: ", monthlyRent);
  //   };

  //   const calculateMinimumEstimatedValue = () => {
  //     if (!ltv || ltv <= 0) return 0;

  //     const ltvPercentage = parseFloat(ltv) / 100;
  //     const minEstimatedValue = loanAmount / ltvPercentage;

  //     setEstimatedValue(formatNumber(minEstimatedValue.toFixed(2)));

  //     console.log("minimum estimated value: ", estimatedValue);
  //   };

  //   const calculateMinimumRent = () => {
  //     if (!loanAmount || loanAmount <= 0) return 0;

  //     const principal = parseFloat(loanAmount.toString().replace(/,/g, "")) || 0;
  //     const monthlyRate = interestRate / 100 / 12;
  //     const numPayments = loanTerm * 12;

  //     const monthlyLoanPayment =
  //       principal *
  //         (monthlyRate / (1 - Math.pow(1 + monthlyRate, -numPayments))) || 0;

  //     const totalOperatingExpensesMonthly =
  //       parseFloat(monthlyTaxes || 0) +
  //       parseFloat(monthlyInsurances || 0) +
  //       parseFloat(monthlyHOAFee || 0) +
  //       parseFloat(monthlyOtherExpenses || 0);

  //     const userDownPayment =
  //       parseFloat(requiredDownPayment.toString().replace(/,/g, "")) || 0;
  //     const adjustedLoanAmount = principal - userDownPayment;

  //     const adjustedMonthlyLoanPayment =
  //       adjustedLoanAmount *
  //         (monthlyRate / (1 - Math.pow(1 + monthlyRate, -numPayments))) || 0;

  //     const minMonthlyRent =
  //       1.1 * adjustedMonthlyLoanPayment + totalOperatingExpensesMonthly;

  //     setMonthlyRent(formatNumber(minMonthlyRent.toFixed(2)));

  //     console.log("minimum monthly rent: ", monthlyRent);
  //   };

  //   const calculateMinimumEstimatedValue = () => {
  //     if (!ltv || ltv <= 0) return 0;

  //     const userDownPayment =
  //       parseFloat(requiredDownPayment.toString().replace(/,/g, "")) || 0;
  //     const adjustedLoanAmount = loanAmount - userDownPayment;

  //     const ltvPercentage = parseFloat(ltv) / 100;
  //     const minEstimatedValue = adjustedLoanAmount / ltvPercentage;

  //     setEstimatedValue(formatNumber(minEstimatedValue.toFixed(2)));

  //     console.log("minimum estimated value: ", estimatedValue);
  //   };

  // User inputs: down payment and monthly operating expenses
  const [downPayment, setDownPayment] = useState("");
  const [monthlyTaxesCalc, setMonthlyTaxesCalc] = useState("");
  const [monthlyInsurance, setMonthlyInsurance] = useState("");
  const [monthlyHOAFees, setMonthlyHOAFees] = useState("");
  const [monthlyOtherExpensesCalc, setMonthlyOtherExpensesCalc] = useState("");

  // console.log("downPayment: ", downPayment);
  // console.log("monthlyTaxesCalc: ", monthlyTaxesCalc);
  // console.log("monthlyInsurance: ", monthlyInsurance);
  // console.log("monthlyHOAFees: ", monthlyHOAFees);
  // console.log("monthlyOtherExpensesCalc: ", monthlyOtherExpensesCalc);

  const cleanDownPayment = Number(String(downPayment).replace(/,/g, ""));
  const cleanMonthlyTaxesCalc = Number(
    String(monthlyTaxesCalc).replace(/,/g, "")
  );
  const cleanMonthlyInsurance = Number(
    String(monthlyInsurance).replace(/,/g, "")
  );
  const cleanMonthlyHOAFees = Number(String(monthlyHOAFees).replace(/,/g, ""));
  const cleanMonthlyOtherExpensesCalc = Number(
    String(monthlyOtherExpensesCalc).replace(/,/g, "")
  );

  // console.log("cleanDownPayment: ", cleanDownPayment);
  // console.log("cleanMonthlyTaxesCalc: ", cleanMonthlyTaxesCalc);
  // console.log("cleanMonthlyInsurance: ", cleanMonthlyInsurance);
  // console.log("cleanMonthlyHOAFees: ", cleanMonthlyHOAFees);
  // console.log("cleanMonthlyOtherExpensesCalc: ", cleanMonthlyOtherExpensesCalc);

  // Static constants
  const DSCR = 1.1;
  const annualRate = 0.07; // 7% annual interest rate
  const termMonths = 360; // 30-year loan
  const monthlyRentYield = 0.005; // 0.5% of purchase price per month

  // Calculate the monthly mortgage payment factor (MPF)
  const calculateMortgagePaymentFactor = (annualRate, termMonths) => {
    const monthlyRate = annualRate / 12;
    return (
      (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
      (Math.pow(1 + monthlyRate, termMonths) - 1)
    );
  };

  // Given the down payment and operating expenses, compute:
  // - The maximum purchase price that meets the DSCR condition
  // - The gross monthly rent income needed (which includes covering operating expenses)
  //
  // DSCR condition with expenses:
  //   (Purchase Price * monthlyRentYield) - TotalExpenses = DSCR * MPF * (Purchase Price - Down Payment)
  //
  // Rearranged, we get:
  //   Purchase Price = (DSCR * MPF * Down Payment - TotalExpenses) / (DSCR * MPF - monthlyRentYield)
  //
  // And the required gross monthly rent income is:
  //   Gross Rent = DSCR * MPF * (Purchase Price - Down Payment) + TotalExpenses
  const calculateValues = (DP, taxes, insurance, hoa, other) => {
    const totalExpenses = taxes + insurance + hoa + other;
    const MPF = calculateMortgagePaymentFactor(annualRate, termMonths);

    console.log("totalExpenses: ", totalExpenses);

    // Ensure that the down payment is sufficiently high so that the numerator is positive.
    if (DSCR * MPF * DP <= totalExpenses) {
      return {
        error:
          "Down Payment is too low to cover operating expenses with these parameters.",
      };
    }

    const purchasePrice =
      (DSCR * MPF * DP - totalExpenses) / (DSCR * MPF - monthlyRentYield);
    const monthlyRentNeeded = DSCR * MPF * (purchasePrice - DP) + totalExpenses;

    return { purchasePrice, monthlyRentNeeded };
  };

  let results = null;
  if (
    cleanDownPayment !== "" &&
    cleanMonthlyTaxesCalc !== "" &&
    cleanMonthlyInsurance !== "" &&
    cleanMonthlyHOAFees !== "" &&
    cleanMonthlyOtherExpensesCalc !== ""
  ) {
    results = calculateValues(
      parseFloat(cleanDownPayment),
      parseFloat(cleanMonthlyTaxesCalc),
      parseFloat(cleanMonthlyInsurance),
      parseFloat(cleanMonthlyHOAFees),
      parseFloat(cleanMonthlyOtherExpensesCalc)
    );
  }

  return (
    <div className="pt-12" style={{ marginBottom: 30 }}>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={250} // Decent amount of confetti
          tweenDuration={5} // Smooth fall animation
          decay={0.9} // Ensures confetti falls off-screen
          run={showConfetti} // Ensures confetti doesn't regenerate
          recycle={false} // Stops confetti from looping
        />
      )}

      <ToastContainer />
      <Container>
        <Typography
          variant="button"
          display="block"
          gutterBottom
          style={{ color: "#498dd6", fontSize: 24 }}
        >
          Rental DSCR Optimizer
        </Typography>

        <Typography
          variant="body1"
          display="block"
          gutterBottom
          style={{ color: "black", fontSize: 14 }}
        >
          Rental DSCR Optimizer – Maximize Your Loan Eligibility <br /> <br />{" "}
          The Rental DSCR Optimizer is designed to help investors fine-tune
          estimated as-is value and rental income to achieve an acceptable Debt
          Service Coverage Ratio (DSCR) while maintaining an affordable down
          payment. This powerful tool enables investors to determine the maximum
          property value and minimum required rent needed to secure loan
          approval based on available cash for the down payment. <br />
          <br />
          Key Features:
          <br />
          ✅ Target DSCR Optimization – Identify the ideal estimated as-is value
          and rental income required to meet lender DSCR thresholds. <br />
          ✅ Expense & Loan Customization – Adjust operating expenses, loan
          terms, and financing structures to optimize DSCR and improve loan
          eligibility. <br />
          ✅ What-If Scenarios – Explore different property valuations, rental
          pricing models, and down payment strategies to assess their impact on
          DSCR. <br />
          <br /> Ensure your investment strategy aligns with lender requirements
          and maximize your financing potential. Try the Rental DSCR Optimizer
          today! 🚀
        </Typography>
        <Divider style={{ color: "black", marginBottom: 10 }} />

        <Grid container spacing={2}>
          {/* <div>
            <h2>DSCR Calculator</h2>
            <h3>DSCR = 1.1 | Interest Rate = 7% | 30-year Loan</h3>

            <div>
              <label>
                Down Payment: $
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Monthly Taxes: $
                <input
                  type="number"
                  value={monthlyTaxesCalc}
                  onChange={(e) => setMonthlyTaxesCalc(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Monthly Insurance: $
                <input
                  type="number"
                  value={monthlyInsurance}
                  onChange={(e) => setMonthlyInsurance(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Monthly HOA Fees: $
                <input
                  type="number"
                  value={monthlyHOAFees}
                  onChange={(e) => setMonthlyHOAFees(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Monthly Other Expenses: $
                <input
                  type="number"
                  value={monthlyOtherExpensesCalc}
                  onChange={(e) => setMonthlyOtherExpensesCalc(e.target.value)}
                />
              </label>
            </div>

            {results && !results.error && (
              <div>
                <p>
                  <strong>Maximum Purchase Price:</strong> $
                  {results.purchasePrice.toFixed(2)}
                </p>
                <p>
                  <strong>Monthly Rent Income Needed for DSCR ≥ 1.1:</strong> $
                  {results.monthlyRentNeeded.toFixed(2)}
                </p>
              </div>
            )}
            {results && results.error && (
              <p style={{ color: "red" }}>{results.error}</p>
            )}
          </div> */}

          <Grid item xs={12} sm={6}>
            <Typography
              variant="button"
              display="block"
              gutterBottom
              style={{ color: "black", fontSize: 16 }}
            >
              Loan Values
            </Typography>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="black"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Loan Subtype ($){" "}
                    <Tooltip
                      title="The type of loan you're applying for (e.g., Single Property, 2 to 4 Units). This helps define the repayment structure and the interest rate over time."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }} // Align icon vertically
                      />
                    </Tooltip>
                  </Typography>{" "}
                  <Select
                    value={loanSubtype}
                    onChange={(e) => setLoanSubtype(e.target.value)}
                    variant="outlined"
                  >
                    <MenuItem value={"Single Property"}>
                      Single Property
                    </MenuItem>
                    <MenuItem value={"2 to 4 Units"}>2 to 4 Units</MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="black"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Down Payment ($){" "}
                    <Tooltip
                      title="The down payment required to make this deal."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }} // Align icon vertically
                      />
                    </Tooltip>
                  </Typography>{" "}
                  <TextField
                    type="text" // Change to "text" because we will handle the number formatting ourselves
                    fullWidth
                    value={downPayment}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                      if (value) {
                        // Format the number with commas
                        value = new Intl.NumberFormat().format(value);
                      }
                      setDownPayment(value); // Set the formatted value with commas
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  color="black"
                  component="div"
                  sx={{ display: "inline-flex", alignItems: "center" }}
                >
                  Purchase Price ($){" "}
                  <Tooltip
                    title="The current market value of the property in its existing condition, before any renovations or improvements are made."
                    arrow
                    placement="top"
                  >
                    <InfoIcon
                      className="cursor-pointer"
                      sx={{
                        fontSize: 18,
                        color: "gray",
                        marginLeft: 1,
                        verticalAlign: "middle",
                      }} // Align icon vertically
                    />
                  </Tooltip>
                </Typography>{" "}
                <FormControl fullWidth>
                  <TextField
                    type="text"
                    fullWidth
                    value={
                      results && !results.error
                        ? results.purchasePrice.toFixed(2)
                        : "0.00"
                    }
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="black"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Credit Score{" "}
                    <Tooltip
                      title="A numerical representation of your creditworthiness based on your credit history. It affects the interest rate and terms of your loan."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }} // Align icon vertically
                      />
                    </Tooltip>
                  </Typography>{" "}
                  <Select
                    value={selectedCreditScore}
                    onChange={handleCreditScoreChange}
                    variant="outlined"
                  >
                    <MenuItem value={750}> 740 and Above </MenuItem>
                    <MenuItem value={730}> 720 - 739 </MenuItem>
                    <MenuItem value={710}> 700 - 719 </MenuItem>
                    <MenuItem value={690}> 680 - 699 </MenuItem>
                    <MenuItem value={670}> 660 - 679 </MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}
              {/* <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="black"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    LTV Percentage (%){" "}
                    <Tooltip
                      title="The ratio of the loan amount to the appraised value of the property, expressed as a percentage. A higher LTV percentage indicates higher risk for lenders."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }} // Align icon vertically
                      />
                    </Tooltip>
                  </Typography>{" "}
                  <TextField
                    value={ltv}
                    disabled
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </FormControl>
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="black"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Interest Rate (%){" "}
                    <Tooltip
                      title="The percentage of the loan amount charged by the lender for borrowing money, typically expressed as an annual percentage rate (APR). This rate impacts monthly payments and the total loan cost."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }} // Align icon vertically
                      />
                    </Tooltip>
                  </Typography>{" "}
                  <TextField
                    value={7}
                    disabled
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="black"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Fully Amortizing Period (Years){" "}
                    <Tooltip
                      title="The time period over which the loan is fully paid off, including both principal and interest, with equal payments made throughout the term."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }} // Align icon vertically
                      />
                    </Tooltip>
                  </Typography>{" "}
                  <TextField
                    disabled
                    value={30}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    variant="outlined"
                  />
                </FormControl>
              </Grid>

              {/* <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="black"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Loan Amount ($){" "}
                    <Tooltip
                      title="The total amount of money borrowed for the property purchase, which is typically based on the LTV and the estimated property value."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }} // Align icon vertically
                      />
                    </Tooltip>
                  </Typography>{" "}
                  <TextField
                    type="text" // Change type to "text" to allow formatted string
                    fullWidth
                    value={`${Number(loanAmount).toLocaleString("en-US", {})}`}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    disabled
                  />
                </FormControl>
              </Grid> */}

              {/* <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography
                    color="black"
                    component="div"
                    sx={{
                      display: "flex", // Use flexbox to align the content
                      alignItems: "center", // Vertically align text and icon
                      justifyContent: "center", // Center both horizontally
                    }}
                  >
                    Monthly Interest Payment
                    <Tooltip
                      title="The portion of the annual or semi-annual property taxes that accrue each month."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }}
                      />
                    </Tooltip>
                  </Typography>

                  <Typography
                    className="text-center"
                    gutterBottom
                    style={{ color: "black", fontSize: 20, marginTop: 5 }}
                  >
                    ${monthlyInterestPaymentDisplay}
                  </Typography>
                </FormControl>
              </Grid> */}
              {/* Income Column */}
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  style={{ color: "black", fontSize: 16, marginTop: 10 }}
                >
                  Income
                </Typography>
                <FormControl fullWidth>
                  <Typography
                    color="black"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Monthly Rent ($)
                    <Tooltip
                      title="The amount of rent received from tenants on a monthly basis. This is used to calculate your property's income for the purpose of evaluating debt service coverage."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }}
                      />
                    </Tooltip>
                  </Typography>
                  <TextField
                    type="text"
                    fullWidth
                    value={
                      results && !results.error
                        ? results.monthlyRentNeeded.toFixed(2)
                        : "0.00"
                    }
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>

              {/* Expenses Column */}
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  style={{ color: "black", fontSize: 16, marginTop: 10 }}
                >
                  Expenses
                </Typography>
                {/* Monthly Taxes */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Typography
                    color="black"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Monthly Taxes ($)
                    <Tooltip
                      title="The total amount of property taxes owed on the property for the year. Property taxes are a recurring expense for property owners."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }}
                      />
                    </Tooltip>
                  </Typography>
                  <TextField
                    type="text"
                    fullWidth
                    value={monthlyTaxesCalc}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, "");
                      if (value) {
                        value = new Intl.NumberFormat().format(value);
                      }
                      setMonthlyTaxesCalc(value);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                {/* Monthly Insurance */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Typography
                    color="black"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Monthly Insurance ($)
                    <Tooltip
                      title="The yearly cost of insurance coverage for the property, protecting against risks like fire, theft, or natural disasters."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }}
                      />
                    </Tooltip>
                  </Typography>
                  <TextField
                    type="text"
                    fullWidth
                    value={monthlyInsurance}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, "");
                      if (value) {
                        value = new Intl.NumberFormat().format(value);
                      }
                      setMonthlyInsurance(value);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                {/* Monthly HOA Fees */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Typography
                    color="black"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Monthly HOA Fees ($)
                    <Tooltip
                      title="The fees paid to a Homeowners Association (HOA) for property management and maintenance of shared community areas. This is typically applicable in properties within an HOA-governed community."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }}
                      />
                    </Tooltip>
                  </Typography>
                  <TextField
                    type="text"
                    fullWidth
                    value={monthlyHOAFees}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, "");
                      if (value) {
                        value = new Intl.NumberFormat().format(value);
                      }
                      setMonthlyHOAFees(value);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                {/* Monthly Other Expenses */}
                <FormControl fullWidth>
                  <Typography
                    color="black"
                    component="div"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Monthly Other Expenses ($)
                    <Tooltip
                      title="The fees paid for various other expenses required."
                      arrow
                      placement="top"
                    >
                      <InfoIcon
                        className="cursor-pointer"
                        sx={{
                          fontSize: 18,
                          color: "gray",
                          marginLeft: 1,
                          verticalAlign: "middle",
                        }}
                      />
                    </Tooltip>
                  </Typography>
                  <TextField
                    type="text"
                    fullWidth
                    value={monthlyOtherExpensesCalc}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, "");
                      if (value) {
                        value = new Intl.NumberFormat().format(value);
                      }
                      setMonthlyOtherExpensesCalc(value);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Item>
              <Box style={{ backgroundColor: "#498dd6", marginTop: 10 }}>
                <Container>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        Maximum Purchase Price:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        $
                        {results.purchasePrice
                          ? results.purchasePrice.toFixed(2)
                          : "0.00"}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        Monthly Rent Income Needed for DSCR ≥ 1.1:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        $
                        {results.monthlyRentNeeded
                          ? results.monthlyRentNeeded.toFixed(2)
                          : "0.00"}
                      </Typography>
                    </Grid>
                  </Grid>

                  {/* <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        Net Operating Income
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body1" color="white" gutterBottom>
                        $
                        {Number(netOperatingIncome).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Typography>
                    </Grid>
                  </Grid> */}
                </Container>
              </Box>
              {/* <Box style={profitBoxStyle}>
                <Container>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="white">
                        DSCR: {dscrValue}{" "}
                      </Typography>

                      <Typography variant="h2" color="white" gutterBottom>
                        {dscrValue >= 1.1
                          ? "It's go time!"
                          : "DSCR is too low."}{" "}
                        <Tooltip
                          title="A DSCR score below 1.1 is considered very weak and suggests that a company owes more money to creditors (per year) than it generates in cash per year. Most commercial banks and equipment finance firms want to see a minimum of 1.25x but strongly prefer something closer to 2x or more."
                          arrow
                          placement="top"
                        >
                          <InfoIcon
                            className="cursor-pointer"
                            sx={{
                              fontSize: 18,
                              color: "",
                              marginBottom: 0.5,
                              verticalAlign: "middle",
                            }} // Align icon vertically
                          />
                        </Tooltip>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} style={{ marginBottom: 10 }}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          if (firstnameCookie) {
                            window.location.href =
                              "/loan-form-realestate?type=RentalPortfolios";
                          } else {
                            window.location.href = "/register";
                          }
                        }}
                        style={{
                          backgroundColor: "#498dd6",
                          borderRadius: "30px",
                          marginTop: "10px",
                        }}
                      >
                        Apply Now
                      </Button>
                    </Grid>
                  </Grid>
                </Container>
              </Box> */}
            </Item>
          </Grid>
        </Grid>
        <Container></Container>
      </Container>
    </div>
  );
};

export default OptimizerCalculator;
