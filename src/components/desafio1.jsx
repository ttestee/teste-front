import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import stylesDesafios from '../styles/stylesDesafios.css';

import { buscarNumerosPalindromos } from '../http/axios'; 

const Sobre = () => {
    const [numero, setNumero] = useState('');
    const [palindromes, setPalindromes] = useState([]);
    const [error, setError] = useState(null);

    const handleNumeroChange = (event) => {
        setNumero(event.target.value);
        // Limpar o erro ao começar a digitar novamente
        setError(null);
    };

    const buscarPalindromes = async () => {
        if (!numero) {
            setError('Por favor, insira um número.');
            return;
        }

        try {
            const palindromes = await buscarNumerosPalindromos(numero);
            setPalindromes(palindromes);
            setError(null); // Limpar qualquer erro anterior
        } catch (error) {
            // Trate o erro aqui, se necessário
            setError('Erro ao buscar números palíndromos. Tente novamente mais tarde.');
        }
    };

    return (
        <div className="App home-container">

        <h1>Desafio1 - Números palíndromos</h1>
            <p>Insira um número para saber quantos palíndromos existem nesse intervalo</p>
            <input
                type='number'
                placeholder='Insira um número'
                className="input-number"
                value={numero}
                onChange={handleNumeroChange}
            />

        <div className="submit-button-container">
       
            <button onClick={buscarPalindromes} className="submit-button">Enviar</button>
       </div>     
            {error && <div className="error-message">{error}</div>}

            {palindromes.length > 0 && (
                    <div className="App home-container">
                    <h2>Números Palíndromos:</h2>
                    <ul>
                        {palindromes.map((palindrome, index) => (
                            <p key={index}>{palindrome}</p>
                        ))}
                    </ul>
                </div>
            )}
            
            <Link to="/" className="return-link">Retornar à página inicial</Link>
        </div>
    );
}

export default Sobre;
