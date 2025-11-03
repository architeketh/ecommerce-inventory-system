import React from 'react'

const Dashboard = ({ items }) => {
  const totalItems = items.reduce((sum, item) => sum + item.inventory, 0)
  const totalForSale = items.filter(i => i.forSale).length
  const totalSold = items.reduce((sum, i) => sum + i.sold, 0)
  const totalValue = items.reduce((sum, i) => sum + i.cost * i.inventory, 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
      <div className="bg-white p-2 border">Total Inventory: {totalItems}</div>
      <div className="bg-white p-2 border">Items For Sale: {totalForSale}</div>
      <div className="bg-white p-2 border">Total Sold: {totalSold}</div>
      <div className="bg-white p-2 border">Total Value: ${totalValue}</div>
    </div>
  )
}

export default Dashboard
