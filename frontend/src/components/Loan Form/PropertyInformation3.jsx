import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "../CheckoutSteps";
import { Divider, FormHelperText } from "@mui/material";

function PropertyInformation3({ formData, setFormData, fieldErrors }) {
  const [selectedOption, setSelectedOption] = useState("no");
  const handleOptionChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value, // Update the specified field in formData with the selected value
    });
  };
  return (
    <div style={{ width: "100%" }}>
      {" "}
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Property Information
        </Typography>
        <Typography variant="subtitle1" color="black" gutterBottom>
          Please add a property and tell us how the property was sourced and how
          the loan will be repaid. Remember we do NOT lend on borrower occupied
          properties.
        </Typography>
        <Divider style={{ color: "black", marginBottom: 10 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                Property Purchase Price
              </Typography>
              <TextField
                value={formData.propertyPurchasePrice || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    propertyPurchasePrice: e.target.value,
                  })
                }
                variant="outlined"
                fullWidth
                type="number"
                error={fieldErrors.propertyPurchasePrice}
                style={{ backgroundColor: "white" }}
                helperText={<span>{fieldErrors.propertyPurchasePrice}</span>}
                // Add more props as needed
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                How is the property being sourced?
              </Typography>

              <Select
                style={{ backgroundColor: "white" }}
                error={fieldErrors.propertySource}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                helperText={<span>{fieldErrors.propertySource}</span>}
                value={formData.propertySource || ""}
                onChange={(e) =>
                  setFormData({ ...formData, propertySource: e.target.value })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"Short Sale"}>Short Sale</MenuItem>
                <MenuItem value={"REO"}>REO</MenuItem>
                <MenuItem value={"Wholesaler"}>Wholesaler</MenuItem>
                <MenuItem value={"Foreclosure Auction"}>
                  Foreclosure Auction
                </MenuItem>
                <MenuItem value={"Sheriff's Sale"}>Sheriff's Sale</MenuItem>
                <MenuItem value={"Estate Sale"}>Estate Sale</MenuItem>
                <MenuItem value={"Online Auction"}>Online Auction</MenuItem>
                <MenuItem value={"Bankruptcy Sale"}>Bankruptcy Sale</MenuItem>
                <MenuItem value={"MLS"}>MLS</MenuItem>
                <MenuItem value={"Pre-Foreclosure"}>Pre-Foreclosure</MenuItem>
                <MenuItem value={"Entity to Entity"}>Entity to Entity</MenuItem>
                <MenuItem value={"Inheritance"}>Inheritance</MenuItem>
                <MenuItem value={"Private Sale"}>Private Sale</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
              {/* FormHelperText to display the error message */}
              {fieldErrors.propertySource && (
                <FormHelperText error>
                  {fieldErrors.propertySource}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                How did the wholesaler source the property?
              </Typography>

              <Select
                style={{ backgroundColor: "white" }}
                error={fieldErrors.wholesalerSource}
                helperText={<span>{fieldErrors.wholesalerSource}</span>}
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                value={formData.wholesalerSource || ""}
                onChange={(e) =>
                  setFormData({ ...formData, wholesalerSource: e.target.value })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Entity Type"
              >
                <MenuItem value={"Short Sale"}>Short Sale</MenuItem>
                <MenuItem value={"REO"}>REO</MenuItem>
                <MenuItem value={"Wholesaler"}>Wholesaler</MenuItem>
                <MenuItem value={"Foreclosure Auction"}>
                  Foreclosure Auction
                </MenuItem>
                <MenuItem value={"Sheriff's Sale"}>Sheriff's Sale</MenuItem>
                <MenuItem value={"Estate Sale"}>Estate Sale</MenuItem>
                <MenuItem value={"Online Auction"}>Online Auction</MenuItem>
                <MenuItem value={"Bankruptcy Sale"}>Bankruptcy Sale</MenuItem>
                <MenuItem value={"MLS"}>MLS</MenuItem>
                <MenuItem value={"Pre-Foreclosure"}>Pre-Foreclosure</MenuItem>
                <MenuItem value={"Entity to Entity"}>Entity to Entity</MenuItem>
                <MenuItem value={"Inheritance"}>Inheritance</MenuItem>
                <MenuItem value={"Private Sale"}>Private Sale</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
              {fieldErrors.wholesalerSource && (
                <FormHelperText error>
                  {fieldErrors.wholesalerSource}
                </FormHelperText>
              )}
            </FormControl>
          </Grid> */}
          {/* <Grid item sm={6}>
            <FormControl fullWidth>
              <Typography type="p" color="black">
                How much did the wholesaler pay for the property?
              </Typography>
              <TextField
                style={{ backgroundColor: "white" }}
                error={fieldErrors.wholesalerPay}
                value={formData.wholesalerPay || ""}
                helperText={<span>{fieldErrors.wholesalerPay}</span>}
                size="large"
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                onChange={(e) =>
                  setFormData({ ...formData, wholesalerPay: e.target.value })
                }
                type="number"
                variant="outlined"
              />
            </FormControl>
          </Grid> */}
          {/* <Grid item sm={6}>
            <label
              style={{
                fontSize: 15,
                fontWeight: 300,
                color: fieldErrors.transactionArmslength ? "red" : "black",
              }}
            >
              Is the transaction arm’s length where buyer and seller are trying
              to get the best terms for their respective sides? *
            </label>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value="Yes" // Set the value to "Yes" when selected
                checked={formData.transactionArmslength === "Yes"} // Check if it's "Yes" in formData
                onChange={() =>
                  handleOptionChange("transactionArmslength", "Yes")
                }
                error={fieldErrors.transactionArmslength}
                helperText={<span>{fieldErrors.transactionArmslength}</span>}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value="No" // Set the value to "No" when selected
                checked={formData.transactionArmslength === "No"} // Check if it's "No" in formData
                onChange={() =>
                  handleOptionChange("transactionArmslength", "No")
                }
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid> */}

          {/* {formData.transactionArmslength === "Yes" && (
            <Grid item sm={6}>
              <TextField
                style={{ width: "500px", backgroundColor: "white" }}
                value={formData.buyerSellerDescribe || ""}
                size="large"
                InputLabelProps={{ style: { fontSize: 15, fontWeight: 100 } }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    buyerSellerDescribe: e.target.value,
                  })
                }
                label="Please describe"
                variant="outlined"
              />
            </Grid>
          )} */}
        </Grid>
      </Container>
    </div>
  );
}

export default PropertyInformation3;
