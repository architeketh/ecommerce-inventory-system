import React, { useState } from 'react'

const InventoryForm = ({ items, setItems }) => {
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [size, setSize] = useState('')
  const [cost, setCost] = useState(0)
  const [inventory, setInventory] = useState(1)
  const [forSale, setForSale] = useState(true)
  const [sold, setSold] = useState(0)
  const [photos, setPhotos] = useState([])

  const handlePhotoUpload = e => {
    const files = Array.from(e.target.files)
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = () => setPhotos(prev => [...prev, reader.result])
      reader.readAsDataURL(file)
    })
  }

  const resetForm = () => {
    setName(''); setBrand(''); setSize(''); setCost(0)
    setInventory(1); setForSale(true); setSold(0); setPhotos([])
  }

  const addItem = e => {
    e.preventDefault()
    if (!name) return
    const id = Date.now()
    const newItem = { id, name, brand, size, cost, inventory, forSale, sold, photos }
    setItems([...items, newItem])
    resetForm()
  }

  return (
    <form onSubmit={addItem} className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
      <input className="border p-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input className="border p-2" placeholder="Brand" value={brand} onChange={e => setBrand(e.target.value)} />
      <input className="border p-2" placeholder="Size" value={size} onChange={e => setSize(e.target.value)} />
      <input type="number" className="border p-2" placeholder="Cost" value={cost} onChange={e => setCost(Number(e.target.value))} />
      <input type="number" className="border p-2" placeholder="Inventory" value={inventory} onChange={e => setInventory(Number(e.target.value))} />
      <input type="number" className="border p-2" placeholder="Sold" value={sold} onChange={e => setSold(Number(e.target.value))} />
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={forSale} onChange={e => setForSale(e.target.checked)} />
        For Sale
      </label>
      <input type="file" multiple onChange={handlePhotoUpload} />
      <button type="submit" className="bg-blue-500 text-white p-2 col-span-2">Add Item</button>
    </form>
  )
}

export default InventoryForm
