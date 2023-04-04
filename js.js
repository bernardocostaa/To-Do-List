// Date consts
const dia = document.querySelector("[data-dia]");
const mes = document.querySelector("[data-mes]");
const ano = document.querySelector("[data-ano]");
const numeroDia = document.querySelector("[data-numero]");

const btn = document.querySelector("[data-btn]");
const btnSave = document.querySelector("[data-salvar]");
const modal = document.querySelector(".modal");
const inputAdd = document.getElementById("addInput");

function dataAtual() {
  const dataAtual = new Date();
  numeroDia.innerText = dataAtual.getDate();
  ano.innerText = dataAtual.getFullYear();
  mes.innerText = dataAtual.toLocaleDateString("pt-br", { month: "long" });
  dia.innerText = dataAtual.toLocaleDateString("pt-br", { weekday: "long" });
}

dataAtual();



function getLocalStorage(){
  return  JSON.parse(localStorage.getItem('bd_task')) ?? [] // ?? se for verdade faz o outro
}
function setLocalStorage(bdTask){
  return  localStorage.setItem('bd_task',JSON.stringify(bdTask))
}

