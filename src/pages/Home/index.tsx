import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import api from '../../services/api';

import DropdownMenu from '../../components/DropdownMenu';
import AddEventModal from '../../components/AddEventModal';

import {
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
  EventDescription,
} from './styles';

export interface Event {
  title: string;
  description: string;
  datetime: string;
  email: string;
  phone: string;
  category: string;
  street: string;
  street_number: string;
  neighborhood: string;
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
  const [category, setCategory] = useState<string>();
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  function openModal(): void {
    setIsOpen(true);
  }

  function closeModal(): void {
    setIsOpen(false);
  }

  function handleAddEvent(event: Event): void {
    const newEvent = event;
    newEvent.day = format(new Date(event.datetime), 'd');
    newEvent.month = format(new Date(event.datetime), 'MMM', {
      locale: ptBR,
    });
    closeModal();
    setEvents(oldEvents => [...oldEvents, event]);
  }

  useEffect(() => {
    api.get<Event[]>('events').then(response => {
      const data = response.data.map(event => ({
        ...event,
        day: format(new Date(event.datetime), 'd'),
        month: format(new Date(event.datetime), 'MMM', {
          locale: ptBR,
        }),
      }));

      setEvents(data);
    });
  }, []);

  function handleChangeCategory(selectedCategory: string): void {
    setCategory(selectedCategory);
  }

  return (
    <>
      <Intro>
        <Title>Feito para quem faz</Title>
        <SubTitle>
          Divulgue e visualize os melhores eventos de programação.
        </SubTitle>
      </Intro>

      <AddEventModal
        handleAddEvent={handleAddEvent}
        closeModal={closeModal}
        onRequestClose={closeModal}
        modalIsOpen={modalIsOpen}
      />

      <ContentWrapper>
        <CategoryRow>
          <h2>Próximos Eventos</h2>
          <ButtonsWrapper>
            <AddEventButton onClick={openModal} type="submit">
              + Evento
            </AddEventButton>
            <DropdownMenu
              name={category || 'Categorias'}
              onChangeItem={handleChangeCategory}
              items={['Todos', 'Presencial', 'Online']}
            />
          </ButtonsWrapper>
        </CategoryRow>

        <Events>
          {events.map(
            event =>
              (event.category === category ||
                category === 'Todos' ||
                !category) && (
                <Event key={event.title}>
                  <img src={event.image} alt="Evento" />
                  <EventContent>
                    <EventDate>
                      <EventMonth>{event.month}</EventMonth>
                      <strong>{event.day}</strong>
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
    </>
  );
};

export default Home;
