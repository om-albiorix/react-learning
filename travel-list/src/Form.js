import { useState } from "react";

export default function Form({ formData, onDeleteItem }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(5);

    function handleSubmit(e) {
        e.preventDefault();
        if (!description) return;
        const newItem = {
            description,
            quantity,
            packed: false,
            id: Date.now(),
        };
        // console.log(newItem);
        formData((oldformData) => [...oldformData, newItem]);
        setDescription("");
        setQuantity(1);
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="add-form text-center">
                <h3>What do you need for your trip ?</h3>
                <select
                    className="inputform"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                >
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