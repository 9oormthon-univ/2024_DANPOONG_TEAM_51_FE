import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import loaderAnimation from "@image/voicecall/loader.lottie?url"
import styled from "styled-components";

const Loader = () => {
  return <Lottie src={loaderAnimation} autoplay loop />;
}

export default Loader;

const Lottie = styled(DotLottieReact)`
    height: 1.2rem;
`