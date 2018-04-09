

import { Component, OnInit,  Directive, Input, ViewChild } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../services/auth.service';
import { LoginService } from '../../services/login.service';
import { Observable } from 'rxjs/Observable';
import { ProfileService } from '../../services/profile.service';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from "@angular/router";
import "rxjs/add/operator/switchMap";
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ToastComponent } from '../../shared/toast/toast.component';
import { Relation } from "../../shared/models/relation";
import { Profile } from "../../shared/models/profile.model";

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  // event: any;
  user: User;
  profile: any;
  profiles: Profile[] = [];
  // relation: Relation[] = [];
  // isLoading = true;
  isEditing = false;

  constructor(
    public auth: AuthService,
    public authService: LoginService,
    public profileService: ProfileService,
    public userService: UserService,
    private http: HttpClient,
    private router : Router,
    private route : ActivatedRoute,
    public toast: ToastComponent,
    private formBuilder: FormBuilder,
    private _route : ActivatedRoute
  ) { }
    // this.getUser();
    // this.getProfile();
  
  ngOnInit() {
    this.getProfileDetails();
  }


  getProfileDetails(){

    const userid = localStorage.getItem('userid');
    const id = this._route.snapshot.params.id;
    // const user_id = this._route.snapshot.params.userid;

    this.profileService.getProfileDetails(userid).subscribe(
      data => {
        this.profile = data;
      console.log(data);
      }
    );
  }

  enableEditing(profile: Profile) {
    // this.isEditing = true;
    // this.profile = Profile;
    this.router.navigate(['/edit-profile']);
  }

  // cancelEditing() {
  //   this.isEditing = false;
  //   this.profile = new Profile();
  //   this.toast.setMessage('item editing cancelled.', 'warning');
  //   // reload the cats to reset the editing
  //   this.getProfileDetails();
  // }

  // editProfile(profile: Profile) {
  //   this.profileService.updateProfile(profile).subscribe(
  //     () => {
  //       // this.isEditing = false;
  //       this.profile = profile;
  //       console.log(profile);
  //       this.toast.setMessage('item edited successfully.', 'success');
  //     },
  //     error => console.log(error)
  //   );
  // }

}
