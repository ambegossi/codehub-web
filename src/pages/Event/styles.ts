import styled from 'styled-components';

export const Container = styled.div``;

export const EventIntro = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const EventImage = styled.div`
  width: 60%;

  img {
    width: 100%;
    height: 550px;
    border-radius: 10px;
  }
`;

export const EventContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-left: 40px;

  p {
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;

export const EventLink = styled.a`
  margin-top: 10px;
  margin-bottom: 20px;
  text-decoration: none;
`;
