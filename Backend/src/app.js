const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const app = express(); 
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use('/ai', aiRoutes);

module.exports = app;