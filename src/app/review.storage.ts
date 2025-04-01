import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ReviewStorage {
    reviews: Map<string, { review: string, timestamp: Date }[]> = new Map(); // Initialize a Map to store book reviews

    constructor() { }

    // Save a review for a book
    saveReview(bookId: string, review: string): void {
        const timestamp = new Date(); // Get the current timestamp
        if (this.reviews.has(bookId)) {
            this.reviews.get(bookId)!.push({ review: review, timestamp: timestamp }); // If the book already has reviews, add a new review
        } else {
            this.reviews.set(bookId, [{ review: review, timestamp: timestamp }]); // If the book has no reviews yet, create a new entry
        }
    }

    // Get all book reviews
    getReviews(): Map<string, { review: string, timestamp: Date }[]> {
        return this.reviews; // Return the map containing all book reviews
    }
}
