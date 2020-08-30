import styled from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  isLoading: number;
}

export const Container = styled.button<ContainerProps>`
  background: #efe6ff;
  height: 35px;
  width: 160px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #7848f4;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${shade(0.2, '#efe6ff')};
  }
  cursor: ${({ isLoading }) => (isLoading ? 'not-allowed' : 'pointer')};
`;
