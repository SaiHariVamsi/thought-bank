const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes.js');
const addRoutes = require('./routes/addRoutes.js');
const fetchRoutes = require('./routes/fetchRoutes.js');
const deleteRoutes = require('./routes/deleteRoutes.js');
const { connectDB } = require('./config/db.js');

const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.use('/api/', userRoutes);
app.use('/api/', addRoutes);
app.use('/api/', fetchRoutes);
app.use('/api/', deleteRoutes);

const PORT = 1338;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
