import styled from "styled-components";
import defaultProfile from "../../common/asset/image/user-profile-default.svg"

interface ProfileProps {
  size?: "md" | "lg" | "xl" | "2xl";
  src?: string;
}

const Profile = ({
  size = "md",
  src = defaultProfile
}:ProfileProps) => {
  return (
    <St.ProfileImg $size={size} src={src}/>
  )
}

export default Profile;

const St = {
  ProfileImg: styled.img<{$size:ProfileProps["size"]}>`
    clip-path: circle();
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
}