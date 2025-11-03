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
    <div className="px-4 py-6 w-full max-w-[1400px] mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Ecommerce Inventory System
      </h1>

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

      {/* Main layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inventory form */}
        <InventoryForm items={items} setItems={setItems} />

        {/* Inventory table */}
        <div className="overflow-x-auto">
          <InventoryList items={items} setItems={setItems} />
        </div>
      </div>
    </div>
  )
}

export default App
