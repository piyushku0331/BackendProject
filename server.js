const express = require('express');
const path = require('path');
const connectDB = require('./mainDB/mongoose');

const userRoutes = require('./routes/userRoutes'); // Make sure the path is correct
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const PORT = 3000;

connectDB();  // Ensure DB connection is established

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Use the correct route here
app.use('/users', userRoutes);  // This will route '/user' to userRoutes
app.use('/rooms', roomRoutes);
app.use('/bookings', bookingRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
