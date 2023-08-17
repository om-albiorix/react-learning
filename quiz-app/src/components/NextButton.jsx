import React from "react";

export default function NextButton({ dispatch, answer }) {
  if (answer === null) return null;
  return (
    <button
      className="btn btn-ui nextbtn"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next Button
    </button>
  );
}
