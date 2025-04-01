import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BookService {
    private apiUrl = 'https://www.googleapis.com/books/v1/volumes'; // The base URL for the Google Books API
    private apiKey = 'AIzaSyC2WSJOIE_hRnD-M_sg_MNbyfLRxiOHtNo'; // Your API key

    constructor(private http: HttpClient) { }

    // Search for books based on a query string
    searchBooks(query: string) {
        const url = `${this.apiUrl}?q=${query}&key=${this.apiKey}`; // Construct the URL with the query and API key
        return this.http.get(url); // Make an HTTP GET request to the constructed URL
    }

    // Search for a book by its unique identifier (id)
    searchById(id: string) {
        const url = `${this.apiUrl}/${id}`; // Construct the URL with the book's unique ID
        return this.http.get(url); // Make an HTTP GET request to the constructed URL
    }
}
