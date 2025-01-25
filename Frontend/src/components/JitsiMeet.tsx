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
  userName: string;
}

const JitsiMeet = ({ roomName, userName }: JitsiMeetProps) => {
  useEffect(() => {
    const domain = 'meet.jit.si';
    const options = {
      roomName,
      width: '100%',
      height: 700,
      parentNode: document.querySelector('#jitsi-container'),
      userInfo: {
        displayName: userName
      }
    };
    const api = new window.JitsiMeetExternalAPI(domain, options);

    return () => {
      if (api) {
        api.dispose();
      }
    };
  }, [roomName, userName]);

  return <div id="jitsi-container" style={{ width: '100%', height: '700px' }} />;
};

export default JitsiMeet;
