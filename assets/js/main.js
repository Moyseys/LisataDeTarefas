let inputTarefa = document.querySelector('.input-tarefa')
let btnTarefa = document.querySelector('.btn-tarefa')
let tarefa = document.querySelector('.tarefas')

if(localStorage.key(0) != null) adicionaTarefaSalva()

inputTarefa.addEventListener('keypress',(e) => {
  if(!inputTarefa.value) return
  let vinput = inputTarefa.value 
  if(e.keyCode === 13) criaTarefa(vinput)
})

btnTarefa.addEventListener('click', () => {
  if(!inputTarefa.value) return
  let vinput = inputTarefa.value 
  criaTarefa(vinput)
})


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
