import React, { useEffect, useState, useRef, ChangeEvent } from 'react';
import { deleteBook, fetchBooks, updateBook, updateCoverImage } from '../../api/admin/Service';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography, Box, Paper, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';

interface Book {
    _id: string;
    title: string;
    author: string;
    isbn: string;
    year: string;
    description: string;
    coverImage: string;
    createdAt: string;
}

const Books: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [editBookId, setEditBookId] = useState<string | null>(null);
    const [editedBook, setEditedBook] = useState<Partial<Book>>({});
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        fetchBooks()
            .then((data) => {
                setBooks(data?.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleEdit = (book: Book) => {
        setEditBookId(book._id);
        setEditedBook({ ...book });
        setErrors({}); // Clear previous errors
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
        validateInput(name, value); // Validate on input change
    };

    const validateInput = (name: string, value: string) => {
        const newErrors = { ...errors };
        switch (name) {
            case 'title':
            case 'author':
            case 'isbn':
            case 'description':
                newErrors[name] = value ? '' : `required.`;
                break;
            case 'year':
                if (!/^\d+$/.test(value)) {
                    newErrors[name] = 'only number.';
                } else {
                    newErrors[name] = '';
                }
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };

    const isValidForm = () => {
        return !Object.values(errors).some((error) => error) && Object.keys(editedBook).length > 0;
    };

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>, id: string) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("coverImage", file);

            const reader = new FileReader();
            reader.onloadend = async () => {
                setEditedBook((prevBook) => ({
                    ...prevBook,
                    coverImage: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);

            const imageUrl = await updateCoverImage(id, formData);
            if (imageUrl) {
                console.log("Image uploaded successfully:", imageUrl);
            } else {
                console.log("Failed to update image URL.");
            }
        }
    };

    const handleUpdate = async () => {
        if (!isValidForm()) return; // Prevent update if form is invalid

        let { coverImage, title, isbn, year, description, author, _id } = editedBook;
        const response = await updateBook(_id + "", { coverImage, title, isbn, year, description, author });
        if (response) {
            setBooks((prevBooks:any) =>
                prevBooks.map((book:any) =>
                    book._id === _id ? { ...book, coverImage, title, isbn, year, description, author } : book
                )
            );
            toast.success("Updated");
            setEditBookId(null);
        } else {
            toast.error("Please try again");
            setEditBookId(null);
        }
    };

    const handleDelete = async (id: string) => {
        let response = await deleteBook(id);
        if (response) {
            toast.success("Book Removed");
            setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
        } else {
            toast.error("Please try again");
        }
    };

    return (
        <Box
            sx={{
                width: '100%',
                margin: '0 auto',
                padding: '20px',
                overflowY: 'auto',
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Book List
            </Typography>
            <TableContainer component={Paper}>
                <Table aria-label="book table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Cover Image</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>ISBN</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Actions</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book) => (
                            <TableRow key={book._id}>
                                <TableCell>
                                    {editBookId === book._id ? (
                                        <>
                                            <img
                                                src={editedBook.coverImage || book.coverImage}
                                                alt={book.title}
                                                onClick={handleImageClick}
                                                style={{
                                                    width: 60,
                                                    height: 90,
                                                    objectFit: "cover",
                                                    borderRadius: "4px",
                                                    cursor: "pointer",
                                                }}
                                            />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={fileInputRef}
                                                style={{ display: "none" }}
                                                onChange={(e) => handleImageChange(e, book._id)}
                                            />
                                        </>
                                    ) : (
                                        <img
                                            src={book.coverImage}
                                            alt={book.title}
                                            style={{ width: 60, height: 90, objectFit: "cover", borderRadius: "4px" }}
                                        />
                                    )}
                                </TableCell>
                                <TableCell >
                                    {editBookId === book._id ? (
                                       <TextField
                                       name="title"
                                       value={editedBook.title || ''}
                                       onChange={handleInputChange}
                                       error={!!errors.title}
                                       helperText={errors.title}
                                       InputProps={{
                                           style: {
                                               height: '40px', // Adjust height as needed
                                               width: '100px', // Adjust width as needed
                                           },
                                       }}
                                   />
                                   
                                    ) : (
                                        book.title
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editBookId === book._id ? (
                                        <TextField
                                            name="author"
                                            value={editedBook.author || ''}
                                            onChange={handleInputChange}
                                            error={!!errors.author}
                                            helperText={errors.author}
                                            InputProps={{
                                                style: {
                                                    height: '40px', // Adjust height as needed
                                                    width: '100px', // Adjust width as needed
                                                },
                                            }}
                                        />
                                    ) : (
                                        book.author
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editBookId === book._id ? (
                                        <TextField
                                            name="isbn"
                                            value={editedBook.isbn || ''}
                                            onChange={handleInputChange}
                                            error={!!errors.isbn}
                                            helperText={errors.isbn}
                                            InputProps={{
                                                style: {
                                                    height: '40px', // Adjust height as needed
                                                    width: '100px', // Adjust width as needed
                                                },
                                            }}
                                        />
                                    ) : (
                                        book.isbn
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editBookId === book._id ? (
                                        <TextField
                                            name="year"
                                            value={editedBook.year || ''}
                                            onChange={handleInputChange}
                                            error={!!errors.year}
                                            helperText={errors.year}
                                            InputProps={{
                                                style: {
                                                    height: '40px', // Adjust height as needed
                                                    width: '100px', // Adjust width as needed
                                                },
                                            }}
                                        />
                                    ) : (
                                        book.year
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editBookId === book._id ? (
                                        <TextField
                                            name="description"
                                            value={editedBook.description || ''}
                                            onChange={handleInputChange}
                                            error={!!errors.description}
                                            helperText={errors.description}
                                            InputProps={{
                                                style: {
                                                    height: '40px', // Adjust height as needed
                                                    width: '100px', // Adjust width as needed
                                                },
                                            }}
                                        />
                                    ) : (
                                        book.description
                                    )}
                                </TableCell>
                                <TableCell>
                                    {new Date(book.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    {editBookId === book._id ? (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleUpdate}
                                            disabled={!isValidForm()} // Disable button if form is invalid
                                        >
                                            Update
                                        </Button>
                                    ) : (
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleEdit(book)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        color="secondary"
                                        onClick={() => handleDelete(book._id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default React.memo(Books);
