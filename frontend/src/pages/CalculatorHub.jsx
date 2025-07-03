import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FixandFlipCalc from "../Calculators/FixandFlipCalc";
import DsciCalculator from "../Calculators/DsciCalculator";
import OptimizerCalculator from "../Calculators/OptimizerCalculator";

const CalculatorHub = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const typeFromURL = queryParams.get("type");

  const validTypes = ["fix-and-flip", "rental-dscr", "dscr-optimizer"];
  const [selectedTool, setSelectedTool] = useState("fix-and-flip");

  useEffect(() => {
    if (typeFromURL && validTypes.includes(typeFromURL)) {
      setSelectedTool(typeFromURL);
    }
  }, [typeFromURL]);

  const renderSelectedGenerator = () => {
    switch (selectedTool) {
      case "fix-and-flip":
        return <FixandFlipCalc />;
      case "rental-dscr":
        return <DsciCalculator />;
      case "dscr-optimizer":
        return <OptimizerCalculator />;
      default:
        return (
          <div className="text-center text-gray-500 mt-10">
            Please select a calculator using the buttons above.
          </div>
        );
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">Calculator Hub</h1>

      <p className="text-center text-gray-600 mb-6 max-w-3xl mx-auto">
        Use the buttons below to choose a calculator that fits your needs.
        Whether you're evaluating loan options, business value, or investment
        potential, this hub brings all tools into one place.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => setSelectedTool("fix-and-flip")}
          className={`px-5 py-2 rounded-full border font-medium ${
            selectedTool === "fix-and-flip"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
          }`}
        >
          Fix and Flip
        </button>
        <button
          onClick={() => setSelectedTool("rental-dscr")}
          className={`px-5 py-2 rounded-full border font-medium ${
            selectedTool === "rental-dscr"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
          }`}
        >
          Rental DSCR
        </button>
        <button
          onClick={() => setSelectedTool("dscr-optimizer")}
          className={`px-5 py-2 rounded-full border font-medium ${
            selectedTool === "dscr-optimizer"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
          }`}
        >
          DSCR Optimizer
        </button>
      </div>

      {renderSelectedGenerator()}
    </div>
  );
};

export default CalculatorHub;
