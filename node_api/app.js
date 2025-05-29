const express = require('express')
const app = express()
const userRoutes = require('./routes/user_routes')

app.use(express.json()); // Middleware to parse JSON
app.use('/api/users', userRoutes); // Route middleware

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

