const Item = require('../models/Item');
const Donator = require('../models/Donator'); // Import Donator model

// Create a new item
exports.createItem = async (req, res) => {
  const { itemName, quantity, category, donatorId } = req.body; // Only accept donatorId
  const image = req.file ? req.file.buffer : null;

  try {
    // Fetch donator details using the donatorId
    const donator = await Donator.findById(donatorId);
    if (!donator) {
      return res.status(404).json({ message: 'Donator not found' });
    }

    // Create new item
    const newItem = new Item({
      itemName,
      quantity,
      category,
      itemPicture: {
        data: image,
        contentType: req.file ? req.file.mimetype : null,
      },
      donator: {
        donatorId: donator._id,
        donatorName: donator.fullName, // Fetch name from Donator model
        donatorPhone: donator.phoneNumber, // Fetch phone from Donator model
      },
    });

    await newItem.save();
    res.status(201).json({ message: 'Item created successfully!', item: newItem });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ message: 'Failed to create item', error: error.message });
  }
};

// Controller function to get all items from the collection
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find()  // Fetch all items from the collection
      .populate('donator.donatorId');  // Populate the donator data

    res.status(200).json({ items });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Failed to fetch items' });
  }
};
// Get the image for the item
exports.getItemImage = async (req, res) => {
  try {
    const itemId = req.params.itemId; // Get itemId from URL
    const item = await Item.findById(itemId);

    if (!item || !item.itemPicture?.data) {
      return res.status(404).json({ message: 'Item not found or no image available' });
    }

    // Send the image buffer and content type
    res.set('Content-Type', item.itemPicture.contentType);
    res.send(item.itemPicture.data);
  } catch (error) {
    console.error('Error fetching item image:', error);
    res.status(500).json({ message: 'Failed to fetch item image' });
  }
};


// Controller function to fetch items by category
exports.getItemsByCategory = (category) => async (req, res) => {
  try {
    const items = await Item.find({ category }).populate('donator.donatorId');
    res.status(200).json({ items });
  } catch (error) {
    console.error('Error fetching items by category:', error);
    res.status(500).json({ message: 'Failed to fetch items', error: error.message });
  }
};


// Delete an item by ID
exports.deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully', item: deletedItem });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Failed to delete item' });
  }
};

// Fetch only item names and pictures
exports.getItemList = async (req, res) => {
  try {
    const items = await Item.find().select('itemName itemPicture');
    res.status(200).json({ success: true, items });
  } catch (error) {
    console.error('Error fetching item details:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch item details' });
  }
};