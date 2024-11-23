import ReceiveIcon from '@image/voicecall/phone-up-white.svg?react'
import RejectIcon from '@image/voicecall/phone-down-white.svg?react'
import styled from 'styled-components';

interface BtnGroupCalleeProps {
  onReject: () => void;
  onReceive: () => void;
}
const BtnGroupCallee = ({
  onReject,
  onReceive,
}: BtnGroupCalleeProps) => {
  return (
    <BtnGroup>
      <RejectIcon onClick={onReject}/>
      <ReceiveIcon onClick={onReceive}/>
    </BtnGroup>
  );
}

export default BtnGroupCallee;

const BtnGroup = styled.div`
  display: flex;
  width: 70vw;
  justify-content:space-between;
`