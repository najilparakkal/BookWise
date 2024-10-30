import React, { useEffect, useState } from 'react';
import { fetchAllBooks, searchBooks } from '../api/Service';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/UserSlice';
import { useDispatch } from 'react-redux';

interface Book {
    _id: string;
    title: string;
    author: string;
    year: string;
    coverImage: string;
    description: string;
    pages: string;
}

const booksPerPage = 12;

export default function Component() {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = event.target.value;
        setSearchTerm(searchQuery);

        if (searchQuery.trim()) {
            searchBooks(searchQuery)
                .then((data) => setBooks(data))
                .catch((err) => console.log(err));
        } else {
            // Fetch all books when the search input is empty
            fetchAllBooks().then(setBooks).catch(console.error);
        }
    };

    useEffect(() => {
        fetchAllBooks()
            .then((data) => setBooks(data))
            .catch((err) => console.log(err));
    }, []);

    const openModal = (book: Book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedBook(null);
        setIsModalOpen(false);
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const displayedBooks = books.slice(
        (currentPage - 1) * booksPerPage,
        currentPage * booksPerPage
    );

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="min-h-screen p-4 md:p-8 w-full flex flex-col items-center bg-black relative">
            <button
                className="absolute top-4 right-4 mt-7 bg-red-700 text-white font-semibold py-1 px-4 rounded hover:bg-blue-600"
                onClick={handleLogout}
            >
                Logout
            </button>
            <div className="w-full max-w-6xl flex flex-col flex-grow">
                <div className="mb-8 w-full flex justify-center">
                    <TextField
                        label="Search by title, author, or year"
                        variant="standard"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full max-w-xl"
                        autoComplete="off"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon sx={{ color: '#2C2C2C' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiInput-root': {
                                color: 'white',
                                '&:before': {
                                    borderBottom: '1px solid #2C2C2C',
                                },
                                '&:hover:not(.Mui-disabled):before': {
                                    borderBottom: '1px solid #2563EB',
                                },
                                '&.Mui-focused:after': {
                                    borderBottom: '2px solid #2563EB',
                                },
                                fontSize: '0.875rem',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'gray',
                                fontSize: '0.875rem',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#2563EB',
                            },
                        }}
                    />
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 flex-grow">
                    {displayedBooks.length > 0 ? (
                        displayedBooks.map((book) => (
                            <div key={book._id}>
                                <div
                                    className="bg-black shadow-sm rounded-md overflow-hidden flex flex-col items-center cursor-pointer"
                                    onClick={() => openModal(book)}
                                >
                                    <img
                                        src={book.coverImage || '/placeholder.svg?height=200&width=120'}
                                        alt={book.title}
                                        className="h-44 w-36 rounded-lg object-cover"
                                    />
                                </div>
                                <div className="p-2 text-center">
                                    <h3 className="text-white font-bold text-xs truncate">{book.title}</h3>
                                    <p className="text-gray-400 text-xs truncate">{book.author}</p>
                                    <p className="text-gray-500 text-xs">{book.year}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">No books found.</p>
                    )}
                </div>

                <div className="flex justify-center items-center mt-4">
                    <Pagination
                        count={Math.ceil(books.length / booksPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="circular"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                color: 'gray',
                                '&.Mui-selected': {
                                    fontSize: '1.1rem',
                                    color: '#2563EB',
                                },
                            },
                        }}
                    />
                </div>
            </div>

            {isModalOpen && selectedBook && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="bg-white p-4 rounded-lg w-3/4 h-5/6 overflow-auto relative">
                        <button
                            onClick={closeModal}
                            className="absolute text-3xl top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                            &times;
                        </button>
                        <h2 className="text-lg font-bold mb-2 text-center">{selectedBook.title}</h2>
                        <p className="text-center mb-4 text-gray-700">{selectedBook.author}</p>
                        <div className="p-4 text-gray-800">
                            <div style={{ width: '100%', height: '440px' }}>
                                <iframe
                                    src={`https://docs.google.com/gview?url=${selectedBook.pages}&embedded=true`}
                                    style={{ width: '100%', height: '100%', border: 'none' }}
                                    title="PDF Preview"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
