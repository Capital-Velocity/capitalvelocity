import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Container from "../../screens/Container";
import CheckoutSteps from "./CheckoutSteps3";

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
