import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "../../screens/Container";
import Typography from "@mui/material/Typography";
import CheckoutSteps from "./CheckoutSteps3";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";

function SBA16({ formData, setFormData }) {
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setFormData({
      ...formData,
      armsLength: event.target.value,
    });
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>

      <Container>
        <Typography variant="h4" color="black" gutterBottom>
          Section III: Entity Owner Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              <strong>27.</strong>Is the Entity, or any of its owners, presently
              suspended, debarred, proposed for debarment, declared ineligible,
              or voluntarily excluded from participation in this transaction by
              any Federal department or agency? (If "Yes," the application is
              not eligible for SBA financial assistance).
            </label>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value={formData.authorizedSign || "yes"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedSign: e.target.value,
                  })
                }
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value={formData.authorizedSignNo || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedSignNo: e.target.value,
                  })
                }
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              <strong>28.</strong> Does the entity have any Affiliates? (If
              "Yes," attach a listing of all Affiliates.)
            </label>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value={formData.authorizedSign || "yes"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedSign: e.target.value,
                  })
                }
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value={formData.authorizedSignNo || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedSignNo: e.target.value,
                  })
                }
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              <strong>29.</strong> Has the entity and/or its Affiliates ever
              filed for bankruptcy protection?
            </label>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value={formData.authorizedSign || "yes"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedSign: e.target.value,
                  })
                }
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value={formData.authorizedSignNo || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedSignNo: e.target.value,
                  })
                }
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              <strong>30.</strong> Is the entity and/or its Affiliates presently
              involved in any pending legal action?
            </label>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value={formData.authorizedSign || "yes"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedSign: e.target.value,
                  })
                }
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value={formData.authorizedSignNo || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedSignNo: e.target.value,
                  })
                }
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              <strong>31.</strong> Has the Entity ever obtained a direct or
              guaranteed loan from SBA or any other Federal agency or been a
              guarantor on such a loan? (This includes, but is not limited to
              USDA, FHA, EDA.)
            </label>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value={formData.authorizedSign || "yes"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedSign: e.target.value,
                  })
                }
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value={formData.authorizedSignNo || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedSignNo: e.target.value,
                  })
                }
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              <strong>31a)</strong>If you answered "Yes" to Question 31, is any
              of the financing presently considered delinquent?
            </label>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value={formData.authorizedSign || "yes"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedSign: e.target.value,
                  })
                }
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value={formData.authorizedSignNo || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedSignNo: e.target.value,
                  })
                }
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={6}>
            <label style={{ fontSize: 15, fontWeight: 100, color: "grey" }}>
              <strong>31b)</strong>If you answered "Yes" to Question 31, did any
              loan that was for a business purpose ever default and cause a loss
              to the Government, including a compromise, resolution or
              settlement of a loan's principal balance for less than the full
              amount due? (If you answer "Yes" to either 31(a) or 31(b) above,
              please provide Lender with a written explanation)
            </label>
          </Grid>
          <Grid item sm={6}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                style={{ color: "black" }}
                value={formData.authorizedSign || "yes"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedSign: e.target.value,
                  })
                }
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                style={{ color: "black" }}
                value={formData.authorizedSignNo || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedSignNo: e.target.value,
                  })
                }
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default SBA16;
