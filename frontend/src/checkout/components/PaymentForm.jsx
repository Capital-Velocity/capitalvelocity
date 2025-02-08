import * as React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import SimCardRoundedIcon from "@mui/icons-material/SimCardRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Grid from "@mui/material/Grid2";
import { Select, MenuItem } from "@mui/material";

// const Card = styled(MuiCard)(({ theme }) => ({
//   border: "1px solid",
//   borderColor: (theme.vars || theme).palette.divider,
//   width: "100%",
//   "&:hover": {
//     background:
//       "linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)",
//     borderColor: "primary.light",
//     boxShadow: "0px 2px 8px hsla(0, 0%, 0%, 0.1)",
//     ...theme.applyStyles("dark", {
//       background:
//         "linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)",
//       borderColor: "primary.dark",
//       boxShadow: "0px 1px 8px hsla(210, 100%, 25%, 0.5) ",
//     }),
//   },
//   [theme.breakpoints.up("md")]: {
//     flexGrow: 1,
//     maxWidth: `calc(50% - ${theme.spacing(1)})`,
//   },
//   variants: [
//     {
//       props: ({ selected }) => selected,
//       style: {
//         borderColor: (theme.vars || theme).palette.primary.light,
//         ...theme.applyStyles("dark", {
//           borderColor: (theme.vars || theme).palette.primary.dark,
//         }),
//       },
//     },
//   ],
// }));

// const PaymentContainer = styled("div")(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "space-between",
//   width: "100%",
//   height: 375,
//   padding: theme.spacing(3),
//   borderRadius: `calc(${theme.shape.borderRadius}px + 4px)`,
//   border: "1px solid ",
//   borderColor: (theme.vars || theme).palette.divider,
//   background:
//     "linear-gradient(to bottom right, hsla(220, 35%, 97%, 0.3) 25%, hsla(220, 20%, 88%, 0.3) 100%)",
//   boxShadow: "0px 4px 8px hsla(210, 0%, 0%, 0.05)",
//   [theme.breakpoints.up("xs")]: {
//     height: 300,
//   },
//   [theme.breakpoints.up("sm")]: {
//     height: 350,
//   },
//   ...theme.applyStyles("dark", {
//     background:
//       "linear-gradient(to right bottom, hsla(220, 30%, 6%, 0.2) 25%, hsla(220, 20%, 25%, 0.2) 100%)",
//     boxShadow: "0px 4px 8px hsl(220, 35%, 0%)",
//   }),
// }));

// const FormGrid = styled("div")(() => ({
//   display: "flex",
//   flexDirection: "column",
// }));

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function PaymentForm({ paymentData, setPaymentData }) {
  // const [paymentType, setPaymentType] = React.useState("creditCard");
  // const [cardNumber, setCardNumber] = React.useState("");
  // const [cvv, setCvv] = React.useState("");
  // const [expirationDate, setExpirationDate] = React.useState("");

  // const handlePaymentTypeChange = (event) => {
  //   setPaymentType(event.target.value);
  // };

  // const handleCardNumberChange = (event) => {
  //   const value = event.target.value.replace(/\D/g, "");
  //   const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
  //   if (value.length <= 16) {
  //     setCardNumber(formattedValue);
  //   }
  // };

  // const handleCvvChange = (event) => {
  //   const value = event.target.value.replace(/\D/g, "");
  //   if (value.length <= 3) {
  //     setCvv(value);
  //   }
  // };

  // const handleExpirationDateChange = (event) => {
  //   const value = event.target.value.replace(/\D/g, "");
  //   const formattedValue = value.replace(/(\d{2})(?=\d{2})/, "$1/");
  //   if (value.length <= 4) {
  //     setExpirationDate(formattedValue);
  //   }
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12, md: 12 }}>
        <FormLabel htmlFor="credit-score" required>
          Credit Score
        </FormLabel>
        <Select
          id="credit-score"
          name="creditScore"
          value={paymentData.creditScore || ""}
          onChange={handleChange}
          required
          size="small"
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select a credit score
          </MenuItem>
          <MenuItem value="720+">720+</MenuItem>
          <MenuItem value="680-719">680-719</MenuItem>
          <MenuItem value="650-679">650-679</MenuItem>
          <MenuItem value="600-649">600-649</MenuItem>
          <MenuItem value="599-below">599 or Below</MenuItem>
        </Select>
      </FormGrid>

      <FormGrid size={{ xs: 12, md: 12 }}>
        <FormLabel htmlFor="industry" required>
          Industry
        </FormLabel>
        <Select
          id="industry"
          name="industry"
          value={paymentData.industry || ""}
          onChange={handleChange}
          required
          size="medium"
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select an industry
          </MenuItem>
          {[
            "Adult",
            "Advertising",
            "Aerospace / Defense",
            "Agriculture",
            "Apparel",
            "Auction",
            "Auto",
            "Auto Repair",
            "Auto Sales",
            "Aviation",
            "Banking",
            "Bar / Nightclub",
            "Beauty / Nail Salon",
            "Biotechnology",
            "Broker / Re-Sellers - Coin, Ticket, Pawn Shop",
            "Business Services",
            "Call Center",
            "Cannabis",
            "Car Rental",
            "Casino / Gambling / Sports Clubs",
            "Cell Phone Sales",
            "Chemicals",
            "Cleaning",
            "Communications",
            "Construction",
            "Consulting",
            "Contractor - General",
            "Contractor - Painting",
            "Contractor - Paving",
            "Contractor - Plumbing",
            "Contractor - Roofing",
            "Convenience Store",
            "Courier Service",
            "Day Care / Child Care",
            "Dental",
            "Design",
            "Detective",
            "Dry Cleaner",
            "E-Commerce - No Inventory / Drop Shipping",
            "Education",
            "Electrician",
            "Electronics",
            "Electronic Sales",
            "Energy",
            "Engineering",
            "Entertainment",
            "Environmental",
            "Environmental Services",
            "Equipment Rental",
            "Equipment Sales",
            "Equipment Service / Repair",
            "Farming / Agriculture",
            "Finance",
            "Financial - Collection / Money Services",
            "Financial Services",
            "Fire Arms / Ammunition",
            "Fitness Center",
            "Florist",
            "Food / Beverage",
            "Fuel Delivery",
            "Funeral Home",
            "Furniture Store",
            "Gas Station",
            "Government",
            "Grocery Store",
            "Healthcare",
            "Home Healthcare",
            "Hospitality",
            "HVAC",
            "Import / Export",
            "Insurance",
            "Janitorial",
            "Junk Yard",
            "Landscaping",
            "Legal Services / Law Firm",
            "Liquor Store",
            "Logging",
            "Machinery",
            "Manufacturing",
            "Marketing",
            "Massage Therapy",
            "Media",
            "Medical",
            "Medical Spa",
            "Medical Training",
            "Mineral / Oil Mining Exploration",
            "Non for Profit",
            "Not For Profit",
            "Nursery",
            "Optometrist",
            "Other",
            "Pest Control",
            "Pet Groomer",
            "Pharmacy",
            "Photography",
            "Plastic Surgeon",
            "Plumbing",
            "Primary Care",
            "Printing",
            "Professional Services",
            "Property Management",
            "Real Estate",
            "Recreation",
            "Religious Institute",
            "Restaurant",
            "Retail",
            "Salon",
            "School/Education",
            "Security",
            "Shipping",
            "Sign Language Interpretation",
            "Smoke / Tobacco / Vape shops",
            "Staffing",
            "Storage",
            "Technology",
            "Telecommunications",
            "Towing",
            "Transportation",
            "Travel",
            "Trucking",
            "Uber / Lyft / Taxi",
            "Utilities",
            "Veterinarian",
            "Waste Management",
            "Wholesale / Distributor",
            "Window Tinting",
          ].map((industry) => (
            <MenuItem key={industry} value={industry}>
              {industry}
            </MenuItem>
          ))}
        </Select>
      </FormGrid>

      <FormGrid size={{ xs: 12, md: 12 }}>
        <FormLabel htmlFor="time-in-business" required>
          Time in Business
        </FormLabel>
        <Select
          id="time-in-business"
          name="timeInBusiness"
          value={paymentData.timeInBusiness || ""}
          onChange={handleChange}
          required
          size="small"
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select length
          </MenuItem>
          {[
            "Less than 6 Months",
            "1 Year",
            "2 Years",
            "3 Years",
            "4 Years",
            "5 Years",
            "6 Years",
            "7 Years",
            "8 Years",
            "9 Years",
            "10 or more Years",
          ].map((time) => (
            <MenuItem key={time} value={time}>
              {time}
            </MenuItem>
          ))}
        </Select>
      </FormGrid>

      <FormGrid size={{ xs: 12, md: 12 }}>
        <FormLabel htmlFor="annual-sales" required>
          Annual Sales
        </FormLabel>
        <Select
          id="annual-sales"
          name="annualSales"
          value={paymentData.annualSales || ""}
          onChange={handleChange}
          required
          size="small"
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select annual sales
          </MenuItem>
          {[
            "Under $50,000",
            "$50,000 - $120,000",
            "$120,000 - $360,000",
            "$360,000 - $1,000,000",
            "$1,000,000 - $1,800,000",
            "$1,800,000 - $3,000,000",
            "$3,000,000+",
          ].map((sales) => (
            <MenuItem key={sales} value={sales}>
              {sales}
            </MenuItem>
          ))}
        </Select>
      </FormGrid>

      <FormGrid size={{ xs: 12, md: 12 }}>
        <FormLabel htmlFor="product" required>
          Product
        </FormLabel>
        <Select
          id="product"
          name="product"
          value={paymentData.product || ""}
          onChange={handleChange}
          required
          size="small"
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select a product
          </MenuItem>
          {[
            "Working Capital",
            "Line of Credit",
            "SBA",
            "AR / Factoring",
            "Commercial Real Estate",
            "Equipment Financing",
            "Purchase Order Financing",
            "Inventory Financing",
            "Residential Investment Property",
          ].map((product) => (
            <MenuItem key={product} value={product}>
              {product}
            </MenuItem>
          ))}
        </Select>
      </FormGrid>

      <FormGrid size={{ xs: 12 }}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" value="yes" />}
          label="By checking this checkbox I agree to the terms of use, privacy policy as well as receiving SMS, email and phone communication."
        />
      </FormGrid>

      {/* <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="zip" required>
          Zip / Postal code
        </FormLabel>
        <OutlinedInput
          id="zip"
          name="zip"
          type="zip"
          placeholder="12345"
          autoComplete="shipping postal-code"
          required
          size="small"
        />
      </FormGrid> */}
      {/* <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="country" required>
          Country
        </FormLabel>
        <OutlinedInput
          id="country"
          name="country"
          type="country"
          placeholder="United States"
          autoComplete="shipping country"
          required
          size="small"
        />
      </FormGrid> */}
      {/* <FormGrid size={{ xs: 12 }}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" value="yes" />}
          label="Use this address for payment details"
        />
      </FormGrid> */}
    </Grid>

    // <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
    //   <FormControl component="fieldset" fullWidth>
    //     <RadioGroup
    //       aria-label="Payment options"
    //       name="paymentType"
    //       value={paymentType}
    //       onChange={handlePaymentTypeChange}
    //       sx={{
    //         display: 'flex',
    //         flexDirection: { xs: 'column', sm: 'row' },
    //         gap: 2,
    //       }}
    //     >
    //       <Card selected={paymentType === 'creditCard'}>
    //         <CardActionArea
    //           onClick={() => setPaymentType('creditCard')}
    //           sx={{
    //             '.MuiCardActionArea-focusHighlight': {
    //               backgroundColor: 'transparent',
    //             },
    //             '&:focus-visible': {
    //               backgroundColor: 'action.hover',
    //             },
    //           }}
    //         >
    //           <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    //             <CreditCardRoundedIcon
    //               fontSize="small"
    //               sx={[
    //                 (theme) => ({
    //                   color: 'grey.400',
    //                   ...theme.applyStyles('dark', {
    //                     color: 'grey.600',
    //                   }),
    //                 }),
    //                 paymentType === 'creditCard' && {
    //                   color: 'primary.main',
    //                 },
    //               ]}
    //             />
    //             <Typography sx={{ fontWeight: 'medium' }}>Card</Typography>
    //           </CardContent>
    //         </CardActionArea>
    //       </Card>
    //       <Card selected={paymentType === 'bankTransfer'}>
    //         <CardActionArea
    //           onClick={() => setPaymentType('bankTransfer')}
    //           sx={{
    //             '.MuiCardActionArea-focusHighlight': {
    //               backgroundColor: 'transparent',
    //             },
    //             '&:focus-visible': {
    //               backgroundColor: 'action.hover',
    //             },
    //           }}
    //         >
    //           <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    //             <AccountBalanceRoundedIcon
    //               fontSize="small"
    //               sx={[
    //                 (theme) => ({
    //                   color: 'grey.400',
    //                   ...theme.applyStyles('dark', {
    //                     color: 'grey.600',
    //                   }),
    //                 }),
    //                 paymentType === 'bankTransfer' && {
    //                   color: 'primary.main',
    //                 },
    //               ]}
    //             />
    //             <Typography sx={{ fontWeight: 'medium' }}>Bank account</Typography>
    //           </CardContent>
    //         </CardActionArea>
    //       </Card>
    //     </RadioGroup>
    //   </FormControl>
    //   {paymentType === 'creditCard' && (
    //     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    //       <PaymentContainer>
    //         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
    //           <Typography variant="subtitle2">Credit card</Typography>
    //           <CreditCardRoundedIcon sx={{ color: 'text.secondary' }} />
    //         </Box>
    //         <SimCardRoundedIcon
    //           sx={{
    //             fontSize: { xs: 48, sm: 56 },
    //             transform: 'rotate(90deg)',
    //             color: 'text.secondary',
    //           }}
    //         />
    //         <Box
    //           sx={{
    //             display: 'flex',
    //             justifyContent: 'space-between',
    //             width: '100%',
    //             gap: 2,
    //           }}
    //         >
    //           <FormGrid sx={{ flexGrow: 1 }}>
    //             <FormLabel htmlFor="card-number" required>
    //               Card number
    //             </FormLabel>
    //             <OutlinedInput
    //               id="card-number"
    //               autoComplete="card-number"
    //               placeholder="0000 0000 0000 0000"
    //               required
    //               size="small"
    //               value={cardNumber}
    //               onChange={handleCardNumberChange}
    //             />
    //           </FormGrid>
    //           <FormGrid sx={{ maxWidth: '20%' }}>
    //             <FormLabel htmlFor="cvv" required>
    //               CVV
    //             </FormLabel>
    //             <OutlinedInput
    //               id="cvv"
    //               autoComplete="CVV"
    //               placeholder="123"
    //               required
    //               size="small"
    //               value={cvv}
    //               onChange={handleCvvChange}
    //             />
    //           </FormGrid>
    //         </Box>
    //         <Box sx={{ display: 'flex', gap: 2 }}>
    //           <FormGrid sx={{ flexGrow: 1 }}>
    //             <FormLabel htmlFor="card-name" required>
    //               Name
    //             </FormLabel>
    //             <OutlinedInput
    //               id="card-name"
    //               autoComplete="card-name"
    //               placeholder="John Smith"
    //               required
    //               size="small"
    //             />
    //           </FormGrid>
    //           <FormGrid sx={{ flexGrow: 1 }}>
    //             <FormLabel htmlFor="card-expiration" required>
    //               Expiration date
    //             </FormLabel>
    //             <OutlinedInput
    //               id="card-expiration"
    //               autoComplete="card-expiration"
    //               placeholder="MM/YY"
    //               required
    //               size="small"
    //               value={expirationDate}
    //               onChange={handleExpirationDateChange}
    //             />
    //           </FormGrid>
    //         </Box>
    //       </PaymentContainer>
    //       <FormControlLabel
    //         control={<Checkbox name="saveCard" />}
    //         label="Remember credit card details for next time"
    //       />
    //     </Box>
    //   )}
    //   {paymentType === 'bankTransfer' && (
    //     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    //       <Alert severity="warning" icon={<WarningRoundedIcon />}>
    //         Your order will be processed once we receive the funds.
    //       </Alert>
    //       <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
    //         Bank account
    //       </Typography>
    //       <Typography variant="body1" gutterBottom>
    //         Please transfer the payment to the bank account details shown below.
    //       </Typography>
    //       <Box sx={{ display: 'flex', gap: 1 }}>
    //         <Typography variant="body1" sx={{ color: 'text.secondary' }}>
    //           Bank:
    //         </Typography>
    //         <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
    //           Mastercredit
    //         </Typography>
    //       </Box>
    //       <Box sx={{ display: 'flex', gap: 1 }}>
    //         <Typography variant="body1" sx={{ color: 'text.secondary' }}>
    //           Account number:
    //         </Typography>
    //         <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
    //           123456789
    //         </Typography>
    //       </Box>
    //       <Box sx={{ display: 'flex', gap: 1 }}>
    //         <Typography variant="body1" sx={{ color: 'text.secondary' }}>
    //           Routing number:
    //         </Typography>
    //         <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
    //           987654321
    //         </Typography>
    //       </Box>
    //     </Box>
    //   )}
    // </Stack>
  );
}
