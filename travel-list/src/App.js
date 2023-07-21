import { useState } from "react";

const intialItems = [
  {
    Id: 1,
    description: "Passport",
    quantity: 2,
    packed: false,
  },
  {
    Id: 2,
    description: "Shocks",
    quantity: 2,
    packed: false,
  },
  {
    Id: 3,
    description: "Cloths",
    quantity: 2,
    packed: false,
  },
  {
    Id: 4,
    description: "Snacks",
    quantity: 2,
    packed: false,
  },
];
function App() {
  const [data, setData] = useState("");

  return (
    <div className="App">
      <Logo />
      <Form mydata={setData} />
      <PackingLists />
      <States showdata={data} />

    </div>
  );
}

function Logo() {
  return (
    <div>
      <div className="main-title-div">
        <h1 className="text-center main-title">Far Away </h1>
      </div>
    </div>
  );
}

function Form({ mydata }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(5);



  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return
    const newItem = {
      description, quantity, packed: false, id: Date.now()
    };
    // console.log(newItem);
    mydata(newItem);
    setDescription("");
    setQuantity(1);

  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="add-form text-center">
        <h3>What do you need for your trip ?</h3>
        <select className="inputform" value={quantity} onChange={e => setQuantity(Number(e.target.value))}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="item..."
          className="inputform"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button style={{ borderRadius: "15px" }} className="btn btn-info">
          ADD
        </button>
      </div>
    </form>
  );
}

function Item({ item }) {
  return (
    <div>
      <li
        style={item.packed ? { textDecoration: "line-through" } : {}}
        className="listitem"
      >
        <span className="itemrow">
          <input type="checkbox" />
          {item.description}
          {item.quantity}
        </span>{" "}
        <button className="close btn btn-danger p-1 ml-2">&times;</button>
      </li>
    </div>
  );
}
function PackingLists() {
  return (
    <div className="list">
      <h3 className="list-title text-center">List</h3>
      <ul className="listitem">
        {intialItems.map((item) => (
          <Item item={item} key={item.Id} />
        ))}
      </ul>
    </div>
  );
}
function States({ showdata }) {
  console.log("showdata", showdata)
  return (
    <footer>You have {showdata.quantity} Items on your list,and you already packed {showdata.description}</footer>
  );
}

export default App;
