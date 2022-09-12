const express = require('express');
const connectDB = require('./config/db');

// create server
const app = express();

// connect to database
connectDB();

// app port
const port = process.env.PORT || 4000;

// enable express.json
app.use(express.json({ extended: true }));

// app routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

// launch server
app.listen(port, '0.0.0.0', () => {
	console.log(`Server running on port ${ port }. Visit http://localhost:${ port }/`);
});
