let inputTarefa = document.querySelector('.input-tarefa')
let btnTarefa = document.querySelector('.btn-tarefa')
let tarefa = document.querySelector('.tarefas')
let retorno = document.querySelector('.retorno')

if(localStorage.key(0) != null) adicionaTarefaSalva()

inputTarefa.addEventListener('keypress',(e) => {
  if(!inputTarefa.value) return
  let vinput = inputTarefa.value 
  if(e.keyCode === 13) criaTarefa(vinput)
})

document.addEventListener('keypress', (e) =>{
  if(e.ctrlKey || e.metaKey && e.key === 'z') desfazer()
})

btnTarefa.addEventListener('click', () => {
  if(!inputTarefa.value) return
  let vinput = inputTarefa.value 
  criaTarefa(vinput)
})

retorno.addEventListener('click', () => {
  try {
    if(localStorage.key(0) !== null ){
      desfazer()
      return
    } 
  } catch (error) {
  }
})

function desfazer(){
  //remove el
  const tarefasList = document.querySelectorAll('li.tarefa')
  const itemRemover = tarefasList[tarefasList.length  - 1]
  itemRemover.remove()

  //remove do localstorage
  const  tarefasSalvas = JSON.parse(localStorage.getItem('tarefas'))
  tarefasSalvas.splice(-1, 1)
  salvarTarefas()  
}

function limpaInput(){
  inputTarefa.value = ''
  inputTarefa.focus()
}

function criaBtnApagar(li){
  li.innerHTML += ' '
  const btnApagar = document.createElement('button')
  li.appendChild(btnApagar)
  btnApagar.innerText = 'Apagar'
  btnApagar.classList.add('btnapaga')
}

function criaTarefa(vl){
    let elementoLi = document.createElement('li')
    let liText = document.createTextNode(vl)
    elementoLi.appendChild(liText)
    elementoLi.classList.add('tarefa')
    tarefa.appendChild(elementoLi)
    criaBtnApagar(elementoLi)
    limpaInput()
    salvarTarefas()
}

document.addEventListener('click', (e) => {
  let el = e.target
  if(el.classList.contains('btnapaga')){
    el.parentElement.remove()
    salvarTarefas()
  }
})

function salvarTarefas(){
  let lis = tarefa.querySelectorAll('li')
  let textLiList = []
  for(let tarefas of lis){
    let textTarefa = tarefas.innerText
    textTarefa = textTarefa.replace('Apagar',' ').trim() //remove os espaços
    textLiList.push(textTarefa)
  }
  const tarefasJson = JSON.stringify(textLiList)
  localStorage.setItem('tarefas', tarefasJson)
  
}

function adicionaTarefaSalva(){
  const tarefas = localStorage.getItem('tarefas')
  const listaTarefa = JSON.parse(tarefas)

  for(let tarefa of listaTarefa){
    criaTarefa(tarefa)
  }
}
