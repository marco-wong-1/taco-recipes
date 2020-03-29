const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API WORKING'));

// Define Routes
app.use('/api/ingredient', require('./routes/api/ingredient'));
app.use('/api/recipe', require('./routes/api/recipe'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
