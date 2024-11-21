import styled from "styled-components";
import { useState } from "react";
import { VoiceCallStyle } from "@style/voicecall/VoiceCallStyle";
import CalenderIcon from "@image/voicecall/calendar.svg?react"
import Button from "@component/button/Button";
import Profile from "@component/Profile";
import BtnGroupVoiceCall from "./component/BtnGroupVoiceCall";
import Loader from "./component/Loader";
import ProfileWrapper from "./component/ProfileWrapper";

const VoiceCall = () => {
  const [callState, setCallState] = useState<"before"|"going"|"after">("before");
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeakerphoneOn, setIsSpeakerphoneOn] = useState(false)
  const [isMicOn, setIsMicOn] = useState(true)

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
    setCallState("after");
    setIsConnected(false);
  }

  return (<>
    <St.Wrapper $dark={callState !== "before"}>
      {callState !== "before" && <Background/>}

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
        {callState==="after" && <></>}
      </St.InfoWrapper>

      {/* 하단 버튼부 */}
      {callState==="before" && <Button 
          onClick={()=>{
            setCallState("going");
            setTimeout(() => {
              setIsConnected(true);
            }, 3000);
            }}>
            전화 연결하기
        </Button>}
      {callState==="going" && <BtnGroupVoiceCall
          isConnected={isConnected}
          isSpeakerphoneOn={isSpeakerphoneOn} 
          onSpeakerphoneToggle={handleSpeakerphoneToggle}
          isMicOn={isMicOn} 
          onMicToggle={handleMicToggle}
          onEndCallClick={handleEndCallClick}
        />}
      {callState==="after" && <Button
          style={{isolation:"isolate",}}
          onClick={()=>{setCallState("before")}}>
            홈으로 가기
        </Button>}
    </St.Wrapper>
  </>
  );

};

export default VoiceCall;

const BeforeCall = () => {
  return (<>
    <St.ScheduleBox><CalenderIcon/>00월 00일(일) 오후 00:00</St.ScheduleBox>
    <St.Heading>
      약속된 멘토링 시간이에요<br/>전화를 연결할까요?
    </St.Heading>
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
  ScheduleBox: styled.div`
    display: flex;
    gap: 4px;
    border-radius: 2.4rem;
    background-color: #663A0033;
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
  `
}