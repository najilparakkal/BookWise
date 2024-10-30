import React, { useEffect, useLayoutEffect, useState } from "react";
import {
    Card, CardContent, CardHeader, Typography, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
    IconButton,
    Box
} from "@mui/material";
import { LibraryBooks, Add, Layers, People, Person } from "@mui/icons-material";
import toast from "react-hot-toast";
import { addBook, dashboard, logout } from "../../api/admin/Service";
import Books from "./Books";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";



interface ICounts {
    totalBooks: string;
    recentAdditions: string;
    totalAuthors: string;
    totalPublishers: string;
}

export default function Dashboard() {
    const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
    const [pdfFiles, setPdfFiles] = useState<File[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate()
    const [book, setBook] = useState<boolean>(false)
    const [dashCount, setDashCount] = useState<ICounts>({
        totalBooks: "",
        recentAdditions: "",
        totalAuthors: "",
        totalPublishers: "",
    })
    const [bookDetails, setBookDetails] = useState<any>({
        title: "",
        author: "",
        year: "",
        isbn: "",
        description: "",
        coverImage: null,
        pages: [],
    });
    const [errors, setErrors] = useState({
        title: '',
        author: '',
        year: '',
        isbn: '',
        description: '',
        coverImage: '',
        pages: '',
    });

    useLayoutEffect(() => {
        const token = Cookies.get("adminToken");
        if (!token) {
            navigate("/admin");
        }
    }, [navigate]);


    useLayoutEffect(() => {
        dashboard()
            .then((data) => {
                setDashCount({
                    totalBooks: data.booksCount.toString(),
                    recentAdditions: data.todaysBooksCount.toString(),
                    totalAuthors: data.authorsCount.toString(),
                    totalPublishers: data.usersCount
                });
            })
            .catch((err: Error) => {
                console.log(err);
            });
    }, []);

    const handleValidation = () => {
        const newErrors = { title: '', author: '', year: '', isbn: '', description: '', coverImage: '', pages: '' };
        let isValid = true;

        if (!bookDetails.title) {
            newErrors.title = 'Title is required';
            isValid = false;
        }
        if (!bookDetails.author) {
            newErrors.author = 'Author is required';
            isValid = false;
        }
        if (!bookDetails.year) {
            newErrors.year = 'Valid year is required';
            isValid = false;
        }
        if (!bookDetails.isbn) {
            newErrors.isbn = 'ISBN is required';
            isValid = false;
        }
        if (!bookDetails.description) {
            newErrors.description = 'Description is required';
            isValid = false;
        }
        if (!coverImagePreview) {
            newErrors.coverImage = 'Cover image is required';
            isValid = false;
        }
        if (pdfFiles.length === 0) {
            newErrors.pages = 'pages is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };
    const handleClickOpen = (): void => {
        setOpen(true);
    };

    const handleBookOpen = (): void => {
        setBook(true)
    }
    const handleClose = (): void => {
        setOpen(false);
        setBookDetails({
            title: "",
            author: "",
            year: "",
            isbn: "",
            description: "",
            coverImage: null,
            pages: [],
        });
        setCoverImagePreview(null)
        setPdfFiles([])
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setBookDetails((prevDetails: any) => ({
            ...prevDetails,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleFileChange = (e: any): void => {
        if (e.target.files) {
            const imageFile = e.target.files[0];
            setCoverImagePreview(URL.createObjectURL(imageFile));

            setBookDetails((prevDetails: any) => ({
                ...prevDetails,
                coverImage: e.target.files[0],
            }));
        }
    };

    const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setPdfFiles(files);
            setBookDetails((prevDetails: any) => ({
                ...prevDetails,
                pages: files,
            }));
        }
    };

    const handleSubmit = async (): Promise<void> => {
        try {

            if (handleValidation()) {

                const formData = new FormData();

                if (bookDetails.coverImage instanceof File) {
                    formData.append("coverImage", bookDetails.coverImage);
                }

                if (Array.isArray(bookDetails.pages)) {
                    bookDetails.pages.forEach((file: any) => {
                        if (file instanceof File) {
                            formData.append("pages", file);
                        }
                    });
                }
                formData.append("title", bookDetails.title);
                formData.append("author", bookDetails.author);
                formData.append("isbn", bookDetails.isbn);
                formData.append("description", bookDetails.description);
                formData.append("year", bookDetails.year || '');


                await toast.promise(addBook(formData), {
                    loading: 'Adding a book...',
                    success: 'Book added!',
                    error: () => 'Book alredy exist.',
                });
                handleClose()
            }
        } catch (error) {
            console.log(error);
        }
    };

    const closeBooks = () => {
        setBook(false);
    };

    const handleLogout = () => {
        logout()
        navigate("/admin")
    };

    return (
        <div style={{ padding: "24px" }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                style={{ padding: '24px' }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Dashboard Overview
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                    style={{ marginLeft: 'auto' }} // Ensure it's pushed to the right
                >
                    Logout
                </Button>
            </Box>
            <Grid container spacing={3}>
                {/* Total Books Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card onClick={handleBookOpen} >
                        <CardHeader title="Total Books" avatar={<LibraryBooks />} />
                        <CardContent>
                            <Typography variant="h5">{dashCount.totalBooks}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader title="Recent Additions" avatar={<Add />} />
                        <CardContent>
                            <Typography variant="h5">{dashCount.recentAdditions}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader title="Total Authors" avatar={<People />} />
                        <CardContent>
                            <Typography variant="h5">{dashCount.totalAuthors}</Typography>
                        </CardContent>
                    </Card>
                </Grid>


                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader title="Total Users" avatar={<Person />} />
                        <CardContent>
                            <Typography variant="h5">{dashCount.totalPublishers}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4} >
                    <Card
                        onClick={handleClickOpen}
                        sx={{ backgroundColor: '#60A5FA', color: 'white' }}
                    >
                        <CardHeader title="" avatar={<Layers />} />
                        <CardContent>
                            <Typography variant="h5">Add A Book</Typography>
                        </CardContent>
                    </Card>

                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Book</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {/* Title */}
                        <Grid item xs={6}>
                            <TextField
                                margin="dense"
                                name="title"
                                label="Title"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={bookDetails.title}
                                onChange={handleChange}
                                error={!!errors.title}
                                helperText={errors.title}
                                required
                            />
                        </Grid>
                        {/* Author */}
                        <Grid item xs={6}>
                            <TextField
                                margin="dense"
                                name="author"
                                label="Author"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={bookDetails.author}
                                onChange={handleChange}
                                error={!!errors.author}
                                helperText={errors.author}
                                required
                            />
                        </Grid>

                        {/* Year */}
                        <Grid item xs={6}>
                            <TextField
                                margin="dense"
                                name="year"
                                label="Year"
                                type="number"
                                fullWidth
                                variant="outlined"
                                value={bookDetails.year}
                                onChange={handleChange}
                                error={!!errors.year}
                                helperText={errors.year}
                                required
                            />
                        </Grid>

                        {/* ISBN */}
                        <Grid item xs={6}>
                            <TextField
                                margin="dense"
                                name="isbn"
                                label="ISBN"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={bookDetails.isbn}
                                onChange={handleChange}
                                error={!!errors.isbn}
                                helperText={errors.isbn}
                                required
                            />
                        </Grid>

                        {/* Description */}
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                name="description"
                                label="Description"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={bookDetails.description}
                                onChange={handleChange}
                                error={!!errors.description}
                                helperText={errors.description}
                                required
                            />
                        </Grid>

                        {/* Cover Image */}
                        <Grid item xs={12} container justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="coverImage"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="coverImage">
                                    <Button variant="outlined" component="span">
                                        Upload Cover Image
                                    </Button>
                                </label>
                                {errors.coverImage && (
                                    <span style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>{errors.coverImage}</span>
                                )}
                            </Grid>
                            <Grid item>
                                {coverImagePreview && (
                                    <img
                                        src={coverImagePreview}
                                        alt="Cover Preview"
                                        width={100}
                                        style={{ alignSelf: 'flex-end' }}
                                        className="h-20 w-20"
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Upload Pages with Preview */}
                    <Grid item xs={12} container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <input
                                accept="application/pdf"
                                style={{ display: 'none' }}
                                id="pages"
                                type="file"
                                multiple
                                onChange={handlePageChange}
                            />
                            <label htmlFor="pages">
                                <Button variant="outlined" component="span" style={{ marginTop: '16px' }}>
                                    Upload Pages
                                </Button>
                            </label>
                            {errors.pages && (
                                <span style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>{errors.pages}</span>
                            )}
                        </Grid>
                        <Grid item>
                            {pdfFiles.length > 0 && (
                                <ul style={{ margin: 0, padding: 0, listStyleType: 'none' }}>
                                    {pdfFiles.map((file, index) => (
                                        <li key={index}>{file.name}</li>
                                    ))}
                                </ul>
                            )}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ width: '100%' }} className="bg-gray-800 border-b border-white-[4px]">
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item>
                            <Button onClick={handleClose} color="primary" fullWidth>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={handleSubmit} color="primary" fullWidth >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>

            </Dialog>
            <Dialog
                open={book}
                PaperProps={{
                    sx: {
                        width: "80%",
                        maxWidth: "none",
                    }
                }}
            >
                <DialogTitle>
                    {/* Title or leave blank for spacing */}
                    <IconButton
                        onClick={closeBooks}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Books />
            </Dialog>


        </div >
    );
}
