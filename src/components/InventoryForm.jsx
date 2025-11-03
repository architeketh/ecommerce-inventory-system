// Updated InventoryForm.jsx
import React, { useState } from 'react'

const InventoryForm = ({ items, setItems }) => {
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [itemCost, setItemCost] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!category || !brand || !description || !price || !itemCost) return
    setItems([
      ...items,
      {
        id: Date.now(),
        category,
        brand,
        description,
        price: parseFloat(price),
        itemCost: parseFloat(itemCost),
        sold: 0
      }
    ])
    setCategory('')
    setBrand('')
    setDescription('')
    setPrice('')
    setItemCost('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
      <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} className="border px-2 py-1 rounded" />
      <input type="text" placeholder="Brand" value={brand} onChange={e => setBrand(e.target.value)} className="border px-2 py-1 rounded" />
      <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="border px-2 py-1 rounded" />
      <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} className="border px-2 py-1 rounded" />
      <input type="number" placeholder="Item Cost" value={itemCost} onChange={e => setItemCost(e.target.value)} className="border px-2 py-1 rounded" />
      <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">Add Item</button>
    </form>
  )
}

export default InventoryForm
