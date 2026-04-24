
const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');

app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
    console.log('Server is running on port 8000');
})
