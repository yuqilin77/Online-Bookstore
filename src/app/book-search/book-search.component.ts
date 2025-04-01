import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { CheckLogin } from '../check.login';
import { LikeStorage } from '../like.storage';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {
  showNotification: boolean = false;  // Flag for showing notification
  title: string = '';  // Title input for book search
  author: string = '';  // Author input for book search
  searchResults: any[] = [];  // Results of the book search
  likes: Set<string> = new Set<string>();  // Set to store liked book IDs

  constructor(private bookService: BookService, private _snackBar: MatSnackBar, private router: Router, private checkLogin: CheckLogin, private likeStorage: LikeStorage) { }

  writeReview(bookId: string): void {
    this.router.navigate(['/reviews', bookId]); // Navigate to the review page with the book ID
  }

  toggleLike(bookId: string): void {
    this.likeStorage.toggleLike(bookId); // Toggle like status for a book
  }

  ngOnInit(): void {
    if (!this.checkLogin.getLoginStatus()) {
      this.router.navigate(['/error']); // Redirect to the error page if not logged in
    } else {
      this.showNotification = false; // Initialize the flag for showing notification
      this.likes = this.likeStorage.likes; // Get liked books from storage
    }
  }

  searchBooks(): void {
    if (this.title.trim() === '') {
      return;  // If the title is empty or contains only whitespace, exit the function
    }
    let query = `${this.title}+intitle:${this.title}`; // Construct the search query

    if (this.author.trim() !== '') {
      query += `+inauthor:${this.author}`; // Add author to the query if provided
    }
    if (query.trim() !== '') {
      this.bookService.searchBooks(query)
        .subscribe((data: any) => {
          this.searchResults = data.items || []; // Store search results
          if (this.searchResults.length === 0) {
            this.showNotification = true;
            this._snackBar.open('No search results found', 'Close', {
              duration: 2000
            });
          }
        });
    }
  }

  logout(): void {
    this.checkLogin.setLogin(false); // Log out the user
    this.router.navigate(['/login']); // Navigate to the login page
  }
}
