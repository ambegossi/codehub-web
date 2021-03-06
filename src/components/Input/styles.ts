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
    color: #2d2d30;
    &::placeholder {
      color: #666360;
    }
  }
`;

export const ErrorMessage = styled.p`
  color: #ed3737;
  margin-top: 5px;
`;
