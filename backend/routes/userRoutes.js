const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Public Routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/populate', userController.populateDatabaseWithFakeUsers);

// Protected Routes (require authentication)
router.get('/users', authMiddleware, userController.getAllUsers);
router.get('/users/:id', authMiddleware, userController.getUserById);
router.put('/users/:id', authMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware, userController.deleteUser);

module.exports = router;