import { useState } from "react";

const messages = ["Learn React  ", "Apply for Job", "Invest your Job"];

function App() {
  const [step, setStep] = useState(1);
  // const [test, setTest] = useState({ name: "om" })
  const [isOpen, setIsOpen] = useState(true)

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
    // setTest({ name: "yash" })
  }

  return (
    <>
      <button className="close btn btn-primary  m-4 p-2 border" onClick={() => setIsOpen(!isOpen)}>&times;</button>
      {isOpen && (
        <div className="App" >
          <div className="step">
            <div className="numbers">
              <div className={`indivisualnumber ${step >= 1 ? "active" : ""}`}>
                1
              </div>
              <div className={`indivisualnumber ${step >= 2 ? "active" : ""}`}>
                2
              </div>
              <div className={`indivisualnumber ${step >= 3 ? "active" : ""}`}>
                3
              </div>
            </div>
            <p className="text-center">
              Step {step}: {messages[step - 1]}
              {/* {test.name} */}

            </p>
            <div className="button merged">
              <button
                className="btn btn-secondary buttonprevious"
                onClick={() => handlePrevious()}
              >
                Previous
              </button>
              <button className="btn btn-secondary buttonnext" onClick={() => handleNext()}>
                Next
              </button>
            </div>
          </div>
        </div>
      )
      }</>)


}

export default App;
