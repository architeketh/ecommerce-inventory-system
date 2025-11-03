// Only showing relevant changes
const [category, setCategory] = useState('')

// Replace all references to `name` with `category` in addItem:
const newItem = {
  id, 
  category,  // updated
  brand,
  size,
  cost,
  inventory,
  forSale,
  sold,
  photos
}

// Input field:
<input
  className="border p-2"
  placeholder="Category"
  value={category}
  onChange={e => setCategory(e.target.value)}
/>
