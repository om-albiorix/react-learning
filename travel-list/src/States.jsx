

export default function States({ stateData }) {
    if (!stateData.length)
        return (
            <p className="footer">
                <em style={{ textAlign: "center" }}>start adding some item in your packing list</em>
            </p>
        )
    const numItems = stateData.length;
    const numPacked = stateData.filter((item) => item.packed).length;
    const percentage = Math.round(numPacked / numItems * 100)
    return (
        <footer>
            {percentage === 100 ? "You got everything! ready to go" :
                `You have ${numItems} Items on your list,and you already packed
        ${numPacked}(${percentage}%)`
            }
        </footer>
    );
}