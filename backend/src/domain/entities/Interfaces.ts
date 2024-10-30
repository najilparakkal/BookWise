export interface IUserDetails {
    userName?: string;
    email?: string;
    password?: string;
}
export interface IAdminDetails {
    email?: string;
    password?: string;
}

export interface IBookFields {
    title: string;
    author: string;
    year: string;
    isbn: string;
    description: string;
}

export interface IBookFiles {
    coverImage?: File[]; // Array to handle multiple files if necessary
    pages?: File[];
}


  export interface IBookDetails {
    title?: string;
    author?: string;
    year?: string;
    isbn?: string;
    description?: string;
    coverImage?: File | null | string;  // File type for uploaded cover image
    pages?: File[]; // Array of File type for uploaded pages
}