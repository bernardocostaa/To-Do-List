// Date consts
const dia = document.querySelector("[data-dia]");
const mes = document.querySelector("[data-mes]");
const ano = document.querySelector("[data-ano]");
const numeroDia = document.querySelector("[data-numero]");

const btn = document.querySelector("[data-btn]");
const btnSave = document.querySelector("[data-salvar]");
const modal = document.querySelector(".modal");
const inputAdd = document.getElementById("addInput");

let editarTask;

let statusTask = {
  msg: "",
  finaliza: false,
};

function dataAtual() {
  const dataAtual = new Date();
  numeroDia.innerText = dataAtual.getDate();
  ano.innerText = dataAtual.getFullYear();
  mes.innerText = dataAtual.toLocaleDateString("pt-br", { month: "long" });
  dia.innerText = dataAtual.toLocaleDateString("pt-br", { weekday: "long" });
}

dataAtual();

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("bd_task")) ?? []; // ?? se for verdade faz o outro
}
function setLocalStorage(bdTask) {
  return localStorage.setItem("bd_task", JSON.stringify(bdTask));
}

function deleteTask(index) {
  const dadosTask = getLocalStorage();
  dadosTask.splice(index, 1);
  setLocalStorage(dadosTask);
}

function updateList(index, list) {
  const dadosTask = readList();
  list.msg = inputAdd.value;
  if (editarTask) {
    editarTask.closest(".li-lista").getElementsByTagName("p")[0].innerHTML = inputAdd.value;
  }
  dadosTask[index] = list;
  setLocalStorage(dadosTask);
}

function readList() {
  return getLocalStorage();
}

function creatList(listTask) {
  const criarDados = getLocalStorage();
  criarDados.push(listTask);
  setLocalStorage(criarDados);
}

function saveDados() {
  if (modal.hasAttribute("action") && modal.getAttribute("action") == "editar") {
    updateList(modal.getAttribute("index"), statusTask);
    modal.removeAttribute("action");
    modal.removeAttribute("texto");
    modal.removeAttribute("index");
    modal.classList.remove("ativo");
    updateTabela()
    return;
  }
  if (inputAdd.value == "") {
    inputAdd.classList.add("ativo");
    return;
  }
  statusTask = {
    msg: inputAdd.value,
    finaliza: false,
  };

  creatList(statusTask);
  updateTabela();
}

function addTask(texto, index) {
  const newTask = document.createElement("li");
  const list = document.querySelector(".list-task");
  newTask.innerHTML = `<li data-status="${texto.finaliza}" class="li-lista">
  <div class="item-list">
  <p>${texto.msg}</p>
  <div class="controles">
  <button><img src="img/editar.svg" alt="" data-controle="editar-${index}"></button >
  <button><img src="img/excluir.svg" alt="" data-controle="exluir-${index}"></button >
  <button><img src="img/finalizar.svg" alt="" data-controle="finaliza-${index}"></button >
  </div>
  </div>
  </li>`;
  list.append(newTask);
  modal.classList.remove("ativo");
}

function clearTable() {
  const linhas = document.querySelectorAll(".list-task li");
  linhas.forEach((item) => {
    item.parentElement.removeChild(item);
  });
}

function updateTabela() {
  const dadosTask = readList();
  clearTable();
  dadosTask.forEach(addTask);
  const controles = document.querySelectorAll(".controles");
  controles.forEach((btn) => {
    btn.addEventListener("click", btnAcation);
  });
  const finaliza = document.querySelectorAll(".li-lista");
  finaliza.forEach((item) => {
    const btnEditi = item.querySelector("[data-controle]");
    const valdarTrue = item.dataset.status == "true";
    console.log(valdarTrue,item.dataset.status,item);
    if (valdarTrue) {
      item.classList.add("finalizado");
      btnEditi.remove()
    }
  });
}

function openModal(action, index, textoTaskB) {
  if (action == "editar") {
    modal.setAttribute("action", action);
    modal.setAttribute("index", index);
    modal.setAttribute("texto", textoTaskB);
    inputAdd.value = textoTaskB;
  } else {
    inputAdd.value = "";
  }
  modal.classList.add("ativo");
  outsideClick(() => {
    modal.classList.remove("ativo");
    modal.removeAttribute("action", action);
    modal.removeAttribute("index", index);
    modal.removeAttribute("texto", textoTaskB);
  });
  inputAdd.classList.remove("ativo");
}

function outsideClick(callback) {
  const html = document.documentElement;
  html.addEventListener("click", handleClick);
  function handleClick(event) {
    if (event.target.classList[0] == "modal") {
      html.removeEventListener("click", handleClick);
      callback();
    }
  }
}
function taskFinalizada(e, index, finaliza) {
  const currentTask = e.currentTarget.closest(".li-lista");
  const btnEditi = currentTask.querySelector(`[data-controle="editar-${index}"]`);
  const textoMsg = currentTask.querySelector("p").innerText;
  currentTask.setAttribute("data-status", finaliza);
  statusTask = {
    msg: textoMsg,
    finaliza:finaliza,
  };
  console.log('Barril',statusTask,index,finaliza);
  updateList(index, statusTask);
  console.log('barril2',statusTask);
  if (currentTask.getAttribute("data-status") == "true") {
    currentTask.classList.add("finalizado");
    if(btnEditi){
      btnEditi.remove();
    }
  }
  statusTask = {
    msg: null,
    finaliza:false,
  };
}

function btnAcation(e) {
  const [action, index] = e.target.dataset.controle.split("-");
  if (action == "exluir") {
    deleteTask(index);
    updateTabela();
  } else if (action == "editar") {
    const textoTaskB = e.target.closest(".li-lista").getElementsByTagName("p")[0].innerHTML;
    openModal(action, index, textoTaskB);
  } else {
    taskFinalizada(e, index,true);
  }
}

updateTabela();

btn.addEventListener("click", openModal);

btnSave.addEventListener("click", (e) => {
  e.preventDefault();
  saveDados();
});
