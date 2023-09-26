import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom'; 


const Desafio3 = () => {
  const [siteStatus, setSiteStatus] = useState({});
  const [responseTimes, setResponseTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [urlInput, setUrlInput] = useState('');
  const canvasRef = useRef(null);
  const chartRef = useRef(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (urlInput.trim() !== '') {
          const response = await axios.get(`http://localhost/api-backend/dashboard/?url=${urlInput}`);
          const newResponseTime = response.data.response_time;
          setSiteStatus(response.data);
          setResponseTimes((prevResponseTimes) => [
            ...prevResponseTimes,
            newResponseTime,
          ]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    const drawChart = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        const maxValue = Math.max(...responseTimes);
        const minValue = Math.min(...responseTimes);
        const valueRange = maxValue - minValue;

        const chartHeight = 200;
        const chartWidth = 400;
        const xOffset = 50;
        const yOffset = 20;

        context.beginPath();
        context.moveTo(xOffset, yOffset + chartHeight);

        responseTimes.forEach((time, index) => {
          const x = (index / (responseTimes.length - 1)) * chartWidth + xOffset;
          const y =
            yOffset +
            chartHeight -
            ((time - minValue) / valueRange) * chartHeight;
          context.lineTo(x, y);
        });

        context.strokeStyle = 'rgba(75,192,192,1)';
        context.lineWidth = 2;
        context.stroke();

        if (chartRef.current) {
          chartRef.current.destroy();
        }

        chartRef.current = new Chart(context, {
          type: 'line',
          data: {
            labels: responseTimes.map((_, index) => index.toString()),
            datasets: [
              {
                label: 'Tempo de Resposta',
                data: responseTimes,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: 'category',
                title: {
                  display: true,
                  text: 'Leituras',
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Tempo de Resposta (ms)',
                },
              },
            },
          },
        });
      }
    };

    const interval = setInterval(() => {
      fetchData();
      drawChart();
    }, 5000);

    fetchData();
    drawChart();

    return () => {
      clearInterval(interval);
    };
  }, [urlInput, responseTimes]);

  const monitorSite = async () => {
    try {
      if (urlInput.trim() !== '') {
        const response = await axios.post('http://localhost/api-backend/dashboard/', { url: urlInput });
        console.log('Site monitorado:', response.data);
      } else {
        console.error('URL inválida');
      }
    } catch (error) {
      console.error('Erro ao monitorar o site:', error);
    }
  };

  return (
    <div className="home-container"> 
    <div className="center-content"> 
      <h1>Status do Site Monitorado</h1>
      <div>
        <label htmlFor="urlInput">URL do Site:</label>
        <input
          type="text"
          id="urlInput"
          className='form-input'
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        <button onClick={() => monitorSite()} className='form-button'>Monitorar</button>
      </div>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          <p>Status: {siteStatus.status}</p>
          <p>Tempo de Resposta: {siteStatus.response_time} ms</p>
          <canvas ref={canvasRef} width={450} height={250} />
        </div>
      )}
      <Link to="/" className="return-link">Retornar à página inicial</Link>

    </div></div>
  );
};

export default Desafio3;