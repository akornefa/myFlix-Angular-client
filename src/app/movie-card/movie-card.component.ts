import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { DescriptionComponent } from '../description/description.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  user: any = {};
  currentUser: any = null;
  currentFaves: any = null;
  isInFaves: boolean = false;

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUserInfo();
    this.getCurrentUser();
  }

  getUserInfo(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '');
    console.log(this.user.Username);
  }

  getCurrentUser(): void {
    this.currentUser = this.user.Username;
    this.currentFaves = this.user.FavoriteMovies;
    return (this.currentUser, this.currentFaves);

  }


  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  /**
   * This function will open a genre model and accept a name and description of genre.
   * 
   * @param name 
   * @param description 
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: { name: name, description: description },
      width: '300px'
    });
  }
  /**
   * This function opens a director model and accepts a name, bio and birthdate.
   * 
   * @param name 
   * @param bio 
   * @param birth 
   */
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

  addToFaves(movieId: any): void {
    if (this.currentFaves.filter(function (e: any) { return e._id === movieId; }).length > 0) {
      this.snackBar.open('Already in your faves', 'OK', { duration: 2000 });
      return
    } else {
      this.fetchApiData.addFavoriteMovies(this.user.Username, movieId).subscribe((res: any) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.getCurrentUser();
        this.ngOnInit();
        this.snackBar.open('Added to faves', 'OK', { duration: 2000 });

      });
    }

  }

  removeFromFaves(movieId: any): void {
    this.fetchApiData.deleteMovie(this.user.Username, movieId).subscribe((res: any) => {
      localStorage.setItem('user', JSON.stringify(res));
      this.snackBar.open('Removed from faves', 'OK', { duration: 2000 });
      this.getCurrentUser();
      this.ngOnInit();
      2000
    });
  }

  /**
   * Add to faves if the title is not in faves,
   * removes from faves, if the title is in faves
   * (called by clicking the heart icon)
   * @param movieId
   * @returns isInFavs
   */

  toggleFaves(movieId: string): void {
    if (this.faveCheck(movieId)) {
      this.removeFromFaves(movieId);
      this.isInFaves = false;
    } else {
      this.addToFaves(movieId)
      this.isInFaves = true;
    }
  }

  faveCheck(movieId: string): any {
    return this.currentFaves.includes(movieId);
  }
}


