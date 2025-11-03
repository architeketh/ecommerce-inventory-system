// Updated InventoryList.jsx
import React from 'react'

const InventoryList = ({ items, setItems }) => {

  const incrementSold = (id) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, sold: (item.sold || 0) + 1 }
          : item
      )
    )
  }

  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th>Category</th>
          <th>Brand</th>
          <th>Description</th>
          <th>Price</th>
          <th>Sold</th>
          <th>Item Cost</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id} className="border-t">
            <td>{item.category}</td>
            <td>{item.brand}</td>
            <td>{item.description}</td>
            <td>${item.price}</td>
            <td>{item.sold || 0}</td>
            <td>${item.itemCost || 0}</td>
            <td>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => incrementSold(item.id)}
              >
                +
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default InventoryList
