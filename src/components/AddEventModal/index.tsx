import React, { useState, useRef, useCallback } from 'react';
import Modal from 'react-modal';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { formatISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

import { Event } from '../../pages/Home';
import DateTimePicker from '../DateTimePicker';
import DropdownMenu from '../DropdownMenu';
import Input from '../Input';
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  FormLine,
  SmallInput,
  MediumInput,
  LargeInput,
  RegisterButton,
} from './styles';

interface AddEventModalProps {
  modalIsOpen: boolean;
  handleAddEvent: (event: Event) => void;
  closeModal: () => void;
  onRequestClose: () => void;
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

const AddEventModal: React.FC<AddEventModalProps> = ({
  handleAddEvent,
  modalIsOpen,
  ...rest
}) => {
  const formRef = useRef<FormHandles>(null);

  const [category, setCategory] = useState<string>('Presencial');
  const [description, setDescription] = useState<string>('');
  const [dateTime, setDateTime] = useState<Date>(new Date());

  const handleSubmit = useCallback(
    async (data: Event) => {
      try {
        formRef.current?.setErrors({});

        const event = {
          ...data,
          category,
          description,
          datetime: formatISO(dateTime),
        };

        const schema = Yup.object().shape({
          title: Yup.string().required('Título obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          image: Yup.string().required('Link da imagem obrigatório'),
        });

        await schema.validate(event, {
          abortEarly: false,
        });

        handleAddEvent(event);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [category, dateTime, description, handleAddEvent],
  );

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
          <h1>Novo Evento</h1>

          <FormLine>
            <MediumInput>
              <span>Título</span>
              <Input name="title" placeholder="Título do Evento" />
            </MediumInput>
            <LargeInput>
              <span>Link da Imagem do Evento</span>
              <Input name="image" placeholder="https://link.com/imagem" />
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
              />
            </MediumInput>
            <MediumInput>
              <span>Telefone (Celular)</span>
              <Input name="phone" placeholder="(00) 00000-0000" />
            </MediumInput>
          </FormLine>

          {category === 'Presencial' && (
            <>
              <FormLine>
                <LargeInput>
                  <span>Rua</span>
                  <Input name="street" placeholder="Rua Logo Ali" />
                </LargeInput>
                <SmallInput>
                  <span>Número</span>
                  <Input name="street_number" placeholder="1210" />
                </SmallInput>
                <MediumInput>
                  <span>Bairro</span>
                  <Input name="neighborhood" placeholder="Bairro Exemplo" />
                </MediumInput>
              </FormLine>
              <FormLine>
                <MediumInput>
                  <span>Cidade</span>
                  <Input name="city" placeholder="Cidade Exemplo" />
                </MediumInput>
                <MediumInput>
                  <span>Estado</span>
                  <Input name="state" placeholder="Estado Exemplo" />
                </MediumInput>
                <MediumInput>
                  <span>CEP</span>
                  <Input name="zip_code" placeholder="00000-000" />
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

          <RegisterButton type="submit">Cadastrar</RegisterButton>
        </Form>
      </Container>
    </Modal>
  );
};

export default AddEventModal;
