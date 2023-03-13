const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefa = document.querySelector('.tarefas')
const retorno = document.querySelector('.retorno')


class Lista{
  acaoApaga(e){
    let el = e.target
    if(el.classList.contains('btnapaga')){
      el.parentElement.remove()
      this.salvarTarefas()
    }
  }
  desfazer(){
    //remove el
    const tarefasList = document.querySelectorAll('li.tarefa')
    const itemRemover = tarefasList[tarefasList.length  - 1]
    itemRemover.remove()
  
    //remove do localstorage
    const  tarefasSalvas = JSON.parse(localStorage.getItem('tarefas'))
    tarefasSalvas.splice(-1, 1)
    this.salvarTarefas()  
  }

  limpaInput(){
    inputTarefa.value = ''
    inputTarefa.focus()
  }

  criaBtnApagar(li){
    li.innerHTML += ' '
    const btnApagar = document.createElement('button')
    li.appendChild(btnApagar)
    btnApagar.innerText = 'Apagar'
    btnApagar.classList.add('btnapaga')
  }

  criaTarefa(vl){
    let elementoLi = document.createElement('li')
    let liText = document.createTextNode(vl)
    elementoLi.appendChild(liText)
    elementoLi.classList.add('tarefa')
    tarefa.appendChild(elementoLi)
    this.criaBtnApagar(elementoLi)
    this.limpaInput()
    this.salvarTarefas()
  }

  salvarTarefas(){
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
  
  adicionaTarefaSalva(){
    const tarefas = localStorage.getItem('tarefas')
    const listaTarefa = JSON.parse(tarefas)
  
    for(let tarefa of listaTarefa){
      this.criaTarefa(tarefa)
    }
  }
  
  enter(e){
    if(!inputTarefa.value) return
    if(e.keyCode === 13) this.criaTarefa(inputTarefa.value )
  }

  ctrlz(e){
    if(e.ctrlKey || e.metaKey && e.key === 'z') this.desfazer()
  }

  chamaTarefa(e){
    if(!inputTarefa.value) return
    let vinput = inputTarefa.value 
    this.criaTarefa(vinput)
  }

  retorno(e){
    try {
      if(localStorage.key(0) !== null ){
        this.desfazer()
        return
      } 
    } catch (error){
      alert('Não ha itens para excluir')
    }
  }
}
const lista = new Lista()
if(localStorage.key(0) != null) lista.adicionaTarefaSalva()


inputTarefa.addEventListener('keypress', e => lista.enter(e))
document.addEventListener('keypress', e => lista.ctrlz(e))
btnTarefa.addEventListener('click', e => lista.chamaTarefa(e))
retorno.addEventListener('click', e => lista.retorno(e))
document.addEventListener('click', e => lista.acaoApaga(e))
