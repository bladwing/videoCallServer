import React, { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';

const Client = () => {
  const [peerId, setPeerId] = useState('');
  const [operatorId, setOperatorId] = useState('');
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peer = useRef<Peer>(new Peer()).current;

  useEffect(() => {
    peer.on('open', (id) => {
      setPeerId(id);
    });

    peer.on('call', (call) => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((stream) => {
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
            }
            call.answer(stream);
            call.on('stream', (remoteStream) => {
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
    });
  }, [peer]);

  const startCall = () => {
    if (operatorId) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((stream) => {
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
            }
            const call = peer.call(operatorId, stream);
            call.on('stream', (remoteStream) => {
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
    } else {
      alert('Please enter the operator ID');
    }
  };

  return (
    <div>
      <h1>Client</h1>
      <input
        type="text"
        placeholder="Enter operator ID"
        value={operatorId}
        onChange={(e) => setOperatorId(e.target.value)}
      />
      <button onClick={startCall}>Call Operator</button>
      <video ref={localVideoRef} autoPlay muted></video>
      <video ref={remoteVideoRef} autoPlay></video>
    </div>
  );
};

export default Client;
