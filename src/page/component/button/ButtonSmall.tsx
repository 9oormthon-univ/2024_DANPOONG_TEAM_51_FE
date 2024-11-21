import styled from 'styled-components'


const ButtonSmall = styled.button`
    display: flex;
    align-items: center;
    justify-content: "center";

    padding: 1rem;
    ${({ theme }) => theme.fonts.title_small}
    border-radius: 0.8rem;

    background-color: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.gray600};

    &:disabled {
        cursor: default;
    }
`

export default ButtonSmall;
