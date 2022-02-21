import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { DescriptionComponent } from '../description/description.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  user: any = {};
  favMovies: any = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getFavMovies();
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: { name: name, description: description },
      width: '300px'
    });
  }

  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorComponent, {
      data: { name: name, bio: bio, birth: birth },
      width: '300px'
    });
  }

  openDescriptionDialog(title: string, description: string): void {
    this.dialog.open(DescriptionComponent, {
      data: { title: title, description: description },
      width: '300px'
    });
  }

  getUserInfo(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '');
    return
  }

  getFavMovies(): void {
    let movies: any[] = [];
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      movies = res;
      movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies.includes(movie._id)) {
          this.favMovies.push(movie);
        }
      });
    });
    return this.favMovies;
  }

}

