import React, { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import Container from "../../screens/Container";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Divider,
  Button,
  Grid,
  FormControl,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function FinanceProjectEpic99({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("no");
  const [sliderValue, setSliderValue] = useState(1);
  const [sliderValue2, setSliderValue2] = useState(1);

  const marks = [
    { value: 1, label: "Newbie" },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5, label: "Seasoned" },
  ];

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    setFormData({
      ...formData,
      personallyGuranteeing: newValue,
    });
  };

  const handleSliderChange2 = (event, newValue) => {
    setSliderValue2(newValue);
    setFormData({
      ...formData,
      experienceWithRealEstate: newValue,
    });
  };

  const percentageMarks = [
    { value: 0, label: "0%" },
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "100%" },
  ];

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFormData({
      ...formData,
      borrowingEntityOwned: newValue,
    });
  };

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
    setFormData({
      ...formData,
      borrowingEntityOwned: newValue,
    });
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setFormData({
      ...formData,
      armsLength: event.target.value,
    });
  };

  const [sum, setSum] = useState(0); // Step 1: Initialize state for the sum
  const [sumLiability, setSumLiability] = useState(0);

  // Step 2: Create a function to calculate the sum
  const calculateSum = () => {
    const fields = [
      formData.cashonHand,
      formData.savingsAccounts,
      formData.retirementAccount,
      formData.notesReceivable,
      formData.lifeInsurance,
      formData.stocksBonds,
      formData.realEstate,
      formData.automobiles,
      formData.otherPersonalProperty,
      formData.otherAssets,
    ];

    const validFields = fields.filter((value) => !isNaN(parseFloat(value)));
    const total = validFields.reduce(
      (acc, currentValue) => acc + parseFloat(currentValue),
      0
    );

    setSum(total.toFixed(2));
  };

  // Step 2: Create a function to calculate the sum
  const calculateLiability = () => {
    const fields = [
      formData.accountsPayable,
      formData.StocksBonds,
      formData.installmentAccount,
      formData.loanInsurance,
      formData.mortgagesRealEstate,
      formData.unpaidTaxes,
      formData.otherLiabilities,
    ];

    const validFields = fields.filter((value) => !isNaN(parseFloat(value)));
    const total = validFields.reduce(
      (acc, currentValue) => acc + parseFloat(currentValue),
      0
    );

    setSumLiability(total.toFixed(2));
  };

  useEffect(() => {
    calculateSum();
    calculateLiability();
  }, [
    formData.cashonHand,
    formData.savingsAccounts,
    formData.retirementAccount,
    formData.notesReceivable,
    formData.lifeInsurance,
    formData.stocksBonds,
    formData.realEstate,
    formData.automobiles,
    formData.otherPersonalProperty,
    formData.otherAssets,
    formData.accountsPayable,
    formData.StocksBonds,
    formData.installmentAccount,
    formData.loanInsurance,
    formData.mortgagesRealEstate,
    formData.unpaidTaxes,
    formData.otherLiabilities,
  ]);

  const [selectedProperties, setSelectedProperties] = useState(
    formData.notesPayable || []
  );
  const [ownersName, setOwnersName] = useState(0);
  const [balance, setBalance] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [frequencey, setFrequencey] = useState(0);
  const [howSecured, setHowSecured] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90vw", // Responsive width
    maxWidth: 1000, // Max width for larger screens
    height: "auto", // Allow height to adjust based on content
    maxHeight: "90vh", // Prevent modal from overflowing on smaller screens
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflowY: "auto", // Allows scrolling inside modal if content overflows
  };
  const handleDeleteRow = (index) => {
    const updatedProperties = selectedProperties.filter((_, i) => i !== index);

    setSelectedProperties(updatedProperties);
    setFormData({
      ...formData,
      notesPayable: updatedProperties,
    });
  };

  const handleAddProperty = () => {
    setSelectedProperties([
      ...selectedProperties,
      {
        ownersName,
        balance,
        currentBalance,
        paymentAmount,
        frequencey,
        howSecured,
      },
    ]);

    const newProperty = {
      ownersName,
      balance,
      currentBalance,
      paymentAmount,
      frequencey,
      howSecured,
    };

    const updatedFormData = {
      ...formData,
      notesPayable: [...(formData.notesPayable || []), newProperty],
    };

    setFormData(updatedFormData);
    setOwnersName(0);
    setBalance(0);
    setCurrentBalance(0);
    setPaymentAmount(0);
    setFrequencey(0);
    setHowSecured(0);
    setOpenModal(false);
  };

  const [selectedPropertiesStocksBonds, setSelectedPropertiesStocksBonds] =
    useState(formData.stocksAndBonds || []);

  const [numbShares, setNumbShares] = useState(0);
  const [numbofSecurities, setNumbofSecurities] = useState(0);
  const [cost, setCost] = useState(0);
  const [marketValue, setMarketValue] = useState(0);
  const [dateofQuoatation, setDateofQuoatation] = useState("");
  const [totalValue, setTotalValue] = useState(0);
  const [openModalStocksBonds, setOpenModalStocksBonds] = useState(false);

  const styleStocksBonds = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    height: 200,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const handleDeleteRowStocksBonds = (index) => {
    const updatedProperties = selectedProperties.filter((_, i) => i !== index);

    setSelectedPropertiesStocksBonds(updatedProperties);
    setFormData({
      ...formData,
      stocksAndBonds: updatedProperties,
    });
  };

  const getTotalPropertiesStocksBonds = () => {
    return selectedPropertiesStocksBonds.reduce(
      (total, property) => total + Number(property.numProperties),
      0
    );
  };

  const handleAddPropertyStocksBonds = () => {
    const newPropertyStocksBonds = {
      numbShares,
      numbofSecurities,
      cost,
      marketValue,
      dateofQuoatation,
      totalValue,
    };

    setSelectedPropertiesStocksBonds([
      ...selectedPropertiesStocksBonds,
      newPropertyStocksBonds,
    ]);

    const updatedFormDataStocksBonds = {
      ...formData,
      stocksAndBonds: [
        ...(formData.stocksAndBonds || []),
        newPropertyStocksBonds,
      ],
    };

    setFormData(updatedFormDataStocksBonds);
    setNumbShares(0);
    setNumbofSecurities(0);
    setCost(0);
    setMarketValue(0);
    setDateofQuoatation("");
    setTotalValue(0);
    setOpenModalStocksBonds(false);
  };

  const [selectedPropertiesPersonal, setSelectedPropertiesPersonal] = useState(
    formData.realEstate || []
  );

  const [realEstateType, setRealEstateType] = useState(0);
  const [address, setAddress] = useState(0);
  const [costPersonal, setCostPersonal] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState(0);
  const [originalCost, setOriginalCost] = useState(0);
  const [presentMarketValue, setPresentMarketValue] = useState(0);
  const [nameAddress, setNameAddress] = useState(0);
  const [AmountPayment, setAmountPayment] = useState(0);
  const [statusMortgage, setStatusMortgage] = useState(0);
  const [openModalPersonal, setOpenModalPersonal] = useState(false);
  const stylePersonal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    height: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const handleDeleteRowPersonal = (index) => {
    const updatedProperties = selectedProperties.filter((_, i) => i !== index);

    setSelectedPropertiesPersonal(updatedProperties);
    setFormData({
      ...formData,
      realEstate: updatedProperties,
    });
  };
  const getTotalPropertiesPersonal = () => {
    return selectedPropertiesPersonal.reduce(
      (total, property) => total + Number(property.numProperties),
      0
    );
  };
  const handleAddPropertyPersonal = () => {
    setSelectedPropertiesPersonal([
      ...selectedPropertiesPersonal,
      {
        realEstateType,
        address,
        costPersonal,
        purchaseDate,
        originalCost,
        presentMarketValue,
        nameAddress,
        AmountPayment,
        statusMortgage,
      },
    ]);

    const newPropertyPersonal = {
      realEstateType,
      address,
      costPersonal,
      purchaseDate,
      originalCost,
      presentMarketValue,
      nameAddress,
      AmountPayment,
      statusMortgage,
    };

    const updatedFormDataPersonal = {
      ...formData,
      realEstate: [
        ...(Array.isArray(formData.realEstate) ? formData.realEstate : []),
        newPropertyPersonal,
      ],
    };

    setFormData(updatedFormDataPersonal);

    // Reset fields
    setRealEstateType(0);
    setAddress(0);
    setCostPersonal(0);
    setPurchaseDate(0);
    setOriginalCost(0);
    setPresentMarketValue(0);
    setNameAddress(0);
    setAmountPayment(0);
    setStatusMortgage(0);

    // Ensure modal closes after updating the state
    setOpenModalPersonal(false);
  };

  return (
    <div style={{ width: "100%" }}>
      {" "}
      {/* <CheckoutSteps step1></CheckoutSteps> */}
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Finance Information
        </Typography>
        {/* <Typography variant="subtitle1" color="black" gutterBottom>
          Please review the borrowers of this loan
        </Typography> */}
        <Divider style={{ color: "black", marginBottom: 10 }} />
        <Typography variant="h4" color="black" gutterBottom>
          PERSONAL FINANCIAL STATEMENT - ASSETS{" "}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Cash on Hand & in Banks
              </Typography>
              <TextField
                value={formData.cashonHand || ""}
                size="large"
                type="number"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cashonHand: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                sx={{
                  "& input[type='number']": {
                    "-webkit-appearance": "none",
                    "-moz-appearance": "textfield",
                    appearance: "none",
                  },
                  "& input::-webkit-outer-spin-button": {
                    appearance: "none",
                    margin: 0,
                  },
                  "& input::-webkit-inner-spin-button": {
                    appearance: "none",
                    margin: 0,
                  },
                }}
                error={fieldErrors.cashonHand}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.cashonHand}</span>}
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Savings Accounts
              </Typography>
              <TextField
                value={formData.savingsAccounts || ""}
                size="large"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    savingsAccounts: e.target.value,
                  })
                }
                err
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                error={fieldErrors.savingsAccounts}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.savingsAccounts}</span>}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                IRA or Other Retirement Account
              </Typography>
              <TextField
                value={formData.retirementAccount || ""}
                size="large"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    retirementAccount: e.target.value,
                  })
                }
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                error={fieldErrors.retirementAccount}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.retirementAccount}</span>}
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Accounts & Notes Receivable
              </Typography>
              <TextField
                value={formData.notesReceivable || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    notesReceivable: e.target.value,
                  })
                }
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
                error={fieldErrors.notesReceivable}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.notesReceivable}</span>}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Cash Surrender Value Only
              </Typography>
              <TextField
                value={formData.lifeInsurance || ""}
                size="large"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lifeInsurance: e.target.value,
                  })
                }
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
                error={fieldErrors.lifeInsurance}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.lifeInsurance}</span>}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Stocks and Bonds
              </Typography>
              <TextField
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stocksBonds: e.target.value,
                  })
                }
                value={formData.stocksBonds || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
                error={fieldErrors.stocksBonds}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.stocksBonds}</span>}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Real Estate
              </Typography>
              <TextField
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    realEstateAssets: e.target.value,
                  })
                }
                value={formData.realEstateAssets || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
                error={fieldErrors.realEstateAssets}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.realEstateAssets}</span>}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Automobiles
              </Typography>
              <TextField
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    automobiles: e.target.value,
                  })
                }
                value={formData.automobiles || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                error={fieldErrors.automobiles}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.automobiles}</span>}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Other Personal Property
              </Typography>
              <TextField
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    otherPersonalProperty: e.target.value,
                  })
                }
                value={formData.otherPersonalProperty || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                error={fieldErrors.otherPersonalProperty}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.otherPersonalProperty}</span>}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Other Assets
              </Typography>
              <TextField
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    otherAssets: e.target.value,
                  })
                }
                value={formData.otherAssets || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
                error={fieldErrors.otherAssets}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.otherAssets}</span>}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography type="p" color="black">
              Total Assets
            </Typography>
            <FormControl fullWidth>
              <TextField
                value={`$${sum}`} // Display the calculated sum
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                style={{ backgroundColor: "white" }}
                variant="outlined"
                disabled // Disable editing
              />
            </FormControl>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          PERSONAL FINANCIAL STATEMENT - LIABILITIES
        </Typography>
        <Typography variant="subtitle1" color="black" gutterBottom></Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Accounts Payable
              </Typography>
              <TextField
                value={formData.accountsPayable || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accountsPayable: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
                error={fieldErrors.accountsPayable}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.accountsPayable}</span>}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Notes Payable to Banks and Others
              </Typography>
              <TextField
                value={formData.StocksBonds || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    StocksBonds: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
                error={fieldErrors.StocksBonds}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.StocksBonds}</span>}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Installment Account
              </Typography>
              <TextField
                value={formData.installmentAccount || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    installmentAccount: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
                error={fieldErrors.installmentAccount}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.installmentAccount}</span>}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Loan(s) Against Life Insurance
              </Typography>
              <TextField
                value={formData.loanInsurance || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    loanInsurance: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
                error={fieldErrors.loanInsurance}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.loanInsurance}</span>}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Mortgages on Real Estate
              </Typography>
              <TextField
                value={formData.mortgagesRealEstate || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    mortgagesRealEstate: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
                error={fieldErrors.mortgagesRealEstate}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.mortgagesRealEstate}</span>}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Unpaid Taxes
              </Typography>
              <TextField
                value={formData.unpaidTaxes || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    unpaidTaxes: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
                error={fieldErrors.unpaidTaxes}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.unpaidTaxes}</span>}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Other Liabilities
              </Typography>
              <TextField
                value={formData.otherLiabilities || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    otherLiabilities: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
                error={fieldErrors.otherLiabilities}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.otherLiabilities}</span>}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography type="p" color="black">
              Total Liabilities
            </Typography>
            <FormControl fullWidth>
              <TextField
                value={`$${sumLiability}`} // Display the calculated sum
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                style={{ backgroundColor: "white" }}
                variant="outlined"
                disabled // Disable editing
              />
            </FormControl>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          PERSONAL FINANCIAL STATEMENT - Source of Income and Contingent
          Liabilities
        </Typography>
        <Typography variant="subtitle1" color="black" gutterBottom>
          Source of Income
        </Typography>
        <Grid container spacing={2} style={{}}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Salary
              </Typography>
              <TextField
                value={formData.salary || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    salary: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
                error={fieldErrors.salary}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.salary}</span>}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Net Investment Income
              </Typography>
              <TextField
                value={formData.netInvestmentIncome || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    netInvestmentIncome: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
                error={fieldErrors.netInvestmentIncome}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.netInvestmentIncome}</span>}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Real Estate Income
              </Typography>
              <TextField
                value={formData.realEstateIncomeSource || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    realEstateIncomeSource: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
                error={fieldErrors.realEstateIncomeSource}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.realEstateIncomeSource}</span>}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Other Income (Describe below)
              </Typography>
              <TextField
                value={formData.otherIncome || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    otherIncome: e.target.value,
                  })
                }
                multiline
                rows={6}
                error={fieldErrors.otherIncome}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.otherIncome}</span>}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Typography variant="h4" color="black" gutterBottom></Typography>
        <Typography variant="subtitle1" color="black" gutterBottom>
          Contingent Liabilities
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                As Endorser or Co-Maker
              </Typography>
              <TextField
                value={formData.coMaker || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    coMaker: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
                error={fieldErrors.coMaker}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.coMaker}</span>}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Net Investment Income
              </Typography>
              <TextField
                value={formData.netInvestmentIncomeLiab || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    netInvestmentIncomeLiab: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
                error={fieldErrors.netInvestmentIncomeLiab}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.netInvestmentIncomeLiab}</span>}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Legal Claims & Judgments
              </Typography>
              <TextField
                value={formData.legalClaims || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    legalClaims: e.target.value,
                  })
                }
                variant="outlined"
                error={fieldErrors.legalClaims}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.legalClaims}</span>}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Provision for Federal Income Tax
              </Typography>
              <TextField
                value={formData.provisionFederalIncomeTax || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    provisionFederalIncomeTax: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="outlined"
                error={fieldErrors.provisionFederalIncomeTax}
                style={{ backgroundColor: "white" }}
                helperText={
                  <span>{fieldErrors.provisionFederalIncomeTax}</span>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              {" "}
              <Typography type="p" color="black">
                Other Special Debt
              </Typography>
              <TextField
                value={formData.otherSpecialDebt || ""}
                size="large"
                InputLabelProps={{
                  style: { fontSize: 15, fontWeight: 100 },
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    otherSpecialDebt: e.target.value,
                  })
                }
                multiline
                rows={6}
                error={fieldErrors.otherSpecialDebt}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.otherSpecialDebt}</span>}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          PERSONAL FINANCIAL STATEMENT - Notes Payable
        </Typography>

        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Button
              variant="contained"
              color="primary"
              style={{
                backgroundColor: "#498dd6",
              }}
              startIcon={<AddIcon />}
              onClick={() => setOpenModal(true)}
            >
              Add Notes Payable
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} style={{ marginBottom: 10 }}>
            <Paper style={{ padding: 10, overflowX: "auto" }}>
              <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        Names and Addresses of Noteholder(s)
                      </TableCell>
                      <TableCell>Original Balance</TableCell>
                      <TableCell>Current Balance</TableCell>
                      <TableCell>Payment Amount</TableCell>
                      <TableCell>Frequency (monthly, etc.)</TableCell>
                      <TableCell>
                        How Secured or Endorsed Type of Collateral
                      </TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedProperties.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          No Rows to Show
                        </TableCell>
                      </TableRow>
                    ) : (
                      selectedProperties.map((property, index) => (
                        <TableRow key={index}>
                          <TableCell>{property.ownersName}</TableCell>
                          <TableCell>{property.balance}</TableCell>
                          <TableCell>{property.currentBalance}</TableCell>
                          <TableCell>{property.paymentAmount}</TableCell>
                          <TableCell>{property.frequencey}</TableCell>
                          <TableCell>{property.howSecured}</TableCell>
                          <TableCell>
                            <IconButton onClick={() => handleDeleteRow(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography type="p" color="black">
                  Names and Addresses of Noteholder(s){" "}
                </Typography>{" "}
                <TextField
                  fullWidth
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setOwnersName(e.target.value)}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography type="p" color="black">
                  Original Balance
                </Typography>
                <TextField
                  fullWidth
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setBalance(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography type="p" color="black">
                  Current Balance
                </Typography>
                <TextField
                  fullWidth
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setCurrentBalance(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography type="p" color="black">
                  Payment Amount
                </Typography>
                <TextField
                  fullWidth
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography type="p" color="black">
                  Frequency (monthly, etc.)
                </Typography>
                <TextField
                  fullWidth
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setFrequencey(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography type="p" color="black">
                  How Secured or Endorsed Type of Collateral
                </Typography>
                <TextField
                  fullWidth
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setHowSecured(e.target.value)}
                />
              </FormControl>
            </Grid>

            <Button
              variant="contained"
              style={{
                backgroundColor: "#498dd6",
                paddingBottom: 10,
                marginTop: 10,
                marginLeft: 10,
              }}
              onClick={handleAddProperty}
            >
              Add
            </Button>
          </Grid>
        </Box>
      </Modal>
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          PERSONAL FINANCIAL STATEMENT - Stocks and Bonds
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Button
              variant="contained"
              color="primary"
              style={{
                marginTop: 10,
                backgroundColor: "#498dd6",
              }}
              startIcon={<AddIcon />}
              onClick={() => setOpenModalStocksBonds(true)}
            >
              Add Stocks and Bonds
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} style={{ marginBottom: 10 }}>
            <Paper style={{ padding: 10, overflowX: "auto" }}>
              <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Number of Shares</TableCell>
                      <TableCell>Name of Securities</TableCell>
                      <TableCell>Cost</TableCell>
                      <TableCell>Market Value Quotation/Exchange</TableCell>
                      <TableCell>Date of Quotation/Exchange</TableCell>
                      <TableCell>Total Value</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedPropertiesStocksBonds.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          No Rows to Show
                        </TableCell>
                      </TableRow>
                    ) : (
                      selectedPropertiesStocksBonds.map((property, index) => (
                        <TableRow key={index}>
                          <TableCell>{property.numbShares}</TableCell>
                          <TableCell>{property.numbofSecurities}</TableCell>
                          <TableCell>{property.cost}</TableCell>
                          <TableCell>{property.marketValue}</TableCell>
                          <TableCell>{property.dateofQuoatation}</TableCell>
                          <TableCell>{property.totalValue}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => handleDeleteRowStocksBonds(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Modal
        open={openModalStocksBonds}
        onClose={() => setOpenModalStocksBonds(false)}
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography type="p" color="black">
                  Number of Shares
                </Typography>{" "}
                <TextField
                  fullWidth
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setNumbShares(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography type="p" color="black">
                  Name of Securities
                </Typography>{" "}
                <TextField
                  fullWidth
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setNumbofSecurities(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography type="p" color="black">
                  Cost
                </Typography>{" "}
                <TextField
                  fullWidth
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setCost(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography type="p" color="black">
                  Market Value Quotation/Exchange
                </Typography>{" "}
                <TextField
                  fullWidth
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setMarketValue(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography type="p" color="black">
                  Date of Quotation/Exchange
                </Typography>{" "}
                <TextField
                  fullWidth
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setDateofQuoatation(e.target.value)}
                  label=""
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography type="p" color="black">
                  Total Value
                </Typography>{" "}
                <TextField
                  fullWidth
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setTotalValue(e.target.value)}
                />
              </FormControl>
            </Grid>

            <Button
              variant="contained"
              style={{
                backgroundColor: "#498dd6",
                paddingBottom: 10,
                marginTop: 10,
                marginLeft: 10,
              }}
              onClick={handleAddPropertyStocksBonds}
            >
              Add
            </Button>
          </Grid>
        </Box>
      </Modal>
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          PERSONAL FINANCIAL STATEMENT
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Button
              variant="contained"
              color="primary"
              style={{
                backgroundColor: "#498dd6",
              }}
              startIcon={<AddIcon />}
              onClick={() => setOpenModalPersonal(true)}
            >
              Add Property
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} style={{ marginBottom: 10 }}>
            <Paper style={{ padding: 10, overflowX: "auto" }}>
              <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        Type of Real Estate (e.g. Primary Residence, Other
                        Residence, Rental Property, Land, etc.)
                      </TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Cost</TableCell>
                      <TableCell>Date Purchased</TableCell>
                      <TableCell>Original Cost</TableCell>
                      <TableCell>Present Market Value</TableCell>
                      <TableCell>Name & Address of Mortgage Holder</TableCell>
                      <TableCell>Amount of Payment per Month/Year</TableCell>
                      <TableCell>Status of Mortgage</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedPropertiesPersonal.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} align="center">
                          No Rows to Show
                        </TableCell>
                      </TableRow>
                    ) : (
                      selectedPropertiesPersonal.map((property, index) => (
                        <TableRow key={index}>
                          <TableCell>{property.realEstateType}</TableCell>
                          <TableCell>{property.address}</TableCell>
                          <TableCell>{property.costPersonal}</TableCell>
                          <TableCell>{property.purchaseDate}</TableCell>
                          <TableCell>{property.originalCost}</TableCell>
                          <TableCell>{property.presentMarketValue}</TableCell>
                          <TableCell>{property.nameAddress}</TableCell>
                          <TableCell>{property.AmountPayment}</TableCell>
                          <TableCell>{property.statusMortgage}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => handleDeleteRowPersonal(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Modal
        open={openModalPersonal}
        onClose={() => setOpenModalPersonal(false)}
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography type="p" color="black">
                  Type of Real Estate
                </Typography>{" "}
                <TextField
                  fullWidth
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setRealEstateType(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography type="p" color="black">
                  Address
                </Typography>{" "}
                <TextField
                  fullWidth
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography type="p" color="black">
                  Cost
                </Typography>{" "}
                <TextField
                  fullWidth
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setCostPersonal(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography type="p" color="black">
                  Date Purchased
                </Typography>{" "}
                <TextField
                  fullWidth
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography type="p" color="black">
                  Original Cost
                </Typography>{" "}
                <TextField
                  fullWidth
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setOriginalCost(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography type="p" color="black">
                  Present Market Value
                </Typography>{" "}
                <TextField
                  fullWidth
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setPresentMarketValue(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography type="p" color="black">
                  Name & Address of Mortgage Holder
                </Typography>{" "}
                <TextField
                  fullWidth
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setNameAddress(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography type="p" color="black">
                  Amount of Payment per Month/Year
                </Typography>{" "}
                <TextField
                  fullWidth
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setAmountPayment(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <Typography type="p" color="black">
                  Status of Mortgage
                </Typography>{" "}
                <TextField
                  fullWidth
                  size="large"
                  InputLabelProps={{
                    style: { fontSize: 15, fontWeight: 100 },
                  }}
                  onChange={(e) => setStatusMortgage(e.target.value)}
                />
              </FormControl>
            </Grid>

            <Button
              variant="contained"
              style={{
                backgroundColor: "#498dd6",
                paddingBottom: 10,
                marginTop: 10,
                marginLeft: 10,
              }}
              onClick={handleAddPropertyPersonal}
            >
              Add
            </Button>
          </Grid>
        </Box>
      </Modal>
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          PERSONAL FINANCIAL STATEMENT - Other Information
        </Typography>

        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Other Personal Property and Other Assets.
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.otherAssets || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      otherAssets: e.target.value,
                    })
                  }
                  style={{ backgroundColor: "white" }}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid> */}
          {/* <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Unpaid Taxes
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.unpaidTaxes || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      unpaidTaxes: e.target.value,
                    })
                  }
                  style={{ backgroundColor: "white" }}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid> */}
          {/* <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Other Liabilities
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.otherLiabilities || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      otherLiabilities: e.target.value,
                    })
                  }
                  style={{ backgroundColor: "white" }}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid> */}
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Life Insurance Held
              </Typography>
              <Grid item sm={12}>
                {" "}
                <TextField
                  value={formData.lifeInsuranceHeld || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lifeInsuranceHeld: e.target.value,
                    })
                  }
                  style={{ backgroundColor: "white" }}
                  variant="outlined"
                  fullWidth

                  // Add more props as needed
                />
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default FinanceProjectEpic99;
