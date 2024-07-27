import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../Store/slice";

const useWebRTC = () => {
  const [peer, setPeer] = useState(null);
  const dispatch = useDispatch();
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
          socket.emit("ice_Candidate", event.candidate);
        }
      };

      return newPeer;
    };

    if (!peer) {
      setPeer(createPeer());
    } else if (peer.signalingState === "closed") {
      // Recreate peer connection if it's closed
      setPeer(createPeer());
    }

    // Cleanup function to stop the peer connection
    return () => {
      if (peer) {
        peer.close();
      }
    };
  }, [peer, dispatch]);

  const createOffer = async () => {
    try {
      if (peer && peer.signalingState !== "closed") {
        const offer = await peer.createOffer();
        console.log(offer);
        await peer.setLocalDescription(new RTCSessionDescription(offer));
        socket.emit("offer_call", {
          from: senderId,
          to: receiverId,
          offer: offer,
        });
        return offer;
      } else {
        console.error("Peer connection is closed or not initialized");
      }
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  };

  const createAnswer = async (incomingOffer) => {
    console.log(incomingOffer,'in')
    try {
      if (peer && peer.signalingState !== "closed") {
        await peer.setRemoteDescription(
          new RTCSessionDescription(incomingOffer)
        );
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(new RTCSessionDescription(answer));
        socket.emit("answer_call", {
          from: senderId,
          to: receiverId,
          answer: answer,
        });
        return answer;
      } else {
        console.error("Peer connection is closed or not initialized");
      }
    } catch (error) {
      console.error("Error creating answer:", error);
    }
  };

  return { peer, createOffer, createAnswer };
};

export default useWebRTC;
