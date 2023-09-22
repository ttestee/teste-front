import React from 'react';
import { Line } from 'react-chartjs-2';

const StatusChart = ({ responseTimes }) => {
  const data = {
    labels: responseTimes.map((_, index) => index + 1),
    datasets: [
      {
        label: 'Tempo de Resposta (ms)',
        data: responseTimes,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      <h2>Gráfico de Tempo de Resposta</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default StatusChart;
