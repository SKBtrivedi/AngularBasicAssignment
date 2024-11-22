import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './core/user/signup/signup.component';
import { LoginComponent } from './core/user/login/login.component';
import { ListingsComponent } from './core/pages/listings/listings.component';
import { ViewDetailsComponent } from './core/pages/view-details/view-details.component';
import { CreatePostComponent } from './core/pages/create-post/create-post.component';
import { AuthGuard } from './core/user/auth.guard';
import { ProfileComponent } from './core/user/profile/profile.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listings', component: ListingsComponent },
  { path: 'details/:id', component: ViewDetailsComponent },
  { path: 'favorites', component: ListingsComponent },
  { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/listings', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
