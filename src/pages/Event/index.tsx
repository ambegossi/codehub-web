import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '../../services/api';

import {
  Container,
  EventImage,
  EventIntro,
  EventContent,
  EventLink,
} from './styles';

interface EventParams {
  event: string;
}

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

const Event: React.FC = () => {
  const { params } = useRouteMatch<EventParams>();
  const [event, setEvent] = useState<Event | null>(null);
  const [eventDateTime, setEventDateTime] = useState<string>();

  useEffect(() => {
    api.get(`events/${params.event}`).then(response => {
      const dateTime = response.data.datetime;
      setEventDateTime(
        format(new Date(dateTime), "'Dia' dd 'de' MMM 'de' YYY", {
          locale: ptBR,
        }),
      );
      setEvent(response.data);
    });
  }, [params.event]);

  return (
    <Container>
      {event && (
        <>
          <EventIntro>
            <EventImage>
              <img src={event.image} alt="" />
            </EventImage>
            <EventContent>
              <h1>{event.title}</h1>
              <p>{event.description}</p>
              <h2>Quando?</h2>
              <p>{eventDateTime}</p>
              <h2>Onde?</h2>
              {event.category === 'Presencial' ? (
                <p>
                  {`${event.street}, ${event.street_number}`}
                  <br />
                  {`${event.city}, ${event.state}`}
                </p>
              ) : (
                <EventLink href={event.link}>{event.link}</EventLink>
              )}

              <h2>Contato</h2>
              <p>
                {event.email}
                <br />
                {event.phone}
              </p>
            </EventContent>
          </EventIntro>
        </>
      )}
    </Container>
  );
};

export default Event;
