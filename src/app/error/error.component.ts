import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
    // After 1.5 seconds, navigate to the login page.
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }
}
