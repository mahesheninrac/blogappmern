
const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

require('dotenv').config();

connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.listen(PORT, () => {
    console.log('Server is running on port 8000');
})

app.use("/api/users", require("./routes/userRoutes"))
