import React, { useEffect, useState } from "react";
import "./index.css";

const BookGrid = () => {
    
    const [books, setBooks] = useState([]);
    const [name, setName] = useState("");
    const [numBooks, setNumBooks] = useState(6); 
    const [submitted, setSubmitted] = useState(false);

    const fetchBooks = async (count) => {
        const response = await fetch(`https://openlibrary.org/search.json?q=javascript&limit=${count}`);
        const data = await response.json();
        const bookList = data.docs.map((book, index) => ({
            id: index,
            title: book.title,
            author: book.author_name ? book.author_name.join(", ") : "Unknown Author",
            cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : "https://via.placeholder.com/150",
        }));
        setBooks(bookList);
    };

    const deleteBook = (bookId) => {
        setBooks(books.filter((book) => book.id !== bookId));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        fetchBooks(numBooks);
    };

    return (
        <div>
            <h1>Book Display</h1>

            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <input 
                    type="number" 
                    value={numBooks} 
                    onChange={(e) => setNumBooks(e.target.value)} 
                    min="1" 
                    max="20"
                    required 
                />
                <button type="submit">Show</button>
            </form>

            {submitted && <h2>{name} wants to display {numBooks} books</h2>}

            <div className="book-grid">
                {books.map((book) => (
                    <div key={book.id} className="book">
                        <button className="delete-btn" onClick={() => deleteBook(book.id)}>X</button>
                        <img src={book.cover} alt={book.title} />
                        <h3>{book.title}</h3>
                        <p>by {book.author}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookGrid;
