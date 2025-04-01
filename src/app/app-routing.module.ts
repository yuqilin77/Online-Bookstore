import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reviews/:id', component: ReviewsComponent },
  { path: 'search', component: BookSearchComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'error', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
