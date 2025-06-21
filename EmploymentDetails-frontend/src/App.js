import React, { useState } from "react";
import Step3Establishment from "./Step3Establishment";
import Step4OtherDetails from "./Step4OtherDetails";

function App() {
  const [step, setStep] = useState(3);

  const goNext = () => setStep(4);
  const goBack = () => setStep(3);
  const submit = () => {
    alert("Submitted successfully!");
  };

  return (
    <div className="App">
      {step === 3 && <Step3Establishment onNext={goNext} />}
      {step === 4 && <Step4OtherDetails onBack={goBack} onSubmit={submit} />}
    </div>
  );
}

export default App;
