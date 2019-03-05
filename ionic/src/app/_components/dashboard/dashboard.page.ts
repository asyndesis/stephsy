import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
    ) { }
  returnUrl: string;
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  logout(){
    this.authenticationService.logout();
    return this.router.navigate([this.returnUrl]);
  }
}
