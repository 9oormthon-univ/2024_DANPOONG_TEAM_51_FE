import styled from "styled-components";
import SpeakerphoneIcon from "@image/voicecall/speaker-wave.svg?react"
import MicIcon from '@image/voicecall/mic.svg?react'
import MicMutedIcon from '@image/voicecall/mic-muted.svg?react'
import PhoneDownIcon from '@image/voicecall/phone-down.svg?react'

interface BtnGroupProps {
  isConnected: boolean;
  onSpeakerphoneToggle: ()=> void;
  isSpeakerphoneOn?: boolean;
  onMicToggle: ()=> void;
  isMicOn?: boolean;
  onEndCallClick: ()=> void;
}

const BtnGroupVoiceCall = ({
  isConnected,
  onSpeakerphoneToggle,
  isSpeakerphoneOn = false,
  onMicToggle,
  isMicOn = true,
  onEndCallClick,
}: BtnGroupProps) => {
  return (
    <BtnGroup>
      {isConnected && <BtnToggleMic $isOn={isMicOn} onClick={onMicToggle}>
        {isMicOn? <MicIcon/>:<MicMutedIcon/>}
      </BtnToggleMic>}
      <CircleBtn onClick={onEndCallClick}>
        <PhoneDownIcon/>
      </CircleBtn>
      {isConnected && <BtnToggleSpeakerphone 
        $isOn={isSpeakerphoneOn} 
        onClick={onSpeakerphoneToggle}
      >
        <SpeakerphoneIcon/>
      </BtnToggleSpeakerphone>}
    </BtnGroup>
  );
}

export default BtnGroupVoiceCall

const BtnGroup = styled.div`
  display: flex;
  gap: 4rem;
  isolation: isolate;
`

const CircleBtn = styled.button`
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BtnToggleSpeakerphone = styled(CircleBtn)<{$isOn: boolean;}>`
  ${({theme, $isOn}) => {
    return $isOn ? `
      background-color: #ffffffcc;
      path {fill: ${theme.colors.gray600}}
      `:`
      background-color: #ffffff33;
      path {fill: white}
    `
  }}
`
const BtnToggleMic = styled(CircleBtn)<{$isOn: boolean;}>`
  ${({$isOn}) => {
    return $isOn ? `
      background-color: #ffffff33;
      `:`
      background-color: #ffffffcc;
    `
  }}
`