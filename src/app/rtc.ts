import AgoraRTC, { IAgoraRTCClient, ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng"

export class Rtc {
    localAudioTrack!: IMicrophoneAudioTrack;
    localVideoTrack!: ICameraVideoTrack;
    client!: IAgoraRTCClient;
  }