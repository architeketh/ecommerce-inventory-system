import React, { useState, useEffect } from 'react'
import InventoryList from './components/InventoryList.jsx'
import InventoryForm from './components/InventoryForm.jsx'
import Dashboard from './components/Dashboard.jsx'

const App = () => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('inventory')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(items))
  }, [items])

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Ecommerce Inventory System</h1>
      <Dashboard items={items} />
      <InventoryForm items={items} setItems={setItems} />
      <InventoryList items={items} setItems={setItems} />
    </div>
  )
}

export default App


import PrintTags from './components/PrintTags.jsx'

const App = () => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('inventory')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(items))
  }, [items])

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Ecommerce Inventory System</h1>
      <Dashboard items={items} />
      <PrintTags items={items} />
      <InventoryForm items={items} setItems={setItems} />
      <InventoryList items={items} setItems={setItems} />
    </div>
  )
}

