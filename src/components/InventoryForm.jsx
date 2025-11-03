import React, { useState } from 'react'

const InventoryForm = ({ items, setItems }) => {
  const predefinedCategories = ['Shirts', 'Pants', 'Shoes', 'Hats', 'Accessories']
  const predefinedBrands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Other']

  const [category, setCategory] = useState(predefinedCategories[0])
  const [brand, setBrand] = useState(predefinedBrands[0])
  const [customCategory, setCustomCategory] = useState('')
  const [customBrand, setCustomBrand] = useState('')
  const [size, setSize] = useState('')
  const [cost, setCost] = useState(0)
  const [inventory, setInventory] = useState(1)
  const [forSale, setForSale] = useState(true) // Now Items checkbox
  const [sold, setSold] = useState(false)
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
    setCategory(predefinedCategories[0])
    setBrand(predefinedBrands[0])
    setCustomCategory('')
    setCustomBrand('')
    setSize('')
    setCost(0)
    setInventory(1)
    setForSale(true)
    setSold(false)
    setPhotos([])
  }

  const addItem = e => {
    e.preventDefault()
    const finalCategory = category === 'Other' ? customCategory : category
    const finalBrand = brand === 'Other' ? customBrand : brand
    if (!finalCategory) return
    const id = Date.now()
    const newItem = { id, category: finalCategory, brand: finalBrand, size, cost, inventory, forSale, sold, photos }
    setItems([...items, newItem])
    resetForm()
  }

  return (
    <form onSubmit={addItem} className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
      <div>
        <label>Category:</label>
        <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2 w-full">
          {predefinedCategories.map(c => <option key={c} value={c}>{c}</option>)}
          <option value="Other">Other</option>
        </select>
        {category === 'Other' && <input className="border p-2 mt-1 w-full" placeholder="Custom Category" value={customCategory} onChange={e => setCustomCategory(e.target.value)} />}
      </div>

      <div>
        <label>Brand:</label>
        <select value={brand} onChange={e => setBrand(e.target.value)} className="border p-2 w-full">
          {predefinedBrands.map(b => <option key={b} value={b}>{b}</option>)}
          <option value="Other">Other</option>
        </select>
        {brand === 'Other' && <input className="border p-2 mt-1 w-full" placeholder="Custom Brand" value={customBrand} onChange={e => setCustomBrand(e.target.value)} />}
      </div>

      <input className="border p-2" placeholder="Size" value={size} onChange={e => setSize(e.target.value)} />
      <input type="number" className="border p-2" placeholder="Cost" value={cost} onChange={e => setCost(Number(e.target.value))} />
      <input type="number" className="border p-2" placeholder="Inventory" value={inventory} onChange={e => setInventory(Number(e.target.value))} />

      <label className="flex items-center gap-2">
        <input type="checkbox" checked={forSale} onChange={e => setForSale(e.target.checked)} />
        Items
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" checked={sold} onChange={e => setSold(e.target.checked)} />
        Sold
      </label>

      <input type="file" multiple onChange={handlePhotoUpload} />
      <button type="submit" className="bg-blue-500 text-white p-2 col-span-2">Add Item</button>
    </form>
  )
}

export default InventoryForm
