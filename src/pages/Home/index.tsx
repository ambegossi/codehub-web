import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiEdit2, FiDelete } from 'react-icons/fi';

import api from '../../services/api';

import DropdownMenu from '../../components/DropdownMenu';
import AddEventModal from '../../components/AddEventModal';
import EditEventModal from '../../components/EditEventModal';

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
  EventButtonsWrapper,
  EditEventButton,
  DeleteEventButton,
} from './styles';

export interface Event {
  id: number;
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
  const [addEventModalIsOpen, setAddEventModalIsOpen] = useState<boolean>(
    false,
  );
  const [editEventModalIsOpen, setEditEventModalIsOpen] = useState<boolean>(
    false,
  );
  const [event, setEvent] = useState<Event>();

  function openAddEventModal(): void {
    setAddEventModalIsOpen(true);
  }

  function closeAddEventModal(): void {
    setAddEventModalIsOpen(false);
  }

  function openEditEventModal(): void {
    setEditEventModalIsOpen(true);
  }

  function closeEditEventModal(): void {
    setEditEventModalIsOpen(false);
  }

  function handleAddEvent(data: Event): void {
    const newEvent = data;
    newEvent.id = events.length + 1;
    newEvent.day = format(new Date(data.datetime), 'd');
    newEvent.month = format(new Date(data.datetime), 'MMM', {
      locale: ptBR,
    });
    setEvents(oldEvents => [...oldEvents, newEvent]);
    closeAddEventModal();
  }

  function handleEditEvent(data: Event): void {
    const editedEvent = data;
    editedEvent.day = format(new Date(data.datetime), 'd');
    editedEvent.month = format(new Date(data.datetime), 'MMM', {
      locale: ptBR,
    });
    setEvents(
      events.map(item => (item.id === editedEvent.id ? editedEvent : item)),
    );
    closeEditEventModal();
  }

  function handleDeleteEvent(selectedEvent: Event): void {
    if (window.confirm('Você tem certeza que quer deletar este evento?')) {
      setEvents(events.filter(item => item.id !== selectedEvent.id));
    }
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
        closeModal={closeAddEventModal}
        onRequestClose={closeAddEventModal}
        modalIsOpen={addEventModalIsOpen}
      />

      {event && (
        <EditEventModal
          selectedEvent={event}
          handleEditEvent={handleEditEvent}
          closeModal={closeEditEventModal}
          onRequestClose={closeEditEventModal}
          modalIsOpen={editEventModalIsOpen}
        />
      )}

      <ContentWrapper>
        <CategoryRow>
          <h2>Próximos Eventos</h2>
          <ButtonsWrapper>
            <AddEventButton onClick={openAddEventModal} type="button">
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
            eventItem =>
              (eventItem.category === category ||
                category === 'Todos' ||
                !category) && (
                <Event key={eventItem.id}>
                  <EventButtonsWrapper>
                    <EditEventButton
                      onClick={() => {
                        setEvent(eventItem);
                        openEditEventModal();
                      }}
                      type="button"
                    >
                      <FiEdit2 size={13} />
                    </EditEventButton>
                    <DeleteEventButton
                      onClick={() => handleDeleteEvent(eventItem)}
                    >
                      <FiDelete size={13} />
                    </DeleteEventButton>
                  </EventButtonsWrapper>

                  <img src={eventItem.image} alt="Evento" />
                  <EventContent>
                    <EventDate>
                      <EventMonth>{eventItem.month}</EventMonth>
                      <strong>{eventItem.day}</strong>
                    </EventDate>
                    <EventDescription>
                      <strong>{eventItem.title}</strong>
                      <p>{eventItem.description}</p>
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
