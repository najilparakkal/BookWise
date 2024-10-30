export interface IUserDetails {
    userName?: string;
    email?: string;
    password?: string;
}
export interface IAdminDetails {
    email?: string;
    password?: string;
}

export interface IUserState {
    userName?: string | null;
    email?: string | null;
    status?: 'idle' | 'loading' | 'failed' | 'success';
    error?: string | null;
  }


  export interface IBookDetails {
    title?: string | undefined;
    author?: string;
    year?: string;
    isbn?: string;
    description?: string;
    coverImage?: File | null | string;  // File type for uploaded cover image
    pages?: File[]; // Array of File type for uploaded pages
}


