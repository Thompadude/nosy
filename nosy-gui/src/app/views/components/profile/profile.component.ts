import { Component, OnInit } from '@angular/core';
import {ProfileHttpService} from './profile-http.service';
import {Profile} from './profile';
import {GlobalService} from '../../../auth/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  constructor(private profileService: ProfileHttpService, private globalService: GlobalService) { }

  ngOnInit() {
    this.profileService.getProfileInfo().subscribe((data: Profile) => {
      this.profile = data;


    });

  }
  deleteProfile() {
    this.profileService.deleteProfile(this.profile.email).subscribe();

    this.globalService.cleanCookies();
  }

}
