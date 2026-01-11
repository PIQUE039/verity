// IMPORTING DEPENDENCIES
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

//CONFIGURATION
dotenv.config();
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(cors());

//ROUTES
app.get('/',(req,res) => {
   res.send('API is running...');
});

// STARTING THE SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => [
   console.log(`Server is running on prot ${PORT}`)
]);