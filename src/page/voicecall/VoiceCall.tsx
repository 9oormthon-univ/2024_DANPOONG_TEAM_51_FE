import styled from "styled-components";
import { useState } from "react";
import { VoiceCallStyle } from "@style/voicecall/VoiceCallStyle";
import CalenderIcon from "@image/voicecall/calendar.svg?react"
import Button from "@component/button/Button";
import Badge from "@component/Badge";
import Profile from "@component/Profile";
import BtnGroupVoiceCall from "./component/BtnGroupVoiceCall";

const VoiceCall = () => {
  const [callState, setCallState] = useState<"before"|"going"|"after">("before");
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
  }

  return (<>
    <St.Wrapper $dark={callState !== "before"}>
      {callState !== "before" && <Background/>}

      <St.InfoWrapper>
        <ProfileWrapper/>
        {callState==="before" && <BeforeCall/>}
        {callState==="going" && <>
          {/* loader, 통화시간 */}
        </>}
        {callState==="after" && <></>}
      </St.InfoWrapper>

      {/* 하단 버튼부 */}
      {callState==="before" && <Button 
          onClick={()=>{setCallState("going")}}>
            전화 연결하기
        </Button>}
      {callState==="going" && <BtnGroupVoiceCall 
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

const ProfileWrapper = () => {
  return (
    <St.ProfileWrapper>
      <St.NameWrapper>
        <St.Name>김구름</St.Name>
        <Badge variant="badge-orange">멘토</Badge>
      </St.NameWrapper>
      <Profile size="2xl"/>
    </St.ProfileWrapper>
  );
}

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

const St = {
  ...VoiceCallStyle,
  InfoWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
    isolation: isolate;
  `,
  ProfileWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 60px;
  `,
  NameWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  Name: styled.span`
    ${({theme}) => theme.fonts.title_large}
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
}