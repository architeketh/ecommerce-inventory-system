import React, { useState } from 'react'

const InventoryForm = ({ items, setItems }) => {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)

  const addItem = e => {
    e.preventDefault()
    if (!name) return
    setItems([...items, { id: Date.now(), name, quantity }])
    setName('')
    setQuantity(1)
  }

  return (
    <form onSubmit={addItem} className="mb-4 flex gap-2">
      <input
        className="border p-2 flex-1"
        placeholder="Item name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="number"
        className="border p-2 w-20"
        value={quantity}
        min="1"
        onChange={e => setQuantity(Number(e.target.value))}
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Add
      </button>
    </form>
  )
}

export default InventoryForm
