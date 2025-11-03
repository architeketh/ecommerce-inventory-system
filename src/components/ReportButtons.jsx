// Updated ReportButtons.jsx
import React from 'react'

const ReportButtons = ({ items }) => {

  const generateCSV = () => {
    const headers = ["Category", "Brand", "Description", "Price", "Sold", "Item Cost", "Total Cost"]
    const rows = items.map(i => [
      i.category,
      i.brand,
      i.description,
      i.price,
      i.sold || 0,
      i.itemCost || 0,
      ((i.sold || 0) * (i.itemCost || 0)).toFixed(2)
    ])

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "inventory_report.csv")
    document.body.appendChild(link)
    link.click()
  }

  return (
    <div className="mb-4 flex gap-2">
      <button onClick={generateCSV} className="bg-blue-500 text-white px-3 py-1 rounded">Download CSV Report</button>
    </div>
  )
}

export default ReportButtons
