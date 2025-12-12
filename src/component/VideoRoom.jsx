import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    LocalUser,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteAudioTracks,
    useRemoteUsers,
  } from "agora-rtc-react";


export const VideoRoom = () => {

  const appId = '32e49e7bd4c74f62b3642586e1e9a83c'
  // const agoraEngine = useRTCClient( AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })); // Initialize Agora Client
  const { roomID } = useParams() //pull the channel name from the param

  // set the connection state
  const [activeConnection, setActiveConnection] = useState(true);

  // track the mic/video state - Turn on Mic and Camera On
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);

  // get local video and mic tracks
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  // to leave the call
  const navigate = useNavigate()

  // Join the channel
  useJoin(
    {
      appid: appId,
      channel: roomID,
      token: null,
    },
    activeConnection,
  );

  usePublish([localMicrophoneTrack, localCameraTrack]);

  //remote users
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  // play the remote user audio tracks
  audioTracks.forEach((track) => track.play());


  return (
   <div className="min-h-screen bg-gray-900 p-4">
      {/* Main video grid container */}
      <div className="flex flex-wrap gap-4 justify-center items-center min-h-[calc(100vh-120px)]">
        { 
          // Initialize each remote stream using RemoteUser component
          remoteUsers.map((user) => (
            <div key={user.uid} className="relative w-full max-w-[720px] min-w-[360px] aspect-video rounded-lg overflow-hidden bg-gray-800 shadow-lg">
              <RemoteUser user={user} className="w-full h-full object-cover" /> 
            </div>
          ))
        }
        
        {/* Local video - shown alongside or as overlay */}
        <div className="relative w-full max-w-[480px] min-w-[360px] aspect-video rounded-lg overflow-hidden bg-gray-800 shadow-lg border-2 border-blue-500">
          <LocalUser
            audioTrack={localMicrophoneTrack}
            videoTrack={localCameraTrack}
            cameraOn={cameraOn}
            micOn={micOn}
            playAudio={micOn}
            playVideo={cameraOn}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Controls toolbar - fixed at bottom */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
        <div className="flex gap-2">
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              micOn 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
            onClick={() => setMic(a => !a)}
          >
            {micOn ? '🔊 Mic On' : '🔇 Mic Off'}
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              cameraOn 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
            onClick={() => setCamera(a => !a)}
          >
            {cameraOn ? '📹 Camera On' : '📷 Camera Off'}
          </button>
        </div>
        <button 
          className="px-4 py-2 rounded-lg font-medium bg-red-600 hover:bg-red-700 text-white transition-all opacity-90 hover:opacity-100"
          onClick={() => {
            setActiveConnection(false)
            navigate('/')
          }}
        >
          Disconnect
        </button>
      </div>
    </div>
  )
}