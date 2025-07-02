const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const organisationRoutes = require('./routes/organisationRoutes');
const authRoutes = require('./routes/authRoutes');
const donatorRoutes = require('./routes/donatorRoutes');
const messageRoutes = require('./routes/messageRoutes'); 
const itemRoutes = require('./routes/itemRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/organisation', organisationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/donator', donatorRoutes); 
app.use('/api/messages', messageRoutes); 
app.use('/api/items', itemRoutes);
app.use('/api/feedback', feedbackRoutes);


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
