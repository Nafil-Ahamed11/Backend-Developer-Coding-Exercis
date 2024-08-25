const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/route.js');
const path = require('path')
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/', routes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

