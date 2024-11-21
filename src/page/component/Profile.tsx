import styled from "styled-components";
import defaultProfile from "@image/user-profile-default.svg"

interface ProfileProps {
  size?: "md" | "lg" | "xl" | "2xl";
  src?: string;
}

const Profile = ({
  size = "md",
  src = defaultProfile
}:ProfileProps) => {
  return (
    <St.ProfileWrapper $size={size}>
      <St.ProfileImg src={src}/>
    </St.ProfileWrapper>
  )
}

export default Profile;

const St = {
  ProfileWrapper: styled.div<{$size:ProfileProps["size"]}>`
  border: 4px solid white;
  border-radius: 50%;
  background-color: white;
  box-sizing: content-box;
  ${(props) => {
    switch (props.$size) {
      case "md":
        return`
          width: 40px;
          height: 40px;
        `
      case "lg":
        return`
          width: 48px;
          height: 48px;
        `
      case "xl":
        return`
          width: 56px;
          height: 56px;
        `
      case "2xl":
        return`
          width: 96px;
          height: 96px;
        `
    }
  }}
`,
  ProfileImg: styled.img`
    clip-path: circle();
    height: 100%;
  `,
}