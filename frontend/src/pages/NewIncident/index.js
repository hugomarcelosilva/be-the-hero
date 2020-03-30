import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from 'styled-components';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import Alert from '../../components/Alert';
import BackLink from '../../components/BackLink';
import Button from '../../components/Button';
import Input, { TextArea } from '../../components/Input';
import { Container, Content, ArrowLeft } from './styles';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const themeContext = useContext(ThemeContext).colors;
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        },
      });

      history.push('/profile');
    } catch (error) {
      Alert({
        title: 'Error',
        content: 'Erro no cadastro tente novamente mais tarde!',
      });
    }
  }

  return (
    <Container>
      <Content>
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <BackLink to="/profile">
            <ArrowLeft size={16} color={themeContext.primary} />
            Voltar para home
          </BackLink>
        </section>

        <form onSubmit={handleNewIncident}>
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Título do caso"
          />
          <TextArea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição"
          />
          <Input
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Valor em reais"
          />

          <Button type="submit">Cadastrar</Button>
        </form>
      </Content>
    </Container>
  );
}
