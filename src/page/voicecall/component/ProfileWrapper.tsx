import Badge from "@/page/component/Badge";
import Profile from "@/page/component/Profile";
import styled from "styled-components";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import profileCirclesAnimation from "@image/voicecall/profile-circles.lottie?url"

interface ProfileWrapperProps {
  name: string;
  role: "멘토" | "멘티";
  isConnected: boolean;
}

const ProfileWrapper = ({ name, role, isConnected }: ProfileWrapperProps) => {
  return (
    <St.ProfileWrapper>
      <St.NameWrapper>
        <St.Name>{name}</St.Name>
        <Badge variant={role === "멘토" ? "badge-orange" : "badge-pink"}>{role}</Badge>
      </St.NameWrapper>
      <Profile size="2xl" />
      { isConnected && <St.ProfileLottie 
        src={profileCirclesAnimation} autoplay loop 
        /> }
    </St.ProfileWrapper>
  );
}

export default ProfileWrapper;

const St = {
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
    ${({ theme }) => theme.fonts.title_large}
  `,

  ProfileLottie: styled(DotLottieReact)`
    position: absolute;
    z-index: -1;
    transform: translateY(calc(3.2rem + 32px));
    height: 160px;
  `
}