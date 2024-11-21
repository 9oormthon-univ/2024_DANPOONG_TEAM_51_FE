import styled from "styled-components";
import Button from "../component/button/Button";
import { useState } from "react";
import { VoiceCallStyle } from "../../common/style/voicecall/VoiceCallStyle";

const VoiceCall = () => {
  const [callState, setCallState] = useState<"before"|"calling"|"after">("before");

  return (
    <St.Wrapper>
      {callState==="before" && <>
        <St.InfoWrapper>
          
          <St.Heading>김구름</St.Heading>
          <St.Heading>📞</St.Heading>
          <St.Heading>약속된 멘토링 시간이에요<br/>전화를 연결할까요?</St.Heading>
        </St.InfoWrapper>
        <Button>전화 연결하기</Button>
      </>}
      {callState==="calling" && <>
        
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