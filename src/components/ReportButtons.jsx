import React from 'react'
import { saveAs } from 'file-saver'

const ReportButtons = ({ items }) => {
  const generateCSVReport = () => {
    const inventoryTotals = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.quantity
      return acc
    }, {})

    const soldTotals = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + (item.quantitySold || 0)
      return acc
    }, {})

    let csv = 'Category,Item,Price,Quantity,Quantity Sold\n'
    items.forEach(item => {
      csv += `${item.category},${item.description},${item.price},${item.quantity},${item.quantitySold}\n`
    })

    csv += '\nCategory,Total Inventory,Total Sold\n'
    Object.keys(inventoryTotals).forEach(category => {
      csv += `${category},${inventoryTotals[category]},${soldTotals[category] || 0}\n`
    })

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'inventory_report.csv')
  }

  return (
    <div className="flex gap-3 mb-6 justify-center md:justify-start">
      <button
        onClick={generateCSVReport}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        Download CSV Report
      </button>
    </div>
  )
}

export default ReportButtons
