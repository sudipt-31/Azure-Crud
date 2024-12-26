import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get('/api/items/');
    setItems(response.data);
  };

  const deleteItem = async (id) => {
    await axios.delete(`/api/items/${id}/`);
    fetchItems();
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl">Items</h2>
        <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Item
        </Link>
      </div>
      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item.id} className="border p-4 rounded">
            <h3 className="text-xl">{item.title}</h3>
            <p>{item.description}</p>
            <div className="flex gap-2 mt-2">
              <Link
                to={`/edit/${item.id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteItem(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemList;