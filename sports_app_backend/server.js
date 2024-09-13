const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/sportsdata')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Define the Sport schema and model
const sportSchema = new mongoose.Schema({
  key: String,
  title: String
});

const Sport = mongoose.model('Sport', sportSchema);

// API to fetch sports data from external API and store in MongoDB
app.get('/fetch-sports', async (req, res) => {
  try {
    const apiUrl = 'https://api.the-odds-api.com/v4/sports?apiKey=e2455acb1c45d5bafad5239f40afbcc9';
    const response = await axios.get(apiUrl);

    console.log('Fetched data:', response.data); // Debugging line

    await Sport.deleteMany({});
    
    // Map data to match schema if necessary
    const sportsData = response.data.map(item => ({
      key: item.key,
      title: item.title
    }));

    await Sport.insertMany(sportsData);

    res.send('Sports data fetched and saved to MongoDB!');
  } catch (error) {
    console.error('Error fetching sports data:', error);
    res.status(500).send('Error fetching sports data');
  }
});

// API to get sports data from MongoDB
app.get('/get-sports', async (req, res) => {
  try {
    const sports = await Sport.find();
    res.json(sports);
  } catch (error) {
    console.error('Error fetching sports from MongoDB:', error);
    res.status(500).send('Error fetching sports from MongoDB');
  }
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
