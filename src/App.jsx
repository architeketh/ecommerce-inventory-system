import React, { useState, useEffect } from 'react'
import InventoryList from './components/InventoryList.jsx'
import InventoryForm from './components/InventoryForm.jsx'
import Dashboard from './components/Dashboard.jsx'
import PrintTags from './components/PrintTags.jsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

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
    ? items.filter(item => item.sold)
    : items

  // --- CSV Report ---
  const generateCSVReport = () => {
    const headers = ['Category', 'Brand', 'Description', 'Price', 'Items', 'Sold']
    const rows = items.map(item => [
      item.category,
      item.brand,
      item.description,
      `$${item.price.toFixed(2)}`,
      item.items,
      item.sold
    ])

    let csvContent = 'data:text/csv;charset=utf-8,'
    csvContent += [headers, ...rows].map(e => e.join(',')).join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'inventory_report.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // --- PDF Report ---
  const generatePDFReport = () => {
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text('Ecommerce Inventory Report', 14, 20)
    doc.setFontSize(12)
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30)

    const tableData = items.map(item => [
      item.category,
      item.brand,
      item.description,
      `$${item.price.toFixed(2)}`,
      item.items,
      item.sold
    ])

    doc.autoTable({
      head: [['Category', 'Brand', 'Description', 'Price', 'Items', 'Sold']],
      body: tableData,
      startY: 40,
    })

    const totalValue = items.reduce(
      (acc, item) => acc + item.price * item.items,
      0
    )
    doc.text(`Total Inventory Value: $${totalValue.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10)

    doc.save('inventory_report.pdf')
  }

  return (
    <div className="px-4 py-6 w-full max-w-[1400px] mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Ecommerce Inventory System
      </h1>

      {/* Dashboard */}
      <Dashboard items={items} />

      {/* Report Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <button
          onClick={generateCSVReport}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Download CSV Report
        </button>
        <button
          onClick={generatePDFReport}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Download PDF Report
        </button>
      </div>

      {/* Print tags toggle */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
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

      {/* Layout grid for form + table */}
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
