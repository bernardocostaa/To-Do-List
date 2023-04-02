const dia = document.querySelector('[data-dia]')
const mes = document.querySelector('[data-mes]')
const ano = document.querySelector('[data-ano]')
const numeroDia = document.querySelector('[data-numero]')
const btn = document.querySelector('[data-btn]')

function dataAtual(){
  const dataAtual = new Date
  numeroDia.innerText = dataAtual.getDate()
  ano.innerText = dataAtual.getFullYear()
  mes.innerText = dataAtual.toLocaleDateString('pt-br',{month:"long"})
  dia.innerText = dataAtual.toLocaleDateString('pt-br',{weekday:"long"})
}  

dataAtual()


