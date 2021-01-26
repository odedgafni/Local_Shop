const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const path = require('path')

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/products', require('./routes/api/products'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/cart', require('./routes/api/cart'));
app.use('/api/checkout', require('./routes/api/checkout'));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

mongoose.connect(process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
   () => console.log("DB Connected"));

app.listen(PORT, () => console.log("Server running on port " + PORT));