import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
//import AgoraRTC from "agora-rtc-sdk-ng"
import { AngularAgoraRtcModule, AgoraConfig } from 'angular-agora-rtc';
const agoraConfig: AgoraConfig = {
  AppID: '628aee40afb34b789f77cdf9c8e88127',
};
@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AngularAgoraRtcModule.forRoot(agoraConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
