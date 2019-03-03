//built in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//thirdparty


//proprietary
//import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    //AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
