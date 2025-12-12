
import { Routes, Route } from "react-router-dom";
import {VideoRoom} from './component/VideoRoom';
import Home from './component/Home';
import AgoraRTC, {
  AgoraRTCProvider, useRTCClient,
} from "agora-rtc-react";



function App() {
 const agoraClient = useRTCClient( AgoraRTC.createClient({ codec: "vp8", mode: "rtc" }));

  return (
    <>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/:roomID" element={<AgoraRTCProvider client={agoraClient}>
          <VideoRoom />
        </AgoraRTCProvider>} />
    </Routes>
    </>
  )
}

export default App
