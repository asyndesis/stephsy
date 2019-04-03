import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './_services';
import { Router, ActivatedRoute, ActivationEnd} from '@angular/router';
import { User } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  currentUser: User;
  page;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router,
    public route: ActivatedRoute
  ) {
    this.page = {title:'',level:0}; //set the title and level to 0
    router.events.subscribe((val) => {
      if (val instanceof ActivationEnd){
        //the child event comes first so i had to build in a way to only update the title based on data defined levels
        if (this.page.level <= val.snapshot.data.level){
          this.page = val.snapshot.data;
        }
      }
    });
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    });

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  
}
