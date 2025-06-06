const dias = [1,2,3,4,5,6,7,8,9,10];
const niveis = [0.8, 1.1, 1.4, 1.7, 2.0, 2.3, 2.6, 2.8, 2.9, 3.0];
function polinomio(d) {
  return 0.025*d*d + 0.45*d + 0.3;
}
const niveis_graf = dias.map(polinomio);

// Identificar pontos de risco
const risco = niveis.map(n => n > 2 ? n : null);

// Preencher tabela de dados
const tabela = document.getElementById('tabela-dados');
for(let i=0;i<dias.length;i++){
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${dias[i]}</td>
    <td>${niveis[i].toFixed(2)}</td>
    <td>${niveis_graf[i].toFixed(2)}</td>
    <td>${niveis[i]>2 ? "<span class='risco'>Sim</span>" : "Não"}</td>
  `;
  tabela.appendChild(tr);
}

// Gráfico Chart.js
const ctx = document.getElementById('graficoRio').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: dias.map(d => "Dia " + d),
    datasets: [
      {
        label: 'Dado Real',
        data: niveis,
        borderColor: 'blue',
        backgroundColor: 'blue',
        pointRadius: 5,
        pointBackgroundColor: niveis.map(n => n > 2 ? 'red' : 'blue'),
        fill: false,
        tension: 0.2
      },
      {
        label: 'Modelo Polinomial',
        data: niveis_graf,
        borderColor: 'green',
        backgroundColor: 'green',
        pointRadius: 4,
        pointStyle: 'rect',
        fill: false,
        borderDash: [5,5],
        tension: 0.2
      },
      {
        label: 'Risco de Enchente (>2m)',
        data: risco,
        borderColor: 'rgba(0,0,0,0)',
        backgroundColor: 'red',
        pointRadius: 7,
        pointStyle: 'triangle',
        showLine: false
      }
    ]
  },
  options: {
    scales: {
      y: {
        title: { display: true, text: 'Nível do Rio (m)' },
        min: 0,
        max: 3.2,
        grid: { color: '#ddd' }
      },
      x: {
        title: { display: true, text: 'Dias' }
      }
    },
    plugins: {
      legend: { position: 'top' },
      annotation: {
        annotations: {
          linhaRisco: {
            type: 'line',
            yMin: 2,
            yMax: 2,
            borderColor: 'red',
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              content: 'Limite de risco (2m)',
              enabled: true,
              position: 'end',
              color: 'red',
              font: {
                weight: 'bold'
              }
            }
          }
        }
      }
    }
  }
});