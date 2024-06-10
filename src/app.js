const express = require('express');
const morgan = require('morgan');
const fileRoutes = require('./routes/fileRoutes');
const path = require('path'); 

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); 

app.use('/files', fileRoutes);

module.exports = app;
