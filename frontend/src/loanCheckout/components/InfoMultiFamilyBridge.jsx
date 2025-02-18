import * as React from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { green } from "@mui/material/colors";

const products = [
  {
    name: "Professional plan",
    desc: "Monthly subscription",
    price: "$15.00",
  },
  {
    name: "Dedicated support",
    desc: "Included in the Professional plan",
    price: "Free",
  },
  {
    name: "Hardware",
    desc: "Devices needed for development",
    price: "$69.99",
  },
  {
    name: "Landing page template",
    desc: "License",
    price: "$49.99",
  },
];

function InfoMultiFamilyBridge({ totalPrice }) {
  return (
    <React.Fragment>
      {/* <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.name}
              secondary={product.desc}
            />
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              {product.price}
            </Typography>
          </ListItem>
        ))}
      </List> */}

      {/* <Info totalPrice={activeStep >= 2 ? "$144.97" : "$134.98"} /> */}
      <Typography
        variant="h5" // Larger heading for "Small Business Loan"
        style={{ color: "black", fontWeight: "bold" }}
        gutterBottom
      >
        Multifamily Bridge Loan
      </Typography>
      <Typography variant="body1" style={{ color: "black", fontSize: 14 }}>
        Acquiring a multifamily property often requires quick and flexible
        financing solutions to secure the deal before long-term funding is
        arranged. Our interim financing options provide fast access to capital,
        allowing investors to close on properties efficiently while structuring
        their long-term financial strategy.
      </Typography>
      <Typography
        variant="body1"
        style={{ color: "black", fontSize: 14, marginTop: "10px" }}
      >
        <Checkbox
          defaultChecked
          icon={<CheckBoxOutlineBlankIcon sx={{ color: green[400] }} />}
          checkedIcon={<CheckBoxIcon sx={{ color: green[400] }} />}
          sx={{
            transform: "scale(1.0)", // Keep checkbox size
          }}
        />
        Flexible Terms <br />
        <Checkbox
          defaultChecked
          icon={<CheckBoxOutlineBlankIcon sx={{ color: green[400] }} />}
          checkedIcon={<CheckBoxIcon sx={{ color: green[400] }} />}
          sx={{
            transform: "scale(1.0)", // Keep checkbox size
          }}
        />
        Low Interest Rates <br />{" "}
        <Checkbox
          defaultChecked
          icon={<CheckBoxOutlineBlankIcon sx={{ color: green[400] }} />}
          checkedIcon={<CheckBoxIcon sx={{ color: green[400] }} />}
          sx={{
            transform: "scale(1.0)", // Keep checkbox size
          }}
        />
        Fast Funding
      </Typography>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={trustPilotPic}
          alt="TrustPilot"
          style={{ width: "262px", height: "43px" }}
        />
      </div> */}
    </React.Fragment>
  );
}

InfoMultiFamilyBridge.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default InfoMultiFamilyBridge;
