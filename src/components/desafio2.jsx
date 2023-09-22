import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 
import stylesDesafios from '../styles/stylesDesafios.css';

const Desafio2 = () => {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {

    fetch('https://localhost/api-backend/bugs/api_bugs.php') 
      .then((response) => response.json())
      .then((data) => setBugs(data))
      .catch((error) => console.error('Erro ao buscar os bugs:', error));
  }, []);

  return (
    <div className='home-container' >
          <div className="center-content"> 
      <h1 className="form-title">Relatar um Bug</h1>
      <form  method="post">
        <label htmlFor="titulo" className="form-label">Título:</label>
        <input
          type="text"
          name="titulo"
          required
          className="form-input"/>
          <br />
        <label htmlFor="descricao" className="form-label">Descrição:</label>
        <textarea
          name="descricao"
          required
          className="form-input" 
        ></textarea><br />
        <input
          type="submit"
          value="Relatar Bug"
          className="form-button" 
        />
      </form>

      <h2>Lista de Bugs</h2>
      <ul>
        {bugs.length > 0 ? (
          bugs.map((bug) => (
            <li key={bug.id}>
              <strong>Título:</strong> {bug.titulo}<br />
              <strong>Descrição:</strong> {bug.descricao}<br />
              <strong>Status:</strong> {bug.status}<br />
              <strong>Data de Criação:</strong> {bug.data_criacao}<br />
            </li>
          ))
        ) : (
          <p>Nenhum bug relatado.</p>
        )}
      </ul>

      <Link to="/" className="return-link">Retornar à página inicial</Link>
    </div>
    </div>

  );
};

export default Desafio2;
