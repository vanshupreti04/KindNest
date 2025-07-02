import React, { useState, useEffect } from 'react';
import './ItemList.css'; // Import the CSS file for styling

const ItemList = () => {
  const [items, setItems] = useState([]);

  // Fetch items from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Change to the correct endpoint where `getItemList` is used
        const response = await fetch('http://localhost:5000/api/items/item-list');
        const data = await response.json();
        
        if (data.success) {
          setItems(data.items); // Update the state with fetched items
        } else {
          console.error('Failed to fetch items');
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems(); // Call the fetch function on component mount
  }, []);

  return (
    <div className="item-list-container-4">
      {/* Gradient heading */}
      <div className="heading-container-4">
        <h1 className="list-heading-4">List of Items</h1>
      </div>

      {/* Grid container for items */}
      <div className="items-grid-4">
        {items.map((item, index) => (
          <div
            className="item-card-4 fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            key={item._id}
          >
            {/* Image Section */}
            <div className="item-image-4">
              {item.itemPicture?.data ? (
                <img
                  src={`http://localhost:5000/api/items/item-image/${item._id}`}
                  alt={item.itemName}
                />
              ) : (
                <div className="no-image-4">No Image Available</div>
              )}
            </div>

            {/* Details Section */}
            <div className="item-details-4">
              <h2 className="item-name-4">{item.itemName}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
