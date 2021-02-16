const express = require('express');
const app = express();
 
const Books = [
    {
    'id': 1,
    'name': 'the old man and the sea',
    'author': 'Hemmingway, Ernest',
    'publicationDate': 1952,
    'rating': 8.2},

    {
    'id': 2,
    'name': 'Fight Club',
    'author': 'Palahniuk, Chuck',
    'publicationDate': 1996,
    'rating': 9.3},
];


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pages/index.html');
});

app.get('/books', (req, res) => {
   const book = Books.find(c => c.id === parseInt(req.query.id));

   if(!book) res.status(404).sendFile(__dirname + '/pages/404.html');

   else res.send(book);
        
   
});
 
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});