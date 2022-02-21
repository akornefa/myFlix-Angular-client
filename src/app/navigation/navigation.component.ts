import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatMenuModule } from '@angular/material/menu';
import { FavoritesComponent } from '../favorites/favorites.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public menu: MatMenuModule,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  movies(): void {
    this.router.navigate(['movies']);
  }

  goToProfile(): void {
    this.dialog.open(UserProfileComponent, {
      width: '500px'
    });
  }

  goToFavorites(): void {
    this.dialog.open(FavoritesComponent, {
      width: '100%'
    });
  }

  userLogout(): void {
    localStorage.clear();
    this.snackBar.open('You have successfully logged out!', 'OK', {
      duration: 2000,
    });
    this.router.navigate(['welcome']).then(() => {
      window.location.reload();
    });
  }

}
