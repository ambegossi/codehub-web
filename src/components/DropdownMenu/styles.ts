import styled from 'styled-components';

interface ListProps {
  visible: boolean;
}

export const Container = styled.div``;

export const Button = styled.button`
  width: 160px;
  height: 35px;
  border: none;
  border-radius: 10px;
  background-color: #efe6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  strong {
    margin-right: 10px;
  }

  &:hover {
    background-color: #7848f4;
  }
`;

export const List = styled.div<ListProps>`
  position: absolute;
  margin-top: 5px;
  width: 200px;
  background-color: #efe6ff;
  border-radius: 10px;
  padding: 15px 5px;
  display: ${props => (props.visible ? 'block' : 'none')};
`;

export const Item = styled.div`
  padding: 5px 10px;

  button {
    border: none;
    color: #131315;
    text-decoration: none;

    &:hover {
      color: #7848f4;
    }
  }
`;
