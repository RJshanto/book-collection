const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Initialize empty array to store books
let books = [];

// Serve static HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Add a book
app.post('/books', (req, res) => {
  const { title, author, publishedDate } = req.body;

  // Generate unique ID for the book
  const id = Date.now().toString();

  // Create book object
  const book = { id, title, author, publishedDate };

  // Add book to the collection
  books.push(book);

  // Send response with the created book
  res.status(201).json(book);
});

// Delete a book
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;

  // Find index of the book with the specified ID
  const index = books.findIndex(book => book.id === id);

  if (index !== -1) {
    // Book found, remove it from the collection
    const deletedBook = books.splice(index, 1);
    res.json({ message: 'Book deleted successfully' });
  } else {
    // Book not found
    res.status(404).json({ message: 'Book not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// my concept is clear of this project ...i take some help from another resorues to clear my project concept ...