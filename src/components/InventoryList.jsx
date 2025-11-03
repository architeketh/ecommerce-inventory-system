import React from 'react'

const InventoryList = ({ items, setItems }) => {
  const removeItem = id => setItems(items.filter(item => item.id !== id))

  return (
    <ul>
      {items.map(item => (
        <li key={item.id} className="flex justify-between mb-2 p-2 border">
          <span>{item.name} (Qty: {item.quantity})</span>
          <button
            onClick={() => removeItem(item.id)}
            className="bg-red-500 text-white px-2"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}

export default InventoryList
