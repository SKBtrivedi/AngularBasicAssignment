import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SignupComponent } from './core/user/signup/signup.component';
import { LoginComponent } from './core/user/login/login.component';
import { ListingsComponent } from './core/pages/listings/listings.component';
import { ViewDetailsComponent } from './core/pages/view-details/view-details.component';
import { CreatePostComponent } from './core/pages/create-post/create-post.component';
import { ProfileComponent } from './core/user/profile/profile.component';
import { AuthService } from './core/user/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ListingsComponent,
    ViewDetailsComponent,
    NavbarComponent,
    CreatePostComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
