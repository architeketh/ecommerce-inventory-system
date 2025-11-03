import React, { useEffect, useState, useRef } from 'react'
import { PlusCircle, Trash2, Camera, Search, Download, Upload, Tag } from 'lucide-react'
import JsBarcode from 'jsbarcode'


const STORAGE_KEY = 'ecom_inventory_v1'


function sampleId() {
return 'P' + Math.random().toString(36).slice(2, 9).toUpperCase()
}


function useLocalStorage(key, initial) {
const [state, setState] = useState(() => {
try {
const raw = localStorage.getItem(key)
return raw ? JSON.parse(raw) : initial
} catch (e) {
console.error(e)
return initial
}
})
useEffect(() => {
try {
localStorage.setItem(key, JSON.stringify(state))
} catch (e) {
console.error(e)
}
}, [key, state])
return [state, setState]
}


export default function App() {
const [items, setItems] = useLocalStorage(STORAGE_KEY, [])
const [query, setQuery] = useState('')
const [showLowOnly, setShowLowOnly] = useState(false)
const [editing, setEditing] = useState(null)
const [lowThreshold, setLowThreshold] = useState(5)
const fileInputRef = useRef()


useEffect(() => {
// demo seed when empty
if (items.length === 0) {
setItems([
{ id: sampleId(), name: 'Golf Ball - Pro', qty: 12, price: 4.5, image: null },
{ id: sampleId(), name: 'Driver 10°', qty: 3, price: 299.99, image: null }
])
}
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


const addItem = item => setItems(prev => [item, ...prev])
const updateItem = updated => setItems(prev => prev.map(i => i.id === updated.id ? updated : i))
const deleteItem = id => setItems(prev => prev.filter(i => i.id !== id))


const filtered = items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()))
.filter(i => showLowOnly ? i.qty <= lowThreshold : true)


const stats = {
totalItems: items.length,
totalQty: items.reduce((s, i) => s + Number(i.qty || 0), 0),
totalValue: items.reduce((s, i) => s + (Number(i.qty || 0) * Number(i.price || 0)), 0)
