import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit {

  @ViewChild('selectElem') el: ElementRef;

  ngAfterViewInit() {
    $(document).ready(function () {
      $(".menu h4").click(function () {
        $("nav ul").toggleClass("active")
      });
    });
  }

  isLoggedIn: boolean;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;

      } else {
        this.isLoggedIn = false;
      }
    });
  }
}