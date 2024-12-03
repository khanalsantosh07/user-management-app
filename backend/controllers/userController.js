const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { faker } = require('@faker-js/faker');

exports.registerUser = async (req, res) => {
  try {
    const { email, password, ...userData } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      ...userData,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Login error', error: error.message });
  }
};

exports.populateDatabaseWithFakeUsers = async (req, res) => {
  try {
    const usersToCreate = 10;
    const fakeUsers = [];

    for (let i = 0; i < usersToCreate; i++) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('defaultPassword123', salt);

      fakeUsers.push({
        lastName: faker.person.lastName(),
        firstName: faker.person.firstName(),
        dateOfBirth: faker.date.past(),
        address1: faker.location.streetAddress(),
        address2: faker.location.secondaryAddress(),
        city: faker.location.city(),
        postalCode: faker.location.zipCode(),
        country: faker.location.country(),
        phoneNumber: faker.phone.number(),
        email: faker.internet.email(),
        userNotes: faker.lorem.sentence(),
        password: hashedPassword
      });
    }

    await User.insertMany(fakeUsers);
    res.status(201).json({ message: `${usersToCreate} fake users created` });
  } catch (error) {
    res.status(500).json({ message: 'Error populating database', error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

exports.updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      // If password is being updated, hash it
      if (updateData.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        id, 
        updateData, 
        { new: true, runValidators: true }
      ).select('-password');
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error updating user', 
        error: error.message 
      });
    }
  };
  
  exports.deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ 
        message: 'User deleted successfully', 
        deletedUserId: id 
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error deleting user', 
        error: error.message 
      });
    }
  };
  
  exports.getUserById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const user = await User.findById(id).select('-password');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error fetching user', 
        error: error.message 
      });
    }
  };