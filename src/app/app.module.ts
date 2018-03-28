import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//external
import { RouterModule, Routes } from '@angular/router';
import * as $ from 'jquery';
import 'hammerjs';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ContactService } from './services/contact.service';
import { BookingService } from './services/booking.service';
import { AuthService } from './services/auth.service';
import { CareerService } from './services/career.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LightboxModule } from 'angular2-lightbox';
import 'hammerjs';
import 'mousetrap';
import { ModalGalleryModule } from 'angular-modal-gallery';

//components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';
import { CareerComponent } from './career/career.component';
import { GalaryComponent } from './galary/galary.component';
import { ServiceComponent } from './service/service.component';
import { CleaningComponent } from './cleaning/cleaning.component';
import { BookingComponent } from './booking/booking.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { DisplayBookingsComponent } from './display-bookings/display-bookings.component';
import { MessagesComponent } from './messages/messages.component';

const appRoutes: Routes = [
  { path: 'displayBookings', component: DisplayBookingsComponent, canActivate: [AuthGuard]  },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]  },
  { path: 'about', component: AboutComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: 'admin', component: AdminComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'career', component: CareerComponent },
  { path: 'galary', component: GalaryComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'cleaning', component: CleaningComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
    ContactUsComponent,
    CareerComponent,
    GalaryComponent,
    ServiceComponent,
    CleaningComponent,
    BookingComponent,
    AdminComponent,
    DashboardComponent,
    DisplayBookingsComponent,
    MessagesComponent
  ],
  imports: [
    LightboxModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule, 
    AngularFireStorageModule, 
    AngularFireModule.initializeApp(environment.firebase),
    ModalGalleryModule.forRoot(),
    RouterModule.forRoot(
      appRoutes
    ),
  ],
  providers: [
    ContactService,
    BookingService,
    CareerService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
