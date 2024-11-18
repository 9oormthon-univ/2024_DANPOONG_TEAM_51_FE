import styled from 'styled-components';

const Chat = () => {
  return (
    <>
      <St.HomeWrapper>
        <div>Chat</div>
      </St.HomeWrapper>
    </>
  );
};

const St = {
  HomeWrapper: styled.div`
    display: flex;
    max-width: 100%;

    width: 100%;
    height: 1000rem;
    background-color: #444444;
  `,
}

export default Chat;