import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LikeStorage {
    likes: Set<string> = new Set<string>(); // Initialize a Set to store liked book IDs

    constructor() { }

    // Toggle the like status for a book
    toggleLike(bookId: string): void {
        if (this.likes.has(bookId)) {
            this.likes.delete(bookId); // If already liked, remove the book ID from the set
        } else {
            this.likes.add(bookId); // If not liked, add the book ID to the set
        }
    }
}
