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

export const EventTitle = styled.h1`
  margin-bottom: 35px;
`;

export const EventContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-left: 40px;
`;

export const EventDescription = styled.p`
  margin-bottom: 20px;
`;

export const EventLink = styled.a`
  text-decoration: none;
  margin-top: 10px;
`;
