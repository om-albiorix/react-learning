import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
const data = [{
  name: "tomato pizza",
  ingredient: "tomatoes,paneer,cheese"
},
{
  name: "double cheese",
  ingredient: "double cheese, capsicum mirchi"
}, {
  name: "maxican green wave",
  ingredient: "mayonese,chiily paneer,mozrella"
}
]
function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}
function Mydiv(props) {
  console.log(props)
  let hours = new Date().getHours();
  let open = 8;
  let close = 18;
  let isOpen = hours >= open && hours <= close;
  console.log(isOpen);
  return (
    <div >
      <div className="main-image">
        <img
          className="logoImg"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2n6Htee4RyiAPjK2Cp-WWmogBTUE2cw9ghfKMA-CEHrRZ6eEybN3fdFid6iTm8VBz9iY&usqp=CAU"
          alt="logo-img"
        />
      </div>
      <h4>Double Cheese Pizza</h4>
      <p>{props.ingredient}</p>
      <p>{props.name}</p>
    </div>
  );
}
function Header() {
  return <h1 className="text-warning">Pizza Hut</h1>;
}
function Menu() {
  return (
    <div className="">
      <h3 className="text-center menu_item">Our Menu</h3>
      <Mydiv name="pizza" ingredient="chilly,cheese,toamto" />
    </div>
  );
}
function Footer() {
  return (
    <footer>
      <h3 className="text-center text-danger">
        {" "}
        {new Date().toLocaleTimeString()}We're Currently Open{" "}
      </h3>
    </footer>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

