import { Component, OnInit } from '@angular/core';
import { ReviewStorage } from '../review.storage';
import { BookService } from '../book.service';
import { CheckLogin } from '../check.login';
import { Router } from '@angular/router';
import { LikeStorage } from '../like.storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  likes: string[] = [];  // Array to store liked book IDs
  reviews: Map<string, { review: string, timestamp: Date }[]> = new Map<string, { review: string, timestamp: Date }[]>();  // Map to store book reviews
  forRender: string[][] = [];  // Array for rendering book reviews and details
  forLikes: string[][] = [];  // Array for rendering liked book details

  constructor(private reviewStorage: ReviewStorage, private bookService: BookService, private checkLogin: CheckLogin, private router: Router, private likeStorage: LikeStorage) { }

  ngOnInit(): void {
    if (!this.checkLogin.getLoginStatus()) {
      this.router.navigate(['/error']); // Redirect to the error page if not logged in
    } else {
      this.likes = Array.from(this.likeStorage.likes); // Get liked book IDs
      this.likes.forEach((element) => {
        this.bookService.searchById(element)
          .subscribe((data: any) => {
            const tempList: string[] = [];
            tempList.push(data.volumeInfo.title);
            const image: any = data.volumeInfo.imageLinks;
            if (image && image.thumbnail && image.thumbnail.length > 0) {
              tempList.push(image.thumbnail);
            } else {
              tempList.push('');
            }
            this.forLikes.push(tempList); // Add liked book details to forLikes array
          });
      });

      this.reviews = this.reviewStorage.getReviews(); // Get book reviews from storage
      this.reviews.forEach((value: { review: string, timestamp: Date }[], key: string) => {
        this.bookService.searchById(key)
          .subscribe((data: any) => {
            value.forEach(item => {
              const tempList: string[] = [];
              tempList.push(key); // Add book ID
              tempList.push(data.volumeInfo.title); // Add book title
              const authors: string[] = data.volumeInfo.authors;
              if (authors && authors.length > 0) {
                tempList.push(authors.join(', ')); // Add authors
              } else {
                tempList.push('N/A'); // Add 'N/A' if authors are not available
              }
              const image: any = data.volumeInfo.imageLinks;
              if (image && image.thumbnail && image.thumbnail.length > 0) {
                tempList.push(image.thumbnail); // Add book thumbnail image
              } else {
                tempList.push(''); // Add an empty string if thumbnail is not available
              }
              tempList.push(item.review); // Add review text
              tempList.push(item.timestamp.toISOString()); // Add review timestamp
              this.forRender.push(tempList); // Add book review details to forRender array
            });
          });
      });
    }
  }

  logout(): void {
    this.checkLogin.setLogin(false); // Log out the user
    this.router.navigate(['/login']); // Navigate to the login page
  }
}
