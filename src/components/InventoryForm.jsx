import React, { useState } from 'react'

const InventoryForm = ({ items, setItems }) => {
  const [formData, setFormData] = useState({
    category: '',
    brand: '',
    description: '',
    price: 0,
    quantity: 0,
    quantitySold: 0
  })

  const addItem = () => {
    const newItem = { ...formData, id: items.length + 1 }
    setItems([...items, newItem])
    setFormData({
      category: '',
      brand: '',
      description: '',
      price: 0,
      quantity: 0,
      quantitySold: 0
    })
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
      <input
        placeholder="Category"
        value={formData.category}
        onChange={e => setFormData({ ...formData, category: e.target.value })}
      />
      <input
        placeholder="Brand"
        value={formData.brand}
        onChange={e => setFormData({ ...formData, brand: e.target.value })}
      />
      <input
        placeholder="Description"
        value={formData.description}
        onChange={e => setFormData({ ...formData, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Quantity Sold"
        value={formData.quantitySold}
        onChange={e => setFormData({ ...formData, quantitySold: parseInt(e.target.value) })}
      />
      <button onClick={addItem} className="bg-blue-500 text-white px-3 py-1 rounded">
        Add Item
      </button>
    </div>
  )
}

export default InventoryForm
