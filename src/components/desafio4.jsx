import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import stylesDesafios from '../styles/stylesDesafios.css';
import Desafio3 from './desafio3';

const Desafio4 = () => {
  const [ceps, setCeps] = useState(['', '', '', '', '']);
  const [cepData, setCepData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e, index) => {
    const newCeps = [...ceps];
    newCeps[index] = e.target.value;
    setCeps(newCeps);
  };

  const fetchCepData = async () => {
    setIsLoading(true);
    const newData = [];

    for (let i = 0; i < ceps.length; i++) {
      try {
        const response = await axios.get(`http://localhost:3030/desafio4/${ceps[i]}`);
        const data = response.data;
        newData.push(data);
      } catch (error) {
        newData.push({ error: 'CEP não encontrado' });
      }
    }

    setIsLoading(false);
    setCepData(newData);
  };

  return (
    <div className="App home-container">
      <h1 className="form-title">Consulta de CEPs</h1>
      <div className="input-container">
        {ceps.map((cep, index) => (
          <input
            key={index}
            type="text"
            placeholder="Digite um CEP"
            value={cep}
            onChange={(e) => handleChange(e, index)}
            className="form-input"
          />
        ))}
      </div>
      <button onClick={fetchCepData} disabled={isLoading} className="form-button">
        {isLoading ? 'Consultando...' : 'Consultar'}
      </button>
      <Link to="/" className="return-link">Retornar à página inicial</Link>
      <div className="result-container">
        {cepData.map((data, index) => (
          <div key={index} className="result-item">
            {data.error ? (
              <p className="error-message">{data.error}</p>
            ) : (
              <>
              <div className="App home-container">
                <p><strong>CEP:</strong> {data.cep}</p>
                <p><strong>Logradouro:</strong> {data.logradouro}</p>
                <p><strong>Bairro:</strong> {data.bairro}</p>
                <p><strong>Cidade:</strong> {data.localidade}</p>
                <p><strong>Estado:</strong> {data.uf}</p>
              </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Desafio4;
