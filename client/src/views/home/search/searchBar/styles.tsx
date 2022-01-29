import styled from 'styled-components';

export const Container = styled.div`1
    display: inline;
    background-color: white;
    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: 10px;
    border: 1px solid white;
    height: 40px;
`;

export const StyledButton = styled.button`
    background-color: white;
    border: none;
    color: black;
    &:hover {
      cursor: pointer;
    };
}
`;

export const StyledInput = styled.input`
    border: none;
    border-radius: 10px;
    border-color: white;
    height: 100%;
    background-color: inherit;
    color: black;
    padding-left: 10px;
    width: calc(100% - 55px);
    outline: none;
`;
