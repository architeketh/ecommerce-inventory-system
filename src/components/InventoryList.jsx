import React, { useState } from 'react'
import JsBarcode from 'jsbarcode'

const InventoryList = ({ items, setItems }) => {
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({})

  const startEdit = item => {
    setEditId(item.id)
    setEditData({ ...item })
  }

  const saveEdit = id => {
    setItems(items.map(item => (item.id === id ? editData : item)))
    setEditId(null)
  }

  const cancelEdit = () => setEditId(null)

  const handlePhotoUpload = e => {
    const files = Array.from(e.target.files)
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = () => setEditData(prev => ({ ...prev, photos: [...prev.photos, reader.result] }))
      reader.readAsDataURL(file)
    })
  }

  const removeItem = id => setItems(items.filter(item => item.id !== id))
  const toggleForSale = id => setItems(items.map(item => item.id === id ? { ...item, forSale: !item.forSale } : item))

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Category</th>
            <th className="border p-2">Brand</th>
            <th className="border p-2">Size</th>
            <th className="border p-2">Cost</th>
            <th className="border p-2">Inventory</th>
            <th className="border p-2">Sold</th>
            <th className="border p-2">For Sale</th>
            <th className="border p-2">Photos</th>
            <th className="border p-2">Barcode</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              {editId === item.id ? (
                <>
                  <td className="border p-2"><input value={editData.category} onChange={e => setEditData({...editData, category:e.target.value})} /></td>
                  <td className="border p-2"><input value={editData.brand} onChange={e => setEditData({...editData, brand:e.target.value})} /></td>
                  <td className="border p-2"><input value={editData.size} onChange={e => setEditData({...editData, size:e.target.value})} /></td>
                  <td className="border p-2"><input type="number" value={editData.cost} onChange={e => setEditData({...editData, cost:Number(e.target.value)})} /></td>
                  <td className="border p-2"><input type="number" value={editData.inventory} onChange={e => setEditData({...editData, inventory:Number(e.target.value)})} /></td>
                  <td className="border p-2"><input type="number" value={editData.sold} onChange={e => setEditData({...editData, sold:Number(e.target.value)})} /></td>
                  <td className="border p-2"><input type="checkbox" checked={editData.forSale} onChange={e => setEditData({...editData, forSale:e.target.checked})} /></td>
                  <td className="border p-2">
                    <input type="file" multiple onChange={handlePhotoUpload} />
                    <div className="flex gap-1 mt-1">
                      {editData.photos?.map((p,i)=><img key={i} src={p} alt="item" className="w-12 h-12 object-cover" />)}
                    </div>
                  </td>
                  <td className="border p-2">
                    <svg ref={el => el && JsBarcode(el, String(item.id), {format:"CODE128", width:2, height:40})}></svg>
                  </td>
                  <td className="border p-2 flex gap-1">
                    <button className="bg-green-500 text-white px-2" onClick={() => saveEdit(item.id)}>Save</button>
                    <button className="bg-gray-500 text-white px-2" onClick={cancelEdit}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border p-2">{item.category}</td>
                  <td className="border p-2">{item.brand}</td>
                  <td className="border p-2">{item.size}</td>
                  <td className="border p-2">${item.cost}</td>
                  <td className="border p-2">{item.inventory}</td>
                  <td className="border p-2">{item.sold}</td>
                  <td className="border p-2">
                    <input type="checkbox" checked={item.forSale} onChange={() => toggleForSale(item.id)} />
                  </td>
                  <td className="border p-2 flex gap-1">
                    {item.photos?.map((p,i)=><img key={i} src={p} alt="item" className="w-12 h-12 object-cover" />)}
                  </td>
                  <td className="border p-2">
                    <svg ref={el => el && JsBarcode(el, String(item.id), {format:"CODE128", width:2, height:40})}></svg>
                  </td>
                  <td className="border p-2 flex gap-1">
                    <button className="bg-yellow-500 text-white px-2" onClick={()=>startEdit(item)}>Edit</button>
                    <button className="bg-red-500 text-white px-2" onClick={()=>removeItem(item.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InventoryList
