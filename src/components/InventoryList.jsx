import React from 'react'

const InventoryList = ({ items, setItems }) => {
  const removeItem = id => setItems(items.filter(item => item.id !== id))
  const toggleForSale = id => {
    setItems(items.map(item => item.id === id ? { ...item, forSale: !item.forSale } : item))
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Brand</th>
            <th className="border p-2">Size</th>
            <th className="border p-2">Cost</th>
            <th className="border p-2">Inventory</th>
            <th className="border p-2">Sold</th>
            <th className="border p-2">For Sale</th>
            <th className="border p-2">Photos</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.brand}</td>
              <td className="border p-2">{item.size}</td>
              <td className="border p-2">${item.cost}</td>
              <td className="border p-2">{item.inventory}</td>
              <td className="border p-2">{item.sold}</td>
              <td className="border p-2">
                <input type="checkbox" checked={item.forSale} onChange={() => toggleForSale(item.id)} />
              </td>
              <td className="border p-2 flex gap-1">
                {item.photos.map((p, i) => (
                  <img key={i} src={p} alt="item" className="w-12 h-12 object-cover" />
                ))}
              </td>
              <td className="border p-2">
                <button className="bg-red-500 text-white px-2" onClick={() => removeItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InventoryList
