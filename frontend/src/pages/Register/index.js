import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from 'styled-components';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import Alert from '../../components/Alert';
import BackLink from '../../components/BackLink';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container, Content, ArrowLeft } from './styles';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const themeContext = useContext(ThemeContext).colors;
  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const response = await api.post('ongs', data);

      alert(`Seu ID de acesso: ${response.data.id}`);

      history.push('/');
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

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>

          <BackLink to="/">
            <ArrowLeft size={16} color={themeContext.primary} />
            Voltar para o logon
          </BackLink>
        </section>

        <form onSubmit={handleRegister}>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nome da ONG"
          />
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="E-mail"
          />
          <Input
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
            placeholder="WhatsApp"
          />

          <div className="input-group">
            <Input
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Cidade"
            />
            <Input
              value={uf}
              onChange={e => setUf(e.target.value)}
              placeholder="UF"
              style={{ width: 80 }}
            />
          </div>

          <Button type="submit">Cadastrar</Button>
        </form>
      </Content>
    </Container>
  );
}
