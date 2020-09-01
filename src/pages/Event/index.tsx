import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import api from '../../services/api';

import {
  Container,
  EventImage,
  EventTitle,
  EventDescription,
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

  useEffect(() => {
    api.get(`events/${params.event}`).then(response => {
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
              <EventTitle>{event.title}</EventTitle>
              <EventDescription>{event.description}</EventDescription>
              <h2>Onde ?</h2>
              {event.category === 'Online' && (
                <EventLink href={event.link}>Online! Clique aqui!</EventLink>
              )}
            </EventContent>
          </EventIntro>
        </>
      )}
    </Container>
  );
};

export default Event;
