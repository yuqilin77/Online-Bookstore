import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { ReviewStorage } from '../review.storage';
import { Router } from '@angular/router';
import { CheckLogin } from '../check.login';

@Component({
  selector: 'app-review',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  bookId: string = '';  // Store the book ID extracted from the route
  book: any;  // Store information about the selected book
  review: string = '';  // Store the review text entered by the user

  constructor(private route: ActivatedRoute, private bookService: BookService, private reviewStorage: ReviewStorage, private router: Router, private checkLogin: CheckLogin) { }

  ngOnInit(): void {
    if (!this.checkLogin.getLoginStatus()) {
      this.router.navigate(['/error']); // Redirect to the error page if not logged in
    } else {
      this.bookId = this.route.snapshot.paramMap.get('id')!; // Get the book ID from the route parameters
      this.bookService.searchById(this.bookId)
        .subscribe((data: any) => {
          this.book = data; // Assign the fetched book information to the book object
        });
    }
  }

  // Add a function to handle the review saving
  saveReview(review: any): void {
    const reviewText: string = review.review; // Extract the review text from the input
    this.reviewStorage.saveReview(this.bookId, reviewText); // Save the review in the storage
    this.router.navigate(['/profile']); // Navigate back to the profile page
  }

  logout(): void {
    this.checkLogin.setLogin(false); // Log out the user
    this.router.navigate(['/login']); // Navigate to the login page
  }
}
