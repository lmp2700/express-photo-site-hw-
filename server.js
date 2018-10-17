const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan')
const Photos = require('./models/photomodel');

require('./db/db');

const photoController = require('./controllers/photos');
const userController = require('./controllers/users');

app.use(morgan('short'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));


app.use('/photos', photoController);
app.use('/users', userController);

app.get('/', (req, res) => {
    console.log('hi')
    res.render('index.ejs', {
        photos: Photos
    });
})

app.listen(3000);