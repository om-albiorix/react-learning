import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import Item from "./Item";
import PackingLists from "./PackingLists";
import States from "./States";


const intialItems = [
  {
    id: 1,
    description: "Passport",
    quantity: 2,
    packed: false,
  },
  {
    id: 2,
    description: "Shocks",
    quantity: 2,
    packed: false,
  },
  {
    id: 3,
    description: "Cloths",
    quantity: 2,
    packed: true,
  },
  {
    id: 4,
    description: "Snacks",
    quantity: 2,
    packed: false,
  },
];
function App() {
  const [data, setData] = useState(intialItems);

  function handleDeleteItem(id) {
    setData(items => items.filter(item => item.id !== id)
    )
  }

  function handleToggleItem(id) {
    setData((items) =>
      items.map((item) => item.id === id ? { ...item, packed: !item.packed } : item)
    )
  }
  function handleClearItem() {
    const confirms = window.confirm("Are you sure you want to delete all items");
    if (confirms) setData([])
  }

  return (
    <div className="App">
      <Logo />
      <Form formData={setData} />
      <PackingLists packageData={data} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearItem={handleClearItem} />
      <States stateData={data} />
    </div>
  );
}





export default App;
