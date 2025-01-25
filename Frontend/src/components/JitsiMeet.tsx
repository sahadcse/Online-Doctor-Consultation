'use client'
import React, { useEffect } from 'react';

// Declare the JitsiMeetExternalAPI on the window object
declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

interface JitsiMeetProps {
  roomName: string;
  displayName: string;
}

const JitsiMeet = ({ roomName, displayName }: JitsiMeetProps) => {
  useEffect(() => {
    const domain = 'meet.jit.si';
    const options = {
      roomName: roomName,
      width: '100%',
      height: 700,
      parentNode: document.querySelector('#jitsi-container'),
      userInfo: {
        displayName: displayName
      }
    };
    const api = new window.JitsiMeetExternalAPI(domain, options);

    return () => {
      if (api) {
        api.dispose();
      }
    };
  }, [roomName, displayName]);

  return <div id="jitsi-container" style={{ width: '100%', height: '700px' }} />;
};

export default JitsiMeet;
