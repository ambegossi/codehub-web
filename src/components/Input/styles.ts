import styled from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isField: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  border-radius: 10px;
  height: 40px;
  padding: 16px;
  border: 1px solid #131315;
  color: #131315;
  display: flex;
  align-items: center;

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #131315;
    &::placeholder {
      color: #666360;
    }
  }
`;
