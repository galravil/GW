const express = require('express');
const cors = require('cors')

const app = express();

// Init Middleware
// to receive json
app.use(express.json({ extended: false }))


app.get('/', (req, res) => {
    res.json({ msg: 'welcome' })
});


// Enable CORS
app.use(cors())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/registration', require('./routes/registration'))
app.use('/api/galaxy', require('./routes/galaxy'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
