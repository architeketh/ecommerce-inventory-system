import React from 'react'

const Dashboard = ({ items }) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  return (
    <div className="mb-4 p-2 border bg-white">
      <strong>Total items in inventory: </strong> {totalItems}
    </div>
  )
}

export default Dashboard
