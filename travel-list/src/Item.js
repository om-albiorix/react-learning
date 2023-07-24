export default function Item({ item, onDeleteItem, onToggleItem }) {
    return (
        <div>
            <li
                style={item.packed ? { textDecoration: "line-through" } : {}}
                className="listitem"
            >
                <span className="listitem-check"><input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} /></span>
                <span className="itemrow listitem-check">
                    {item.description}
                    {item.quantity}
                </span>
                <button className="close btn btn-danger p-1 ml-2" onClick={() => onDeleteItem(item.id)}>&times;</button>
            </li>
        </div>
    );
}