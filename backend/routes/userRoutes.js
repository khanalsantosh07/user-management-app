// Name: Santosh Khanal
// Student number: c0921949
// Date: 3 December 2024
// Full Stack MERN Application





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

router.get('/search', authMiddleware, userController.searchUsers);


// Export the router
module.exports = router;