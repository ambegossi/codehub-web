import styled from 'styled-components';

import Button from '../../components/Button';

import bgIntroImg from '../../assets/bg-intro.jpg';

interface EventProps {
  key: string;
}

export const Intro = styled.div`
  background: url(${bgIntroImg}) no-repeat center;
  background-size: cover;
  height: 550px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding-left: 80px;
`;

export const Title = styled.h1`
  font-size: 64px;
  max-width: 400px;
  color: #fff;
  text-transform: uppercase;
  margin-top: 100px;
`;

export const SubTitle = styled.h4`
  color: #fff;
`;

export const ContentWrapper = styled.div`
  max-width: 1060px;
  margin: 0 auto;
  height: 800px;
`;

export const CategoryRow = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: space-between;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const AddEventButton = styled(Button)`
  color: #131315;
  margin-right: 20px;
  width: 130px;

  &:hover {
    background-color: #7848f4;
  }
`;

export const Events = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Event = styled.div<EventProps>`
  width: 330px;
  height: 360px;
  margin: 20px 0;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: scale(1.05, 1.05);
  }

  img {
    border-radius: 10px 10px 0 0;
    max-width: 100%;
    height: 220px;
  }
`;

export const EventContent = styled.div`
  background-color: #fff;
  height: 130px;
  padding: 20px 15px;
  display: flex;
  flex-direction: row;
  border-radius: 0 0 10px 10px;
`;

export const EventDate = styled.div`
  max-width: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const EventMonth = styled.strong`
  color: #7848f4;
  text-transform: uppercase;
`;

export const EventDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  p {
    font-size: 14px;
    color: #a3a3a3;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
