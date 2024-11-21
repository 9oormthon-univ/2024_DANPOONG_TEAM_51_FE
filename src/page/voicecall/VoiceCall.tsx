import styled from "styled-components";
import Button from "../component/button/Button";
import { useState } from "react";
import { VoiceCallStyle } from "../../common/style/voicecall/VoiceCallStyle";
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

  return (
    <St.Wrapper>
      {callState==="before" && <>
        <St.InfoWrapper>
          
          <St.Heading>김구름</St.Heading>
          <St.Heading>📞</St.Heading>
          <St.Heading>약속된 멘토링 시간이에요<br/>전화를 연결할까요?</St.Heading>
        </St.InfoWrapper>
        <BtnGroupVoiceCall 
          isSpeakerphoneOn={isSpeakerphoneOn} 
          onSpeakerphoneToggle={handleSpeakerphoneToggle}
          isMicOn={isMicOn} 
          onMicToggle={handleMicToggle}
        />
        <Button onClick={()=>{setCallState("going")}}>전화 연결하기</Button>
      </>}
      {callState==="going" && <>
      </>}
      {callState==="after" && <>
        
      </>}
    </St.Wrapper>
  );

};

export default VoiceCall;

const St = {
  ...VoiceCallStyle,
  InfoWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
  `,
}