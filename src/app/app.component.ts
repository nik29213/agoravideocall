import { Component, OnInit } from '@angular/core';
import { AngularAgoraRtcService, Stream, AgoraClient } from 'angular-agora-rtc';
import AgoraRTC from "agora-rtc-sdk-ng";
import { Rtc } from './rtc';
import { join } from 'path';

//https://docs.agora.io/en/Video/start_call_web_ng?platform=Web
//https://medium.com/swlh/angular-video-conferencing-with-agora-io-45905235eebb
//https://github.com/AgoraIO-Community/Angular-Agora-RTC
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  /*title = 'angular-video';
  localCallId = 'agora_local';
  remoteCalls: string[] = [];

  //client: AgoraClient;
  localStream!: Stream;
  uid!: number;
  
  constructor(private agoraService: AngularAgoraRtcService) {
    this.uid = Math.floor(Math.random() * 100);
    this.agoraService.createClient();
  }

  ngOnInit() {
    
    this.agoraService.client.join(null, '1000', null, (uid:any) => {
      this.localStream = this.agoraService.createStream(uid, true, null, null, true, false);  
    });
  }
*/
public rtc :Rtc;

public options = {
  // Pass your App ID here.
  appId: "628aee40afb34b789f77cdf9c8e88127",
  // Set the channel name.
  channel: "testchannel",
  // Pass your temp token here.
  token: "006628aee40afb34b789f77cdf9c8e88127IACFF7yLwFLx0p4kxHSQ5aviWKwtT601mlqgRftCfL9IQ+puE8wAAAAAEAATtvR98LEYYgEAAQDxsRhi",
  // Set the user ID.
  uid: 123456
};
constructor() {
  this.rtc = new Rtc();
}
async join() {
  await this.rtc.client.join(this.options.appId, this.options.channel, this.options.token, this.options.uid);
        // Create a local audio track from the audio sampled by a microphone.
        this.rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        // Create a local video track from the video captured by a camera.
        this.rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        // Publish the local audio and video tracks to the RTC channel.
        this.rtc.client.publish([this.rtc.localAudioTrack, this.rtc.localVideoTrack]);
        // Dynamically create a container in the form of a DIV element for playing the local video track.
        const localPlayerContainer = document.createElement("div");
        // Specify the ID of the DIV container. You can use the uid of the local user.
        localPlayerContainer.id = this.options.uid.toString();
        localPlayerContainer.textContent = "Local user " + this.options.uid;
        localPlayerContainer.style.width = "640px";
        localPlayerContainer.style.height = "480px";
        document.body.append(localPlayerContainer);

        // Play the local video track.
        // Pass the DIV container and the SDK dynamically creates a player in the container for playing the local video track.
        // Play the local video track.
        // Pass the DIV container and the SDK dynamically creates a player in the container for playing the local video track.
        this.rtc.localVideoTrack.play(localPlayerContainer);
        console.log("publish success!");

        //calling remoteusers to get remote users list andd display
        this.remoteusers();
}
async remoteusers() {
  // Listen for the "user-published" event, from which you can get an AgoraRTCRemoteUser object.
  this.rtc.client.on("user-published", async (user, mediaType) => {
    // Subscribe to the remote user when the SDK triggers the "user-published" event
    await this.rtc.client.subscribe(user, mediaType);
    console.log("subscribe success");

    // If the remote user publishes a video track.
    if (mediaType === "video") {
        // Get the RemoteVideoTrack object in the AgoraRTCRemoteUser object.
        const remoteVideoTrack = user.videoTrack;
        // Dynamically create a container in the form of a DIV element for playing the remote video track.
        const remotePlayerContainer = document.createElement("div");
        // Specify the ID of the DIV container. You can use the uid of the remote user.
        remotePlayerContainer.id = user.uid.toString();
        remotePlayerContainer.textContent = "Remote user " + user.uid.toString();
        remotePlayerContainer.style.width = "640px";
        remotePlayerContainer.style.height = "480px";
        document.body.append(remotePlayerContainer);

        // Play the remote video track.
        // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
        remoteVideoTrack.play(remotePlayerContainer);

        // Or just pass the ID of the DIV container.
        // remoteVideoTrack.play(playerContainer.id);
    }

    // If the remote user publishes an audio track.
    if (mediaType === "audio") {
        // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
        const remoteAudioTrack = user.audioTrack;
        // Play the remote audio track. No need to pass any DOM element.
        remoteAudioTrack.play();
    }

    // Listen for the "user-unpublished" event
    this.rtc.client.on("user-unpublished", user => {
        // Get the dynamically created DIV container.
        const remotePlayerContainer = document.getElementById(user.uid.toString());
        // Destroy the container.
        remotePlayerContainer.remove();
    });

  });

}
async leave() {
  this.rtc.localAudioTrack.close();
  this.rtc.localVideoTrack.close();

  // Traverse all remote users.
  this.rtc.client.remoteUsers.forEach((user:any) => {
    // Destroy the dynamically created DIV containers.
    const playerContainer = document.getElementById(user.uid.toString());
    playerContainer && playerContainer.remove();
  });

  // Leave the channel.
  await this.rtc.client.leave();
}

async startBasicCall() {
  // Create an AgoraRTCClient object.
  this.rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  
}

ngOnInit() {
    
  this.startBasicCall()

}
    
}
