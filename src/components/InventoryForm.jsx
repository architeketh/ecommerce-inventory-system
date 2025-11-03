import React, { useState } from 'react'

const InventoryForm = ({ items, setItems }) => {
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (!category || !brand || !description || !price) return alert('All fields required.')

    const newItem = {
      id: Date.now(),
      category,
      brand,
      description,
      price: parseFloat(price),
      sold: false,
      image
    }

    setItems([...items, newItem])
    setCategory('')
    setBrand('')
    setDescription('')
    setPrice('')
    setImage('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-3 bg-gray-50 p-4 rounded-lg shadow-md justify-center md:justify-start"
    >
      <input
        type="text"
        value={category}
        onChange={e => setCategory(e.target.value)}
        placeholder="Add new category"
        className="border p-2 rounded w-40"
      />
      <input
        type="text"
        value={brand}
        onChange={e => setBrand(e.target.value)}
        placeholder="Add new brand"
        className="border p-2 rounded w-40"
      />
      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-2 rounded w-60"
      />
      <input
        type="number"
        step="0.01"
        value={price}
        onChange={e => setPrice(e.target.value)}
        placeholder="Price"
        className="border p-2 rounded w-32"
      />
      <input
        type="text"
        value={image}
        onChange={e => setImage(e.target.value)}
        placeholder="Image URL (optional)"
        className="border p-2 rounded w-60"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Add Item
      </button>
    </form>
  )
}

export default InventoryForm
