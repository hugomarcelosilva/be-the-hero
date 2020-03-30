import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ThemeContext } from 'styled-components';

import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import { Container, Header, List } from './styles';

export default function Profile() {
  const themeContext = useContext(ThemeContext).colors;
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    api
      .get('profile', {
        headers: {
          Authorization: ongId,
        },
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, [ongId]);

  async function handleDeleteIncident(item) {
    try {
      await api.delete(`incidents/${item.id}`, {
        headers: {
          Authorization: ongId,
        },
      });

      setIncidents(incidents.filter(incident => incident.id !== item.id));

      Alert({
        type: 'success',
        title: 'Sucesso',
        content: (
          <p
            onClick={() => handleRecuperationIncidents(item)}
            style={{ cursor: 'pointer' }}
          >
            Incidente excluído com sucesso, <b>clique para restaurar!</b>
          </p>
        ),
      });
    } catch (error) {
      Alert({
        title: 'Error',
        content: 'Erro ao deletar, tente novamente mais tarde!',
      });
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  async function handleRecuperationIncidents(data) {
    const { title, description, value } = data;

    try {
      await api.post(
        '/incidents',
        { title, description, value },
        {
          headers: {
            Authorization: ongId,
          },
        }
      );

      setIncidents(incidents);

      Alert({
        type: 'success',
        title: 'Sucesso',
        content: 'Incidente restaurado com sucesso!',
      });
    } catch (error) {
      Alert({
        title: 'Error',
        content: `Erro: ${error}, no restauramento do Incident, tente novamente mais tarde!`,
      });
    }
  }

  return (
    <Container>
      <Header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>

        <Button className="link">
          <Link to="/incidents/new">Cadastrar novo caso</Link>
        </Button>
        <button onClick={handleLogout} className="button" type="button">
          <FiPower size={18} color={themeContext.primary} />
        </button>
      </Header>

      <h1>Casos cadastrados</h1>

      <List>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </p>

            <button
              onClick={() => handleDeleteIncident(incident)}
              type="button"
            >
              <FiTrash2 size={20} color={themeContext.text} />
            </button>
          </li>
        ))}
      </List>
    </Container>
  );
}
