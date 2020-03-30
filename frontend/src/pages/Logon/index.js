import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from 'styled-components';

import api from '../../services/api';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

import Alert from '../../components/Alert';
import BackLink from '../../components/BackLink';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container, LogIn } from './styles';

export default function Logon() {
  const themeContext = useContext(ThemeContext).colors;
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (error) {
      Alert({
        title: 'error',
        content: 'Falha no login, Tente novamente!',
      });
    }
  }

  return (
    <Container>
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <Input
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="Seu ID"
          />
          <Button type="submit">Entrar</Button>

          <BackLink to="/register">
            <LogIn size={16} color={themeContext.primary} />
            Não tenho cadastro
          </BackLink>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </Container>
  );
}
