import React, { useState } from 'react'

const InventoryForm = ({ items, setItems }) => {
  const [categories, setCategories] = useState(['Shirts', 'Pants', 'Shoes', 'Hats', 'Accessories'])
  const [brands, setBrands] = useState(['Nike', 'Adidas', 'Puma', 'Reebok'])

  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [customCategory, setCustomCategory] = useState('')
  const [customBrand, setCustomBrand] = useState('')
  const [description, setDescription] = useState('')
  const [inventory, setInventory] = useState(1)
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
    setCategory('')
    setBrand('')
    setCustomCategory('')
    setCustomBrand('')
    setDescription('')
    setInventory(1)
    setSold(false)
    setPhotos([])
  }

  const addItem = e => {
    e.preventDefault()
    let finalCategory = category
    let finalBrand = brand

    if (category === 'Add New Category') {
      if (!customCategory) return
      finalCategory = customCategory
      if (!categories.includes(customCategory)) setCategories([...categories, customCategory])
    }

    if (brand === 'Add New Brand') {
      if (!customBrand) return
      finalBrand = customBrand
      if (!brands.includes(customBrand)) setBrands([...brands, customBrand])
    }

    const id = Date.now()
    const newItem = { id, category: finalCategory, brand: finalBrand, description, inventory, sold, photos }
    setItems([...items, newItem])
    resetForm()
  }

  return (
    <form onSubmit={addItem} className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
      <div>
        <label>Category:</label>
        <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2 w-full">
          <option value="">Select category</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
          <option value="Add New Category">Add New Category</option>
        </select>
        {category === 'Add New Category' && <input className="border p-2 mt-1 w-full" placeholder="New Category" value={customCategory} onChange={e => setCustomCategory(e.target.value)} />}
      </div>

      <div>
        <label>Brand:</label>
        <select value={brand} onChange={e => setBrand(e.target.value)} className="border p-2 w-full">
          <option value="">Select brand</option>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
          <option value="Add New Brand">Add New Brand</option>
        </select>
        {brand === 'Add New Brand' && <input className="border p-2 mt-1 w-full" placeholder="New Brand" value={customBrand} onChange={e => setCustomBrand(e.target.value)} />}
      </div>

      <div className="col-span-2">
        <label>Description:</label>
        <input type="text" className="border p-2 w-full" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      </div>

      <input type="number" className="border p-2" placeholder="Items" value={inventory} onChange={e => setInventory(Number(e.target.value))} />

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
