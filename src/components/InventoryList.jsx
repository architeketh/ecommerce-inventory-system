import React from 'react'

const InventoryList = ({ items, setItems }) => {
  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-2 py-1">Barcode</th>
          <th className="border px-2 py-1">Category</th>
          <th className="border px-2 py-1">Brand</th>
          <th className="border px-2 py-1">Description</th>
          <th className="border px-2 py-1">Price</th>
          <th className="border px-2 py-1">Quantity</th>
          <th className="border px-2 py-1">Quantity Sold</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id}>
            <td className="border px-2 py-1">{`abc_isfor_xyz${item.id}`}</td>
            <td className="border px-2 py-1">{item.category}</td>
            <td className="border px-2 py-1">{item.brand}</td>
            <td className="border px-2 py-1">{item.description}</td>
            <td className="border px-2 py-1">{item.price}</td>
            <td className="border px-2 py-1">{item.quantity}</td>
            <td className="border px-2 py-1">{item.quantitySold}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default InventoryList
