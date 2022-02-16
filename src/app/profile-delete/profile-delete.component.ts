import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-delete',
  templateUrl: './profile-delete.component.html',
  styleUrls: ['./profile-delete.component.scss']
})
export class ProfileDeleteComponent implements OnInit {

  user: any = JSON.parse(localStorage.getItem('user') || '');
  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  deregisterUser(): void {
    this.fetchApiData.deleteUser().subscribe(
      () => {
        this.snackBar.open(
          `The user ${this.user.Username} has been deregistered`,
          'Great',
          {
            duration: 2000,
          }
        );
        localStorage.clear();
      },
      (_result) => {
        this.snackBar.open('Something went wrong, please try later.', 'Ok', {
          duration: 2000,
        });
        this.router.navigate(['/welcome']).then(() => {
          window.location.reload();
        });
      }
    );
  }

}
