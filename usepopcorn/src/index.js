import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import StarRating from "./StarRating";

const Test = () => {
  const [movieRating, setmovieRating] = useState(0);
  return (
    <div>
      {
        <StarRating
          color="blue"
          maxLength={10}
          onsetRating={(rating) => setmovieRating(rating)}
        />
      }
      <p>{movieRating}</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <App />
);
