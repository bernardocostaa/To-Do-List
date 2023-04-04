function deleteTask(index){
  const bdDados = readTask()
  bdDados.splice(index,1)
  setLocalStorage(bdDados)
}

function readTask(){
  return getLocalStorage()
}

function updateTask(item,index){
  const bdDados = readTask()
  bdDados[index] = item
  setLocalStorage(bdDados)
}

function criarBdTask(item){
  const bdTask = getLocalStorage()
  bdTask.push(item)
  setLocalStorage(bdTask)
}


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

btn.addEventListener("click", openModal);
btnSave.addEventListener("click", (e) => {
  e.preventDefault();
  saveDados()
});

function saveDados(){
  if (inputAdd.value == "") {
    inputAdd.classList.add("ativo");
    return;
  }
  const dados = {
    msg:inputAdd.value
  }
  inputAdd.value = ''
  inputAdd.classList.remove('ativo')
  const index = document.querySelector('#addInput').dataset.index
  if(index == 'new'){
    updateTable()
    criarBdTask(dados)
  }else{
    updateTask(index,cli)
  }
}

function addTask(texto, index) {
  const newTask = document.createElement("li");
  const list = document.querySelector(".list-task");
  newTask.innerHTML = `<li class="li-lista">
  <div class="item-list">
  <p>${texto.msg}</p>
  <div class="controles">
  <button><img src="img/editar.svg" data-controle="editar-${index}" alt=""></button >
  <button><img src="img/excluir.svg" data-controle="exluir-${index}" alt=""></button >
  <button><img src="img/finalizar.svg" data-controle="finaliza-${index}" alt=""></button >
  </div>
  </div>
  </li>`;
  list.append(newTask);
  modal.classList.remove("ativo");
}

function editarDados(index){
  const cliente = readTask()[index]
  valorFill(cliente)
  openModal()
}

function valorFill(cliente){
  document.getElementById("addInput").value = cliente.msg
  document.querySelector('#addInput').dataset.index = cliente.index
}

function editarDeletar(e){
 const [action, index] = e.target.dataset.controle.split('-')
 if(action == 'editar'){
  editarDados(index)
 }else if(action === 'exluir'){
  console.log('excluindp');
 }else{
  console.log('finalizado');
 }
}
function clearTable(){
  const linhas = document.querySelectorAll('.list-task li')
  linhas.forEach((item)=>{
    item.parentElement.removeChild(item)
  })
}

function updateTable(){
  const bdDados = readTask()
  clearTable()
  bdDados.forEach(addTask)
  
}

updateTable()

document.querySelectorAll('.controles').forEach((item)=>{
  item.addEventListener('click',editarDeletar)
})