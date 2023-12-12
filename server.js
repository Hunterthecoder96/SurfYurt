const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');
const { expressjwt } = require('express-jwt');
const path = require('path');

app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(
  process.env.SITE_URL,

  (err) => console.log('Connected to the DB', err)
);

app.use('/auth', require('./routes/authRouter'));
app.use(
  '/api',
  expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] })
);
app.use('/api/surfboard', require('./routes/surfboardRouter'));

app.use('/api/public', require('./routes/publicRouter'));
app.use('/api/comment', require('./routes/commentRouter'));

app.listen(6900, () => {
  console.log('server is running on local host 69');
});

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'path/to/your/index.html'), function (err) {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });
