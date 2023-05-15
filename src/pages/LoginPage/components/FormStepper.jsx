import React from "react";
import "../../../css/formStepper.css";

function FormStepper() {
  return (
    <div className="steps-section">
      <div id="step-1">
        <label>1</label>
      </div>
      <div id="step-2" className="step">
        <label>2</label>
      </div>
      <div id="step-3" className="step">
        <label>3</label>
      </div>
    </div>
  );
}

export default FormStepper;
