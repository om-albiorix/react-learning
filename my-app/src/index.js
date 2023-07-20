import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
const data = [{
  name: "Tomato pizza",
  ingredient: "Tomatoes,paneer,cheese",
  price: 20,
  src: "https://images.healthshots.com/healthshots/en/uploads/2023/02/09155200/pizza-1.jpg",
  soldout: false
},
{
  name: "Double cheese",
  ingredient: "Double cheese, capsicum mirchi",
  price: 20,
  src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2n6Htee4RyiAPjK2Cp-WWmogBTUE2cw9ghfKMA-CEHrRZ6eEybN3fdFid6iTm8VBz9iY&usqp=CAU",
  soldout: false
}, {
  name: "Maxican green wave",
  ingredient: "Mayonese,chiily paneer,mozrella",
  price: 20,
  src: "https://images.healthshots.com/healthshots/en/uploads/2023/02/09155200/pizza-1.jpg",
  soldout: true
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
function Header() {
  return <h1 className="text-warning text-center main-title" style={{
    letterSpacing: "10px"
  }}> Pizza Hut</h1 >;
}
function Menu(props) {
  const pizzas = data
  return (
    <div className="">
      <div className="menu-title">
        <h2 className="text-center menu_item">Our Menu</h2>
        <h3 className="text-center text-success">never sit around and wait for someone unless they're delivering a pizza.</h3>
      </div>
      {pizzas && (<ul>
        {pizzas.map((pizza) => (
          <Mydiv pizzaobj={pizza} key={pizza.name} />
        ))}
      </ul>)}
    </div>
  );
}
function Mydiv({ pizzaobj }) {
  let hours = new Date().getHours();
  let open = 8;
  let close = 18;
  let isOpen = hours >= open && hours <= close;
  console.log(isOpen);
  return (
    <div className="main-bodypart">
      <div className="main-image">
        <img
          className={`logoImg ${pizzaobj.soldout ? "sold-out" : ""}`}
          src={pizzaobj.src}
          alt="logo-img"
        />
      </div>
      <h4 className="fw-bold">Double Cheese Pizza</h4>
      <p className="italic">{pizzaobj.ingredient}</p>
      <p className="italic">{pizzaobj.name}</p>
      <p className="italic bold">{pizzaobj.soldout ? "SOLDOUT" : pizzaobj.price} </p>
    </div>
  );
}
function Footer(props) {
  let hours = new Date().getHours();
  let open = 11;
  let close = 18;
  let isOpen = hours >= open && hours <= close;

  return (
    <footer>
      {isOpen && (
        <div className="main-bodypart">
          <p>
            We're open until {close}:00 come visit for order online.
          </p>
          <button className="btn btn-warning ">Order</button>
        </div>
      )
      }
    </footer>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

