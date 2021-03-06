const express = require('express');
var bodyParser = require('body-parser');



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const Books = [
    {
    'id': 1,
    'name': 'the old man and the sea',
    'author': 'Hemmingway, Ernest',
    'pDate': 1952,
    'rating': 8.2},

    {
    'id': 2,
    'name': 'Fight Club',
    'author': 'Palahniuk, Chuck',
    'pDate': 1996,
    'rating': 9.3},
];


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pages/index.html');
});

app.get('/books', (req, res) => {
    res.send(Books);
});

app.get('/book', (req, res) => {
   const book = Books.find(c => c.id === parseInt(req.query.id));

   if(!book) res.status(404).sendFile(__dirname + '/pages/404.html');

   else res.send(book);
        
});


app.get('/addbook', (req, res) => {
    res.sendFile(__dirname + '/pages/books.html');
});

app.post('/addbook', (req, res) => {
    
    const newBook = {
        'id': Books.length + 1,
        'name': req.body.name,
        'author': req.body.author,
        'pDate': req.body.pDate,
        'rating': req.body.rating
    };
    Books.push(newBook);
    res.send(newBook);
});
 
app.get('/rmbook', (req, res) => {
    res.sendFile(__dirname + '/pages/rmbook.html');
    console.log('woo');
});

app.post('/rmbook', (req, res) => { 
    //HTML5 doesnt seem to support delete http request
    //so using post instead.
    const book = Books.find(c => c.id === parseInt(req.body.id));

    if(!book) {
        res.status(404).sendFile(__dirname + '/pages/404.html')
    }
    else{
    const index = Books.indexOf(book);
    console.log('index');
    Books.splice(index, 1);
    }
    console.log('At least this works');
    res.send('woop');
   
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});