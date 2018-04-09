

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
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  // styleUrls: ['./editprofile.component.css']
})
export class EditProfileComponent implements OnInit {

  // event: any;
  user: User;
  profile: any;
  // profile: Profile;
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
  
 updateProfileForm: FormGroup;
  fname = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    // Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  lname = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    // Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  dateofbirth = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    // Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  placeofbirth = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    // Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  timeofbirth = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    // Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  raasi = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    // Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  nakshatram = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    // Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  houseno = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    // Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  street = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    // Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  city = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    // Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  pin = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    // Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  state = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    // Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  phoneno = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    // Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
   
ngOnInit() {

  this.getProfileDetails();
  const userid = localStorage.getItem('userid');
  this.updateProfileForm = this.formBuilder.group({
    fname: this.fname,
    lname: this.lname,
    phoneno: this.phoneno,
    dateofbirth : this.dateofbirth,
    placeofbirth : this.placeofbirth,
    timeofbirth : this.timeofbirth,
    raasi : this.raasi,
    nakshatram : this.nakshatram,
    houseno : this.houseno,
    street : this.street,
    city : this.city,
    pin : this.pin,
    state : this.state,
    userid,
  });
 
}

setClassFName() {
  return { 'has-danger': !this.fname.pristine && !this.fname.valid };
}

setClassLName() {
  return { 'has-danger': !this.lname.pristine && !this.lname.valid };
}

setClassDateOfBirth() {
  return { 'has-danger': !this.dateofbirth.pristine && !this.dateofbirth.valid };
}

setClassTimeOfBirth() {
  return { 'has-danger': !this.timeofbirth.pristine && !this.timeofbirth.valid };
}

setClassPlaceOfBirth() {
  return { 'has-danger': !this.placeofbirth.pristine && !this.placeofbirth.valid };
}

setClassRaasi() {
  return { 'has-danger': !this.raasi.pristine && !this.raasi.valid };
}

setClassNakshatram() {
  return { 'has-danger': !this.nakshatram.pristine && !this.nakshatram.valid };
}

setClassHouseNo() {
  return { 'has-danger': !this.raasi.pristine && !this.raasi.valid };
}

setClassStreet() {
  return { 'has-danger': !this.raasi.pristine && !this.raasi.valid };
}

setClassCity() {
  return { 'has-danger': !this.raasi.pristine && !this.raasi.valid };
}

setClassPin() {
  return { 'has-danger': !this.raasi.pristine && !this.raasi.valid };
}

setClassState() {
  return { 'has-danger': !this.raasi.pristine && !this.raasi.valid };
}

setClassPhoneno() {
  return { 'has-danger': !this.raasi.pristine && !this.raasi.valid };
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




  editProfile() {

    const userid = localStorage.getItem('userid');
    const id =  this.profile._id;

      this.profileService.updateProfile(this.updateProfileForm.value).subscribe(
      data => {
        // this.isEditing = false;
        this.profile = data;
        console.log(data);
        this.toast.setMessage('item edited successfully.', 'success');
        this.router.navigate(['./update-profile']);
      },
      error => console.log(error)
    );
  }

  // editProfile(profile: Profile) {

  //   const userid = localStorage.getItem('userid');
  //   const id =  this.profile.userid;

  //     this.profileService.updateProfile(profile).subscribe(
  //     () => {
  //       // this.isEditing = false;
  //       this.profile = profile;
  //       console.log(profile);
  //       this.toast.setMessage('item edited successfully.', 'success');
  //       this.router.navigate(['./update-profile']);
  //     },
  //     error => console.log(error)
  //   );
  // }

}
