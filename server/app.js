// app.js
const express = require('express');
const app = express();
const routes = require('./routes/index.js');
const PORT = process.env.PORT || 3000;
app.use(express.json()); 
    
    routes(app);




// Define your routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
