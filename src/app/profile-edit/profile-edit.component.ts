import { Component, OnInit, Inject, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  user: any = JSON.parse(localStorage.getItem('user') || '');

  @Input() userData = {
    Username: this.user.Username,
    Password: '',
    Email: this.user.Email,
    Birthday: this.user.Birthday,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { onSuccess: () => void },
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<ProfileEditComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }


  editUserNew(): void {
    this.fetchApiData
      .editUser(this.userData.Username, this.userData)
      .subscribe((res) => {
        this.dialogRef.close();
        //updating the localstorage with the updated user
        localStorage.setItem('user', JSON.stringify(res));
        this.snackBar.open('The profile is successfully updated! ', 'Nice', {
          duration: 2000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
  }

}
