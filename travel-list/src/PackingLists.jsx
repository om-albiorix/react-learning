import { useState } from "react";
import Item from "./Item";

export default function PackingLists({ packageData, onDeleteItem, onToggleItem, onClearItem }) {
    const [sortBy, setSortBy] = useState("input");
    let sortItem;
    if (sortBy === "input") sortItem = packageData;
    if (sortBy === "description") sortItem = packageData.slice()
        .sort((a, b) => a.description.localeCompare(b.description));
    if (sortBy === "packed") sortItem = packageData.slice().sort((a, b) => Number(a.packed) - Number(b.packed))
    return (
        <div className="list">
            <h3 className="list-title text-center">List</h3>
            <ul className="listitem">
                {sortItem.map((item) => (
                    <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
                ))}
            </ul>
            <div className="actions" style={{
                margin: "auto", display: "flex", justifyContent: "center", alignItems: "center", alignSelf: "end"
            }}>
                <select className="inputform mx-2" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="input">Sort by input order</option>
                    <option value="description">sort by description</option>
                    <option value="packed">Sort by packed status</option>
                </select>
                <button className="inputform" onClick={onClearItem}>Clear List</button>
            </div>
        </div >
    );
}