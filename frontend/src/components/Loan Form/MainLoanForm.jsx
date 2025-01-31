import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "../../screens/Container";
import Button from "@mui/material/Button";
// Step components for different forms
const NamingStep = ({ formData, setFormData }) => (
  <input
    type="text"
    value={formData.name || ""}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    placeholder="Enter Name"
  />
);

const TelephoneStep = ({ formData, setFormData }) => (
  <input
    type="tel"
    value={formData.telephone || ""}
    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
    placeholder="Enter Telephone"
  />
);

const DogStep = ({ formData, setFormData }) => (
  <input
    type="text"
    value={formData.dog || ""}
    onChange={(e) => setFormData({ ...formData, dog: e.target.value })}
    placeholder="Enter Dog Info"
  />
);

const CatStep = ({ formData, setFormData }) => (
  <input
    type="text"
    value={formData.cat || ""}
    onChange={(e) => setFormData({ ...formData, cat: e.target.value })}
    placeholder="Enter Cat Info"
  />
);

const RatStep = ({ formData, setFormData }) => (
  <input
    type="text"
    value={formData.rat || ""}
    onChange={(e) => setFormData({ ...formData, rat: e.target.value })}
    placeholder="Enter Rat Info"
  />
);

const forms = {
  manufacturing: ["Naming", "Telephone", "Dog"],
  farming: ["Dog", "Cat", "Rat"],
};

const LoanForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({});

  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    setCurrentStep(0);
    setFormData({});
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log("Form submitted with data:", formData);
  };

  const renderFormStep = (stepName) => {
    switch (stepName) {
      case "Naming":
        return <NamingStep formData={formData} setFormData={setFormData} />;
      case "Telephone":
        return <TelephoneStep formData={formData} setFormData={setFormData} />;
      case "Dog":
        return <DogStep formData={formData} setFormData={setFormData} />;
      case "Cat":
        return <CatStep formData={formData} setFormData={setFormData} />;
      case "Rat":
        return <RatStep formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  const renderForm = () => {
    if (selectedOption === "") {
      return (
        <div>
          <Typography variant="h3" gutterBottom>
            Tell us about yourself
          </Typography>
          <label>Select an option:ww</label>
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="">-- Select an option --</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="farming">Farming</option>
          </select>
        </div>
      );
    }

    const selectedFormSteps = forms[selectedOption];

    if (currentStep < selectedFormSteps.length) {
      const stepName = selectedFormSteps[currentStep];
      return (
        <Container>
          <h2>
            Step {currentStep + 1}: {stepName}
          </h2>
          {renderFormStep(stepName)}
          <Button onClick={handleNextStep}>Next</Button>
        </Container>
      );
    }

    return (
      <div>
        <h2>Form Completed</h2>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  };

  return (
    <div>
      <h1>Nested Multistep Form</h1>
      {renderForm()}
    </div>
  );
};

export default LoanForm;
