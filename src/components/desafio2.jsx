import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 
import stylesDesafios from '../styles/stylesDesafios.css';

const Desafio2 = () => {
  const [bugs, setBugs] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false); // Estado para mostrar o alerta de sucesso
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = () => {
    fetch('http://localhost/api-backend/bugs/api_bugs.php') 
      .then((response) => response.json())
      .then((data) => setBugs(data))
      .catch((error) => console.error('Erro ao buscar os bugs:', error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descricao', descricao);

    fetch('http://localhost/api-backend/bugs/api_bugs.php', { 
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        setSuccessAlert(true); 
        setTitulo('');
        setDescricao('');
        fetchBugs(); 
      })
      .catch((error) => console.error('Erro ao enviar o formulário:', error));
  };

  return (
    <div className='home-container'>
      <div className="center-content"> 
        <h1 className="form-title">Relatar um Bug</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="titulo" className="form-label">Título:</label>
          <input
            type="text"
            name="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className="form-input"
          /><br />
          <label htmlFor="descricao" className="form-label">Descrição:</label>
          <textarea
            name="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            className="form-input" 
          ></textarea><br />
          <input
            type="submit"
            value="Relatar Bug"
            className="form-button" 
          />
        </form>

        {successAlert && (
          <div className="success-alert">
            Bug cadastrado com sucesso!
          </div>
        )}

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
