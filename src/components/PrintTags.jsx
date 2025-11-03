import React, { useRef } from 'react'
import JsBarcode from 'jsbarcode'

const PrintTags = ({ items }) => {
  const printRef = useRef()

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML
    const win = window.open('', '', 'width=800,height=600')
    win.document.write(`
      <html>
        <head>
          <title>Print Inventory Tags</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .tag { border: 1px solid #000; padding: 8px; margin: 4px; display: inline-block; width: 180px; }
            img { width: 100%; height: 100px; object-fit: cover; margin-bottom: 4px; }
            svg { width: 100%; height: 50px; }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `)
    win.document.close()
    win.focus()
    win.print()
    win.close()
  }

  return (
    <div className="mb-4">
      <button onClick={handlePrint} className="bg-purple-500 text-white p-2">Print Tags</button>
      <div ref={printRef} style={{ display: 'none' }}>
        {items.map(item => (
          <div className="tag" key={item.id}>
            <div>Category: {item.category}</div>
            <div>Brand: {item.brand}</div>
            <div>Cost: ${item.cost}</div>
            {item.photos?.[0] && <img src={item.photos[0]} alt="item" />}
            <svg ref={el => el && JsBarcode(el, String(item.id), {format:"CODE128", width:2, height:40})}></svg>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PrintTags
