import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { calcularTroco } from '../http/axios'; 
import stylesDesafios from '../styles/stylesDesafios.css';

const Desafio2 = () => {
  const [valorCompra, setValorCompra] = useState('');
  const [pagamento, setPagamento] = useState('');
  const [trocoData, setTrocoData] = useState(null);
  const [error, setError] = useState(null);

  const handleValorCompraChange = (event) => {
    setValorCompra(event.target.value);
  };

  const handlePagamentoChange = (event) => {
    setPagamento(event.target.value);
  };

  const handleCalcularTroco = async () => {
    try {
      const trocoData = await calcularTroco(parseFloat(valorCompra), parseFloat(pagamento));
      setTrocoData(trocoData);
      setError(null);
    } catch (error) {
      setError('Erro ao calcular o troco. Verifique os valores inseridos.');
      setTrocoData(null);
    }
  };

  return (
    <div className="App home-container">
      <h1>Desafio2 - Cálculo de Troco</h1>
      <form>
        <div>
          <label htmlFor="valorCompra" className="form-label">Valor da compra: </label>
          <input
            type="number"
            id="valorCompra"
            value={valorCompra}
            onChange={handleValorCompraChange}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="pagamento" className="form-label">Valor entregue pelo cliente: </label>
          <input
            type="number"
            id="pagamento"
            value={pagamento}
            onChange={handlePagamentoChange}
            className="form-input"
          />
        </div>
      </form>
      <div className="submit-button-container">
        <button type="button" onClick={handleCalcularTroco} className="submit-button">
          Calcular Troco
        </button>
      </div>
      {error && <div className="error">{error}</div>}
      {trocoData && (
        
        <div className="App home-container">
                
        <h2>Resultado do Troco:</h2>
          <p>Valor da compra: R$ {trocoData.valorCompra}</p>
          <p>Valor do pagamento: R$ {trocoData.pagamento}</p>
          <p>Troco a ser dado: R$ {trocoData.troco}</p>
          <p>Número total de notas/itens necessários: {trocoData.numeroTotalNotas}</p>
          <p>Quantidade de cada tipo de nota no troco:</p>
          <ul>
            {Object.entries(trocoData.quantidadeNotas).map(([nota, quantidade]) => (
              <li key={nota}>
                Notas de R$ {nota}: {quantidade}
              </li>
            ))}
          </ul>
        </div>
      )}
      <Link to="/" className="return-link">Retornar à página inicial</Link>
    </div>
  );
};

export default Desafio2;
