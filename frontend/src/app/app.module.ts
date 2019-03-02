//built in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//thirdparty


//proprietary
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { AddressComponent } from './address/address.component';
import { MatInputModule, MatButtonModule, MatSelectModule, MatRadioModule, MatCardModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    AddressComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
