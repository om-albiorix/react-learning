import React from "react";

export default function Option({ questions, answer, dispatch }) {
  console.log("ans", answer);
  const hasAnswered = answer !== null;
  console.log(questions.correctOption, "qco");
  return (
    <div>
      <div className="options">
        {questions.options.map((option, index) => (
          <button
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswered
                ? index === questions.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            disabled={answer !== null}  
          >
            {console.log("answedsdsjdn", answer !== null)}
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
