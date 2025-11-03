import React from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const ReportButtons = ({ items }) => {
  const downloadCSV = () => {
    const headers = ['Category', 'Brand', 'Description', 'Price', 'Sold']
    const rows = items.map(i => [i.category, i.brand, i.description, i.price, i.sold ? 'Yes' : 'No'])
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map(r => r.join(','))].join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'inventory_report.csv')
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const downloadPDF = () => {
    const doc = new jsPDF()
    doc.text('Inventory Report', 14, 10)
    const tableData = items.map(i => [i.category, i.brand, i.description, i.price, i.sold ? 'Yes' : 'No'])
    doc.autoTable({
      head: [['Category', 'Brand', 'Description', 'Price', 'Sold']],
      body: tableData
    })
    doc.save('inventory_report.pdf')
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 my-6">
      <button
        onClick={downloadCSV}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Download CSV
      </button>
      <button
        onClick={downloadPDF}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Download PDF
      </button>
    </div>
  )
}

export default ReportButtons
