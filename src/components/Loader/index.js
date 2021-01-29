import styled from 'styled-components';

const Loader = styled.div`
    margin: 0 auto;
    height: 40px;
    width: 40px;
    background: #151825;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-top: 2px solid ${({ theme }) => theme.colors.contrastText};
    animation: spinner1 600ms linear infinite;
    @keyframes spinner1 {
        to {
            transform: rotate(360deg);
        }
    }
`;

export default Loader;
