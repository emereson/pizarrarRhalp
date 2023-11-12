import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import styles from './styles.module.scss';

const CustomGraph = ({ data }) => {
  // Ordenar los datos por fecha ascendente
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Agrupar los datos por mes
  const groupedData = sortedData.reduce((acc, item) => {
    const month = new Date(item.date).toLocaleString('en-US', { month: 'short' });
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(item);
    return acc;
  }, {});

  // Obtener los meses y puntajes
  const months = Object.keys(groupedData);
  const scores = months.map(
    month => groupedData[month][groupedData[month].length - 1].score
  );

  // Calcular el promedio de los datos
  const suma = scores.reduce((acc, score) => acc + score, 0);
  const promedio = Math.floor(suma / scores.length);
  const [value, setValue] = useState(100);

  useEffect(() => {
    let startValue = 0;
    const endValue = promedio;
    const duration = 5000; // Duración total en milisegundos
    const delay = 2000; // Retraso inicial en milisegundos
    const increment = ((endValue - startValue) / (duration - delay)) * 10; // Incremento cada 10 ms

    let intervalId; // Declarar intervalId fuera del alcance de useEffect

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        startValue += increment;
        setValue(Math.round(startValue));

        if (startValue >= endValue) {
          clearInterval(intervalId);
        }
      }, 10);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  // Crear las etiquetas para el eje X
  const labels = [0, 1, 2, 3, 4];

  // Crear el conjunto de datos para el gráfico
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: scores,
        fill: false,
        borderColor: 'rgba(41, 184, 0)',
        borderWidth: 1,
        pointRadius: labels.map((_, index) => (index === 4 - 1 ? 5 : 0)),
        pointBackgroundColor: 'rgba(0, 0, 255, 0.4)',
        pointBorderColor: 'rgba(0, 0, 255, 0.2)',
        pointBorderWidth: 12,
        pointHoverRadius: 2
      },
      {
        data: [0, 25, 50, 75, 100], // Datos para dibujar la línea (ejes X e Y)
        fill: false,
        borderColor: 'blue',
        borderWidth: 1,
        pointRadius: 0, // No mostrar puntos en la línea
        cubicInterpolationMode: 'monotone'
      }
      // {
      //   data: [promedio, promedio, promedio, promedio, promedio], // Datos para dibujar la línea (ejes X e Y)
      //   fill: false,
      //   borderColor: 'red',
      //   borderWidth: 1,
      //   pointRadius: 0, // No mostrar puntos en la línea
      //   cubicInterpolationMode: 'monotone'
      // }
    ]
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Desactiva el ajuste automático de aspecto
    aspectRatio: 0.24, // Establece la relación de aspecto (altura/ancho) del gráfico

    scales: {
      yAxes: [
        {
          beginAtZero: true,
          max: 100,
          min: 0,
          gridLines: {
            color: 'rgba(255, 255, 255, 0.5)',
            lineWidth: 1
          },
          ticks: {
            beginAtZero: true, // Comenzar en 0 en el eje y
            max: 100,
            min: 0,
            stepSize: 25,
            fontColor: 'white'
          }
        }
      ],
      xAxes: [
        {
          beginAtZero: true,
          max: 4,
          min: 0,
          stepSize: 1,
          gridLines: {
            color: 'rgba(255, 255, 255, 0.5)',
            lineWidth: 1
          },
          ticks: {
            beginAtZero: true, // Comenzar en 0 en el eje x
            max: 100,
            min: 0,
            stepSize: 1,
            fontColor: 'white' // Color de letra para el eje X
          }
        }
      ]
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          fontColor: 'white' // Color de letra para la leyenda
        }
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
        fontColor: 'white' // Color de letra para el título
      }
    },
    legend: {
      display: false // Ocultar la leyenda completa del gráfico
    }
  };

  return (
    <>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          height: '100%',
          alignItems: 'flex-end',
          borderLeft: '3px solid rgba(255, 255, 255, 0.5)',
          right: '23px'
        }}
      >
        <div
          style={{
            position: 'absolute',
            display: value === 100 ? 'none' : 'flex',
            bottom: 0,
            marginLeft: '0px',
            color: 'blue',
            height: `${value + 4}%`
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: '6px solid transparent', // 8px * 0.75
              borderBottom: '6px solid transparent', // 8px * 0.75
              borderLeft: '12.75px solid rgba(205,113,193)', // 17px * 0.75
              marginRight: '22.5px' // 18px * 0.75
            }}
          ></div>
          {value == promedio ? value : null}
        </div>
      </div>
      <div className={styles.evaluationsGraph}>
        <Line data={chartData} options={options} />
      </div>
    </>
  );
};

export default CustomGraph;
