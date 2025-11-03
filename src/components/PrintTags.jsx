import React from 'react'

const PrintTags = ({ items, showPhotos = false }) => {
  if (!items || items.length === 0) return null

  return (
    <div className="flex flex-wrap gap-4 mt-4 justify-center">
      {items.map(item => (
        <div
          key={item.id}
          className="border p-3 w-48 text-center rounded shadow"
        >
          {/* Barcode with prefix */}
          <div className="font-mono text-sm mb-1">{`abc_isfor_xyz${item.id}`}</div>

          {/* Item details */}
          <div className="text-sm font-semibold">{item.description}</div>
          <div className="text-xs text-gray-600">
            Category: {item.category} | Brand: {item.brand}
          </div>
          <div className="text-xs">
            Price: ${item.price} | Qty: {item.quantity} | Sold: {item.quantitySold}
          </div>

          {/* Optional image */}
          {showPhotos && item.image && (
            <img
              src={item.image}
              alt={item.description}
              className="mt-2 w-full h-24 object-cover rounded"
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default PrintTags
