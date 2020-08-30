import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from '../../services/api';

import DropdownMenu from '../../components/DropdownMenu';

import {
  Container,
  Intro,
  Title,
  SubTitle,
  ContentWrapper,
  CategoryRow,
  ButtonsWrapper,
  AddEventButton,
  Events,
  Event,
  EventContent,
  EventDate,
  EventMonth,
  EventDay,
  EventDescription,
} from './styles';

interface Event {
  id: string;
  title: string;
  description: string;
  datetime: string;
  email: string;
  phone: string;
  category: string;
  street: string;
  street_number: string;
  state: string;
  city: string;
  zip_code: string;
  image: string;
  link: string;
  day: string;
  month: string;
}

const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [category, setCategory] = useState<string>('Todas');

  useEffect(() => {
    api.get<Event[]>('events').then(response => {
      const data = response.data.map(event => ({
        ...event,
        day: format(new Date(event.datetime), 'd'),
        month: format(new Date(event.datetime), 'MMM'),
      }));

      setEvents(data);
    });
  });

  function handleCategoryFilter(category: string): void {
    setCategory(category);
  }

  return (
    <Container>
      <Intro>
        <Title>Feito para quem faz</Title>
        <SubTitle>
          Divulgue e visualize os melhores eventos de programação.
        </SubTitle>
      </Intro>

      <ContentWrapper>
        <CategoryRow>
          <h2>Próximos Eventos</h2>
          <ButtonsWrapper>
            <AddEventButton type="submit">+ Evento</AddEventButton>
            <DropdownMenu
              handleCategoryFilter={handleCategoryFilter}
              items={['Todas', 'Presencial', 'Online']}
            />
          </ButtonsWrapper>
        </CategoryRow>

        <Events>
          {events.map(
            event =>
              (event.category === category || category === 'Todas') && (
                <Event key={event.title}>
                  <img src={event.image} alt="Evento" />
                  <EventContent>
                    <EventDate>
                      <EventMonth>{event.month}</EventMonth>
                      <EventDay>{event.day}</EventDay>
                    </EventDate>
                    <EventDescription>
                      <strong>{event.title}</strong>
                      <p>{event.description}</p>
                    </EventDescription>
                  </EventContent>
                </Event>
              ),
          )}
        </Events>
      </ContentWrapper>
    </Container>
  );
};

export default Home;
