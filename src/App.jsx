import React, { useState, useEffect } from 'react'
import InventoryList from './components/InventoryList.jsx'
import InventoryForm from './components/InventoryForm.jsx'
import Dashboard from './components/Dashboard.jsx'
import PrintTags from './components/PrintTags.jsx'
import ReportButtons from './components/ReportButtons.jsx'

const App = () => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('inventory')
    return saved ? JSON.parse(saved) : []
  })
  const [showSoldOnly, setShowSoldOnly] = useState(false)

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(items))
  }, [items])

  const itemsToPrint = showSoldOnly ? items.filter(i => i.sold) : items

  return (
    <div className="px-4 py-6 w-full max-w-[1600px] mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Ecommerce Inventory System
      </h1>

      {/* Add Item Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-center md:text-left">
          Add New Inventory Item
        </h2>
        <InventoryForm items={items} setItems={setItems} />
      </div>

      {/* Dashboard */}
      <Dashboard items={items} />

      {/* Report buttons */}
      <ReportButtons items={items} />

      {/* Print tags toggle */}
      <div className="mb-4 flex flex-wrap items-center gap-3 justify-center">
        <label>
          <input
            type="checkbox"
            checked={showSoldOnly}
            onChange={e => setShowSoldOnly(e.target.checked)}
          />{' '}
          Print Sold Items Only
        </label>
        <PrintTags items={itemsToPrint} showPhotos={false} />
      </div>

      {/* Inventory Table */}
      <div className="overflow-x-visible">
        <InventoryList items={items} setItems={setItems} />
      </div>
    </div>
  )
}

export default App
