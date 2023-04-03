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

function openModal() {
  modal.classList.add("ativo");
  outsideClick(() => {
    modal.classList.remove("ativo");
    inputAdd.value = ''
    inputAdd.classList.remove('ativo')
  });
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

function loadItens() {
  addTask();
}

btn.addEventListener("click", openModal);
btnSave.addEventListener("click", (e) => {
  e.preventDefault();
  loadItens();
});

function addTask() {
  const newTask = document.createElement("li");
  const list = document.querySelector(".list-task");
  if (inputAdd.value == "") {
    inputAdd.classList.add("ativo");
    return;
  }
  newTask.innerHTML = `<li class="li-lista">
  <div class="item-list">
  <p>${inputAdd.value}</p>
  <div>
  <a href=""><img src="img/editar.svg" data-edit="1" alt=""></a>
  <a href=""><img src="img/excluir.svg" data-exclu="1" alt=""></a>
  <a href=""><img src="img/finalizar.svg" data-fina="1" alt=""></a>
  </div>
  </div>
  </li>`;
  list.append(newTask);
  modal.classList.remove("ativo");
  inputAdd.value = ''
  inputAdd.classList.remove('ativo')
}
