import React, { useState, useEffect } from 'react'
import InventoryList from './components/InventoryList.jsx'
import InventoryForm from './components/InventoryForm.jsx'
import Dashboard from './components/Dashboard.jsx'
import PrintTags from './components/PrintTags.jsx'

const App = () => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('inventory')
    return saved ? JSON.parse(saved) : []
  })
  const [showSoldOnly, setShowSoldOnly] = useState(false)

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(items))
  }, [items])

  const itemsToPrint = showSoldOnly
    ? items.filter(item => item.sold > 0)
    : items

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Ecommerce Inventory System</h1>

      {/* Dashboard */}
      <Dashboard items={items} />

      {/* Print tags toggle */}
      <div className="mb-4 flex items-center gap-2">
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

      {/* Inventory form */}
      <InventoryForm items={items} setItems={setItems} />

      {/* Inventory table */}
      <InventoryList items={items} setItems={setItems} />
    </div>
  )
}

export default App
