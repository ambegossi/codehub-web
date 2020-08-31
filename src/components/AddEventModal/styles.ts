import styled from 'styled-components';

import Button from '../Button';

export const Container = styled.div`
  width: 1000px;
  height: 500px;

  span {
    margin-bottom: 10px;
  }

  textarea {
    padding: 16px;
    border: 1px solid #131315;
    color: #131315;
    border-radius: 10px;
  }

  h2 {
    margin-top: 20px;
  }
`;

export const FormLine = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const SmallInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;

  & + div {
    margin-left: 40px;
  }
`;

export const MediumInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;

  & + div {
    margin-left: 40px;
  }
`;

export const LargeInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;

  & + div {
    margin-left: 40px;
  }
`;

export const RegisterButton = styled(Button)`
  margin: 30px 0;
`;
