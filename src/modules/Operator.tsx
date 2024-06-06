import React, { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';

const Operator = () => {
  const [peerId, setPeerId] = useState('');
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [incomingCall, setIncomingCall] = useState<Peer.MediaConnection | null>(null);
  const peer = useRef<Peer>(new Peer()).current;

  useEffect(() => {
    peer.on('open', (id) => {
      setPeerId(id);
    });

    peer.on('call', (call) => {
      setIncomingCall(call);
    });
  }, [peer]);

  const answerCall = () => {
    if (incomingCall) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((stream) => {
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
            }
            incomingCall.answer(stream);
            incomingCall.on('stream', (remoteStream) => {
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
              }
            });
          })
          .catch((error) => {
            console.error('Error accessing media devices.', error);
          });
      } else {
        console.error('getUserMedia is not supported in this browser.');
      }
    }
  };

  return (
    <div>
      <h1>Operator</h1>
      <p>Your ID: {peerId}</p>
      {incomingCall && (
        <div>
          <h2>Incoming Call</h2>
          <button onClick={answerCall}>Answer Call</button>
        </div>
      )}
      <video ref={localVideoRef} autoPlay muted></video>
      <video ref={remoteVideoRef} autoPlay></video>
    </div>
  );
};

export default Operator;
