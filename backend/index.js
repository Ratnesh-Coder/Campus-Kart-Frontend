const express = require('express');
const cors = require('cors');

// --- TEMPORARY DATABASE ---
const products = [];

const users = [
  {
    id: 'user123',
    email: 'user@bwucampus.edu',
    password: 'password123',
    name: 'Campus User',
    joinDate: 'September 2025',
    avatar: 'https://via.placeholder.com/150'
  }
];
// -------------------------

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// --- API ROUTES ---

// Get ALL products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get a SINGLE product by its ID
app.get('/api/products/:productId', (req, res) => {
  const { productId } = req.params;
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// User Login Endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const { password, ...userToSend } = user;
    res.json({ message: "Login successful!", user: userToSend, token: "fake-jwt-token" });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// User Sign-Up Endpoint (NEW!)
app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'An account with this email already exists.' });
  }

  // Create new user
  const newUser = {
    id: `user${Date.now()}`, // Create a simple unique ID
    name,
    email,
    password, // In a real app, hash this password!
    joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    avatar: 'https://via.placeholder.com/150'
  };

  users.push(newUser);
  console.log('New user registered:', newUser);

  const { password: _, ...userToSend } = newUser;
  res.status(201).json({
    message: 'User created successfully!',
    user: userToSend,
    token: 'fake-jwt-token-for-new-user'
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});