import React, { useState } from 'react';
import { dadosVeiculo } from '../http/axios'; 
import stylesDesafios from '../styles/stylesDesafios.css';

import { Link } from 'react-router-dom';

const Desafio3 = () => {
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [qtdPortas, setQtdPortas] = useState('');
  const [marca, setMarca] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!modelo || !ano || !qtdPortas || !marca) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const novoVeiculo = {
      Modelo: modelo,
      anoFabricacao: parseInt(ano),
      qtdPortas: parseInt(qtdPortas),
      Marcas: marca,
    };

    try { 
       const response = await dadosVeiculo(novoVeiculo);

      if (response) {
        setModelo('');
        setAno('');
        setQtdPortas('');
        setMarca('');
        setError(null);
      } else {
        setError('Erro ao adicionar veículo.');
      }
    } catch (error) {
      console.error(error);
      setError('Erro ao adicionar veículo.');
    }
  };

  return (
    <div className="App home-container">
      <h1>Adicionar Veículo</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="modelo">Modelo:</label>
        <input
          type="text"
          id="modelo"
          name="modelo"
          className="input-number"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="ano">Ano de Fabricação:</label>
        <input
          type="number"
          id="ano"
          name="ano"
          className="input-number"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="qtdPortas">Quantidade de Portas:</label>
        <input
          type="number"
          id="qtdPortas"
          name="qtdPortas"
          className="input-number"
          value={qtdPortas}
          onChange={(e) => setQtdPortas(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="marca">Marca:</label>
        <input
          type="text"
          id="marca"
          name="marca"
          className="input-number"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
        />
        <br />
        <br />

        <div className="submit-button-container">
       
        <button type="submit" className="submit-button">Salvar</button>
        </div>
      </form>
      {error && <div className="error-message">{error}</div>}
      <Link to="/" className="return-link">Retornar à página inicial</Link>

    </div>
    
  );
}

export default Desafio3;
