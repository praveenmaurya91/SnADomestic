import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CareerService } from '../services/career.service';
import { Career } from '../models/Career';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  /**sidenav start */
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  /**sidenav end */

  careers: Career[];
  careerEditState: boolean = false;
  careerToEdit: Career;

  constructor(private careerService: CareerService,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    private authService: AuthService,
    private router: Router) { 

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.careerService.getItems().subscribe(items => {
      this.careers = items;
      console.log('run', this.careers)
    });

  }
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  /********* Career *************/
  deleteCareer(event, career: Career) {
    this.clearCareerState();
    this.careerService.deleteItem(career);
  }

  editCareer(event, career: Career) {
    this.careerEditState = true;
    this.careerToEdit = career;
  }

  updateCareer(career: Career) {
    this.careerService.updateItem(career);
    this.clearCareerState();
  }

  clearCareerState() {
    this.careerEditState = false;
    this.careerToEdit = null;
  }

}
