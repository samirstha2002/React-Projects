export default function Item({ item, onDeleteItems, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        vslue={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}> ❌ </button>
    </li>
  );
}
