import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { BooksComponent } from './pages/books/books.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NewBookComponent } from './pages/new-book/new-book.component';
import { StoreComponent } from './pages/store/store.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { WildCardComponent } from './pages/wild-card/wild-card.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BooksComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'new-book',
    canActivate: [AuthGuard],
    component: NewBookComponent,
    pathMatch: 'full'
  },
  {
    path: 'store',
    canActivate: [AuthGuard],
    component: StoreComponent,
    pathMatch: 'full'
  },
  {
    path: 'book/:id',
    component: BookDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: WildCardComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [
  HomeComponent,
  BooksComponent,
  SignupComponent,
  LoginComponent,
  DashboardComponent,
  NewBookComponent,
  StoreComponent,
  BookDetailsComponent,
  WildCardComponent
];
