const express = require('express')
const router = express.Router();

// Importiamo le funzioni del controller
const blogController = require('../controllers/blogController');

// Index
router.get('/', blogController.index);

// Show
router.get('/:id', blogController.show);

// Create/Store
router.post('/', blogController.store);

// Update
router.put('/:id', blogController.update);

// Modify
router.patch('/:id', blogController.update);

// Destroy
router.delete('/:id', blogController.destroy);

module.exports = router;
