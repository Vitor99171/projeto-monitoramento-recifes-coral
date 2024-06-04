// src/pages/Dashboard.jsx

import React from 'react';
import '../components/Dashboard.css';
import Chart from 'react-google-charts'; // Importe a biblioteca de gráficos que preferir

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard Blue Future</h2>
      <div className="dashboard-content">
        <p>Bem-vindo ao painel de monitoramento dos recifes de coral.</p>
        <div className="charts">
          <div className="chart">
            {/* Aqui está um exemplo de gráfico de colunas */}
            <Chart
              width={'100%'}
              height={'300px'}
              chartType="ColumnChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Ano', 'Porcentagem de Cobertura de Coral'],
                ['2016', 30],
                ['2017', 40],
                ['2018', 35],
                ['2019', 45],
                ['2020', 50],
                ['2021', 55],
              ]}
              options={{
                title: 'Cobertura de Coral ao Longo dos Anos',
                hAxis: { title: 'Ano', titleTextStyle: { color: '#333' } },
                vAxis: { title: 'Porcentagem', minValue: 0 },
                chartArea: { width: '50%' },
                colors: ['#1f4c65'],
              }}
              legendToggle
            />
          </div>
          <div className="chart">
            {/* Exemplo de gráfico de pizza */}
            <Chart
              width={'100%'}
              height={'300px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Tarefa', 'Horas por Dia'],
                ['Ponto crítico', 1],
                ['Em Extinção', 3],
                ['Vuneráveis', 23],
                ['Quase em Extinção', 20],
                ['Menor preocupação', 34],
                ['Sem Dados', 19],
              ]}
              options={{
                title: 'Corais construtores pelo mundo ',
                colors: ['#ff0000', '#ffa500', '#ff9764', '#9adbad', '#008000', '#235768'],
              }}
              legendToggle
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
