import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  returnUrl = '';
  currentUser: User;
  
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    console.log(this.route);
  }
  logout(){
    this.authenticationService.logout();
    return this.router.navigate([this.returnUrl]);
  }
  back(){
    return this.router.navigate([this.returnUrl]);
  }
}
