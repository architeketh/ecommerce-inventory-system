import React from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const ReportButtons = ({ items }) => {
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
  )
}

export default ReportButtons
