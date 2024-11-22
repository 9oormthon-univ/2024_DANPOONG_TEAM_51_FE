import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { VoiceCallStyle } from "@style/voicecall/VoiceCallStyle";
import CalenderIcon from "@image/voicecall/calendar.svg?react"
import Button from "@component/button/Button";
import Profile from "@component/Profile";
import BtnGroupVoiceCall from "./component/BtnGroupVoiceCall";
import BtnGroupCallee from "./component/BtnGroupCallee";
import Loader from "./component/Loader";
import ProfileWrapper from "./component/ProfileWrapper";
import { useLocation, useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import RecordRTC from "recordrtc";

interface SignalData {
  sdp: RTCSessionDescription;
  candidate: RTCIceCandidate;
}

interface LocationStateData {
  data: SignalData;
}

const signalUri = import.meta.env.VITE_SOCKET_BASE_URL;
const serverUri = import.meta.env.VITE_APP_BASE_URL;

const VoiceCall = () => {
  const socketRef = useRef<Socket>(); // socket 연결
  const pcRef = useRef<RTCPeerConnection>(); // webRTC 연결
  const audioRef = useRef<HTMLAudioElement | null>(null); // 내 오디오
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null); // 상대 오디오
  const recorderRef = useRef<RecordRTC>(); // 통화녹음기
  
  const navigate = useNavigate();
  const locationState = useLocation().state as LocationStateData;
  const [callState, setCallState] = useState<"before"|"going"|"after"|"failure">("going");
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeakerphoneOn, setIsSpeakerphoneOn] = useState(false)
  const [isMicOn, setIsMicOn] = useState(true)


  useEffect(() => {
    // WebSocket 연결
    const socket = io(signalUri, {
      query: {roomId: 1 },
      withCredentials: true,
    })

    console.log(socketRef.current);
    socketRef.current = socket;

    // ICE 설정
    const iceConfig = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
        { urls: "stun:stun3.l.google.com:19302" },
      ],
    };

    const pc = new RTCPeerConnection(iceConfig);
    pcRef.current = pc;
    
    console.log("socket: ", socketRef.current);
    console.log("peerConnection: ", pcRef.current);

    // 소켓 리스너

    if (locationState) {
      setCallState("before");
      // "offer" 받음
      console.log("locationState: ", locationState);
      pc.setRemoteDescription(locationState.data.sdp);
    } else {
      // '전화걸기'를 눌러 들어온 Caller는 바로 전화 발신
      Call();
    }

    // answer 받음
    socket.on("answer", (data: SignalData) => {
      console.log("Caller: received Answer from Callee.");
      if (!pc) {
        return;
      }
      pc.setRemoteDescription(data.sdp);
      setIsConnected(true);
      recorderRef.current?.startRecording();
      console.log("Caller: record Started");
    });

    // candidate 받음
    socket.on("candidate", async (data: SignalData) => {
      console.log("received candidate from Opposite.");
      if (!pc) {
        return;
      }
      await pc.addIceCandidate(data.candidate);
      console.log("register candidate");
    });

    // peerconnection 리스너
    // ICE로부터 candidate 받음
    pc.onicecandidate = (event) => {
      console.log("received candidate from ICE.");
      if (!event.candidate) {
        return;
      }
      socket.emit("candidate", {
        candidate: event.candidate,
      });
      console.log("emit candidate");
    };

    // 상대방이 addTrack시 음성 데이터 수신
    pc.ontrack = (event) => {
      console.log("the Opposite registered the Track.");
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = event.streams[0];
      }
    };

    // 시그널링 상태 변화
    pc.onsignalingstatechange = () => {
      console.log("Signaling State Changed to : ", pc.signalingState);
    };
  
    // 사용자 오디오입력 데이터
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        // setStream(stream);
        const audioTracks = stream.getAudioTracks();
        console.log("Got stream with audio device: " + audioTracks[0].label);
        if (audioRef.current) {
          // 오디오 스트림 등록
          audioRef.current.srcObject = stream;
        }
        // peerconnection에 스트림 등록
        audioTracks.forEach((track) => pcRef.current?.addTrack(track, stream));

        // 각자 자신의 로컬스트림을 녹음
        recorderRef.current = new RecordRTC(stream, {type: "audio"});
      })
      .catch(handleGUMError);

    return () => {
      pc.close();
    }
  }, [])

  // 오디오입력장치가 없거나 권한 획득에 실패
  const handleGUMError = (error: DOMException) => {
    const errorMessage =
      "navigator.MediaDevices.getUserMedia error: " +
      error.message +
      " " +
      error.name;
    console.error(errorMessage);
    if(error.name === "NotAllowedError"){
      alert("멘토링 진행을 위해 마이크 사용 권한을 허용해주세요.")
    } else {
      alert("마이크 장치를 불러오지 못했습니다.")
    }
  }

  // offer 송신
  const Call = async () => {
    console.log("Caller: create offer");
    if (!(pcRef.current && socketRef.current)) return;
    setCallState("going");
    try {
      const sdp = await pcRef.current.createOffer();
      pcRef.current.setLocalDescription(sdp);
      socketRef.current.emit("offer", { sdp });
    } catch (e) {
      console.error(e);
    }
  }

  // answer 송신
  const Recieve = async () => {
    console.log("Callee: create answer");
    if (!(pcRef.current && socketRef.current)) {
      setCallState("failure");
      return;
    }
    try {
      const sdp = await pcRef.current.createAnswer();
      pcRef.current.setLocalDescription(sdp);
      socketRef.current.emit("answer", { sdp });
      setIsConnected(true);
      recorderRef.current?.startRecording();
      console.log("Callee: record Started");
    } catch (e) {
      console.error(e);
      setCallState("failure");
    }
  }

  const CancelCall = () => {
    setCallState("failure");
  }

  const EndCall = () => {
    setCallState("after");
    if (!pcRef.current) return;
    pcRef.current.close();
    setIsConnected(false);
    if(!recorderRef.current) return;
    console.log("download record...");
    recorderRef.current.stopRecording(() => {
      const blob = recorderRef.current!.getBlob();
      uploadRecord(blob);
    });
  }

  /* BtnGroup 핸들러 */
  const handleSpeakerphoneToggle = () => {
    console.log("toggle speakerphone"); 
    setIsSpeakerphoneOn(!isSpeakerphoneOn);
  }
  const handleMicToggle = () => {
    console.log("toggle Mic"); 
    setIsMicOn(!isMicOn);
  }
  const handleEndCallClick = () => {
    console.log("End Call Clicekd");
    if (!isConnected) {
      CancelCall();
      return;
    }
    EndCall();
  }

  return (<>
    <St.Wrapper>
      <audio ref={audioRef} muted>{/* 내 오디오 */}</audio>
      <audio ref={remoteAudioRef} autoPlay>{/* 상대방 오디오 */}</audio>
      <Background/>

      <St.InfoWrapper>
        <ProfileWrapper
          name="김구름"
          role="멘토"
          isConnected={isConnected}
        />
        {callState==="before" && <BeforeCall/>}
        {callState==="going" && <St.Info>
            { isConnected ? 
              <TimeCounter secondsPassed={222} /> : "연결중"
            }
          { !isConnected && <Loader/> }
        </St.Info>}
        {callState==="after" && <>
          <St.Heading>멘토링이 종료되었어요</St.Heading>
          <St.Info><TimeCounter secondsPassed={601}/></St.Info>
          </>}
        {callState==="failure" && <St.Heading>
          전화 연결에 실패하였어요
          </St.Heading>}
      </St.InfoWrapper>

      <St.ButtonWrapper>
      {/* 하단 버튼부 */}
        {callState==="before" && <BtnGroupCallee 
            onReceive={Recieve}
            onReject={CancelCall}
            />}
        {callState==="going" && <BtnGroupVoiceCall
            isConnected={isConnected}
            isSpeakerphoneOn={isSpeakerphoneOn} 
            onSpeakerphoneToggle={handleSpeakerphoneToggle}
            isMicOn={isMicOn} 
            onMicToggle={handleMicToggle}
            onEndCallClick={handleEndCallClick}
          />}
        { (callState==="after" || callState==="failure") && <Button
            onClick={()=>{navigate("/home")}}>
              홈으로 가기
          </Button>}
      </St.ButtonWrapper>
    </St.Wrapper>
  </>
  );

};

export default VoiceCall;

const BeforeCall = () => {
  return (<>
    <St.BeforeCall>
      <St.ScheduleBox>
        <CalenderIcon/>00월 00일(일) 오후 00:00
      </St.ScheduleBox>
        상대가 전화를 걸었어요<br/>정시에 맞춰 전화를 받아도 돼요
    </St.BeforeCall>
  </>);
}

const Background = () => {
  return (<>
    <St.BackgroundProfile><Profile/></St.BackgroundProfile>
    <St.BackgroundBlur/>
  </>);
}

const TimeCounter = ({secondsPassed}:{secondsPassed:number}) => {
  const min = String(Math.floor(secondsPassed / 60)).padStart(2,'0');
  const sec = String(secondsPassed % 60).padStart(2,'0');
  return (
    `${min}:${sec}`
  );
}

const St = {
  ...VoiceCallStyle,
  InfoWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
    isolation: isolate;
    align-items: center;
  `,
  BeforeCall: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 24px;
    
    ${({theme}) => theme.fonts.title_medium}
  `,
  ScheduleBox: styled.div`
    display: flex;
    gap: 4px;
    border-radius: 2.4rem;
    background-color: #ffffff66;
    padding: 2.4rem;
    margin: 0 auto 0.4rem auto;

    ${({theme}) => theme.fonts.title_medium}
    svg {height: 2.4rem;}
  `,
  BackgroundProfile: styled.div`
    position: absolute;
    height: 80vh;
    top: 10vh;
    & > div {
      height: 100%;
      width: 100%
    }
  `,
  BackgroundBlur: styled.div`
    position:absolute;
    top: 0;
    height: 100vh;
    width: 100%;

    background: linear-gradient(#000000B3, #00000000) #663A0080;
    backdrop-filter: blur(10px);
  `,
  Info: styled.div`
    ${ ({theme}) => theme.fonts.title_medium }
    color: ${ ({theme}) => theme.colors.gray200 };
    display: flex;
    flex-direction:column;
    gap: 1.6rem;
  `,
  ButtonWrapper: styled.div`
    isolation: isolate;
  `
}

const uploadRecord = (blob: Blob) => {
  const filename = `record-${Date().replace(" ", "-")}.webm`;

  // TODO: DB 업로드 코드로 대체
  const a = document.createElement("a");
  a.href = webkitURL.createObjectURL(blob);
  a.download = filename;
  (document.body || document.documentElement).appendChild(a);
  if (typeof a.click === "function") {
    a.click();
  } else {
    a.target = "_blank";
    a.dispatchEvent(
      new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      })
    );
  }
  webkitURL.revokeObjectURL(a.href);
}