import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { formatISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

import DateTimePicker from '../DateTimePicker';
import { Event } from '../../pages/Home';
import DropdownMenu from '../DropdownMenu';

import Input from '../Input';

import {
  Container,
  FormLine,
  SmallInput,
  MediumInput,
  LargeInput,
  RegisterButton,
} from './styles';

interface EditEventModalProps {
  modalIsOpen: boolean;
  handleEditEvent: (event: Event) => void;
  closeModal: () => void;
  onRequestClose: () => void;
  selectedEvent: Event;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '40px',
  },
};

Modal.setAppElement('#root');

const EditEventModal: React.FC<EditEventModalProps> = ({
  handleEditEvent,
  modalIsOpen,
  selectedEvent,
  ...rest
}) => {
  const formRef = useRef<FormHandles>(null);

  const [category, setCategory] = useState<string>('Presencial');
  const [description, setDescription] = useState<string>('');
  const [dateTime, setDateTime] = useState<Date | null>(new Date());

  useEffect(() => {
    setDescription(selectedEvent.description);
    setCategory(selectedEvent.category);
    setDateTime(new Date(selectedEvent.datetime));
  }, [selectedEvent]);

  function handleSubmit(data: any): void {
    const event = {
      ...data,
      id: selectedEvent.id,
      category,
      description,
      datetime: dateTime ? formatISO(dateTime) : null,
    };
    handleEditEvent(event);
  }

  function handleChangeDescription(value: string): void {
    setDescription(value);
  }

  function handleChangeDateTime(selectedDateTime: Date): void {
    setDateTime(selectedDateTime);
  }

  function handleChangeCategory(selectedCategory: string): void {
    setCategory(selectedCategory);
  }

  return (
    <Modal isOpen={modalIsOpen} style={customStyles} {...rest}>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Editar Evento</h1>

          <FormLine>
            <MediumInput>
              <span>Título</span>
              <Input
                name="title"
                placeholder="Título do Evento"
                defaultValue={selectedEvent.title}
              />
            </MediumInput>
            <LargeInput>
              <span>Link da Imagem do Evento</span>
              <Input
                name="image"
                placeholder="https://link.com/imagem"
                defaultValue={selectedEvent.image}
              />
            </LargeInput>
          </FormLine>

          <FormLine>
            <LargeInput>
              <span>Descrição do Evento</span>
              <textarea
                name="description"
                placeholder="Descrição do Evento..."
                value={description}
                onChange={event => handleChangeDescription(event.target.value)}
                required
              />
            </LargeInput>
            <SmallInput>
              <span>Categoria do Evento</span>
              <DropdownMenu
                name={category}
                onChangeItem={handleChangeCategory}
                items={['Presencial', 'Online']}
              />
            </SmallInput>
          </FormLine>

          <h2>Data e Hora</h2>
          <FormLine>
            <DateTimePicker
              selected={dateTime}
              onChange={handleChangeDateTime}
              dateFormat="dd/MM/yyyy h:mm aa"
              showTimeInput
            />
          </FormLine>

          <h2>Contato e Localização</h2>

          <FormLine>
            <MediumInput>
              <span>E-mail</span>
              <Input
                name="email"
                type="email"
                placeholder="email@contato.com"
                defaultValue={selectedEvent.email}
              />
            </MediumInput>
            <MediumInput>
              <span>Telefone (Celular)</span>
              <Input
                name="phone"
                placeholder="(00) 00000-0000"
                defaultValue={selectedEvent.phone}
              />
            </MediumInput>
          </FormLine>

          {category === 'Presencial' && (
            <>
              <FormLine>
                <LargeInput>
                  <span>Rua</span>
                  <Input
                    name="street"
                    placeholder="Rua Logo Ali"
                    defaultValue={selectedEvent.street}
                  />
                </LargeInput>
                <SmallInput>
                  <span>Número</span>
                  <Input
                    name="street_number"
                    placeholder="1210"
                    defaultValue={selectedEvent.street_number}
                  />
                </SmallInput>
                <MediumInput>
                  <span>Bairro</span>
                  <Input
                    name="neighborhood"
                    placeholder="Bairro Exemplo"
                    defaultValue={selectedEvent.neighborhood}
                  />
                </MediumInput>
              </FormLine>
              <FormLine>
                <MediumInput>
                  <span>Cidade</span>
                  <Input
                    name="city"
                    placeholder="Cidade Exemplo"
                    defaultValue={selectedEvent.city}
                  />
                </MediumInput>
                <MediumInput>
                  <span>Estado</span>
                  <Input
                    name="state"
                    placeholder="Estado Exemplo"
                    defaultValue={selectedEvent.state}
                  />
                </MediumInput>
                <MediumInput>
                  <span>CEP</span>
                  <Input
                    name="zip_code"
                    placeholder="00000-000"
                    defaultValue={selectedEvent.zip_code}
                  />
                </MediumInput>
              </FormLine>
            </>
          )}

          {category === 'Online' && (
            <>
              <FormLine>
                <LargeInput>
                  <span>Link do Evento</span>
                  <Input name="event_link" placeholder="https://link.com" />
                </LargeInput>
              </FormLine>
            </>
          )}

          <RegisterButton type="submit">Salvar</RegisterButton>
        </Form>
      </Container>
    </Modal>
  );
};

export default EditEventModal;
