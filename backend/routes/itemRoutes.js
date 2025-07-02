const express = require('express');
const multer = require('multer');
const {createItem} = require('../controllers/itemController');
const itemController = require('../controllers/itemController'); // Correct import


const router = express.Router();

// Set up multer for image upload (store in memory as Buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/create', upload.single('image'), createItem);

// Route to fetch all items (donation history)
router.get('/history', itemController.getItems);

// Route to get the image for the item
router.get('/item-image/:itemId', itemController.getItemImage);

// Route to get all items
router.get('/all-items', itemController.getItems);

// Route to fetch items by category (using query parameter)
router.get('/items-by-category', itemController.getItemsByCategory);

// Route to fetch only item details (name and picture)
router.get('/item-list', itemController.getItemList);


module.exports = router;
