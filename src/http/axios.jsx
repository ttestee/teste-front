
import axios from 'axios';

export const buscarNumerosPalindromos = async (numero) => {
  try {
    const response = await axios.get(`http://localhost:3030/desafio1/${numero}`);
    return response.data.palindromes;
  } catch (error) {
    console.error('Erro ao buscar números palíndromos:', error);
    throw error;
  }
};

export const calcularTroco = async (valorCompra, pagamento) => {
  try {
    const response = await axios.post('http://localhost:3030/desafio2', { valorCompra, pagamento });
    return response.data;
  } catch (error) {
    console.error('Erro ao calcular o troco:', error);
    throw error;
  }
};

export const dadosVeiculo = async (veiculo) => {
  try {
    const response = await axios.post('http://localhost:3030/desafio3', veiculo);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar veículo:', error);
    throw error;
  }
};

export const fetchCepData = async (ceps, setIsLoading, setCepData) => {
  setIsLoading(true);
  const newData = [];

  for (let i = 0; i < ceps.length; i++) {
    try {
      const response = await axios.get(`http://localhost:3030/desafio4/${ceps[i]}`);
      const data = response.data;
      console.log(data);
      newData.push(data);
    } catch (error) {
      newData.push({ error: 'CEP não encontrado' });
    }
  }

  setIsLoading(false);
  setCepData(newData);
};
