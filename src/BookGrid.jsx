import React, { useEffect, useState } from "react";
import "./index.css";

const BookGrid = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const response = await fetch("https://openlibrary.org/search.json?q=javascript&limit=9");
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

    return (
        <div className="container">
            <h1 className="title">Query the internet book: Javascript</h1>
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
