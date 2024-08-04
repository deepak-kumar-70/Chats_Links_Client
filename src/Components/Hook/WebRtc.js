import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../Store/slice";

const useWebRTC = () => {
  const [peer, setPeer] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const senderId = useSelector((state) => state.senderId);
  const receiverId = useSelector((state) => state.receiverId);

  useEffect(() => {
    const createPeer = () => {
      const newPeer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      });

      newPeer.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            from: senderId,
            to: receiverId,
            candidate: event.candidate,
          });
        }
      };

      newPeer.ontrack = (event) => {
        const [stream] = event.streams;
        setRemoteStream(stream);
      };

      return newPeer;
    };

    const peerInstance = createPeer();
    setPeer(peerInstance);

    return () => {
      peerInstance.close();
      setPeer(null);
    };
  }, [senderId, receiverId]);

  const createOffer = async () => {
    if (!peer) return;

    try {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      socket.emit("offer_call", {
        from: senderId,
        to: receiverId,
        offer,
      });
      return offer;
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  };

  const createAnswer = async (incomingOffer) => {
    if (!peer) return;

    try {
      const remoteDescription = new RTCSessionDescription(incomingOffer);
      await peer.setRemoteDescription(remoteDescription);
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      socket.emit("answer_call", {
        from: senderId,
        to: receiverId,
        answer,
      });
      return answer;
    } catch (error) {
      console.error("Error creating answer:", error);
    }
  };

  const handleLocalStream = (stream) => {
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));
  };

  const handleICECandidate = (candidate) => {
    if (peer) {
      peer.addIceCandidate(new RTCIceCandidate(candidate));
    }
  };

  return { peer, createOffer, createAnswer, handleICECandidate, handleLocalStream, remoteStream };
};

export default useWebRTC;
