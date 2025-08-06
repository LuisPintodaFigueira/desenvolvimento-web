let filtroAtual = "todas"
let tarefas = []

function adicionarTarefa() {
  let inputTarefa = document.getElementById("entradaTarefa")
  let tarefa = inputTarefa.value.trim()

  if (tarefa !== "") {
    tarefas.push({ texto: tarefa, concluida: false })
    inputTarefa.value = ""
    atualizarLista()
  }
}

function atualizarLista() {
  let listaTarefas = document.getElementById("listaTarefas")
  listaTarefas.innerHTML = ""

  let tarefasFiltradas = tarefas.filter(function (tarefa) {
    if (filtroAtual === "pendentes") return !tarefa.concluida
    if (filtroAtual === "concluidas") return tarefa.concluida
    return true
  })

  tarefasFiltradas.forEach(function (tarefa, index) {
    let item = document.createElement("li")
    item.className = "list-group-item d-flex justify-content-between align-items-center"

    let containerEsquerda = document.createElement("div")
    containerEsquerda.className = "d-flex align-items-center gap-2"

    let checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = tarefa.concluida
    checkbox.onclick = function () {
      tarefas[index].concluida = !tarefas[index].concluida
      atualizarLista()
    }

    let texto = document.createElement("span")
    texto.textContent = tarefa.texto
    if (tarefa.concluida) {
      texto.style.textDecoration = "line-through"
      texto.style.color = "gray"
    }

    containerEsquerda.appendChild(checkbox)
    containerEsquerda.appendChild(texto)

    let containerDireita = document.createElement("div")
    containerDireita.className = "d-flex gap-2"

    let botaoEditar = document.createElement("button")
    botaoEditar.textContent = "✏️"
    botaoEditar.className = "btn btn-sm btn-outline-secondary"
    botaoEditar.onclick = function () {
      let novoTexto = prompt("Editar tarefa:", tarefa.texto)
      if (novoTexto !== null) {
        tarefas[index].texto = novoTexto.trim()
        atualizarLista()
      }
    }

    let botaoExcluir = document.createElement("button")
    botaoExcluir.textContent = "✖"
    botaoExcluir.className = "btn btn-sm btn-outline-danger"
    botaoExcluir.onclick = function () {
      tarefas.splice(index, 1)
      atualizarLista()
    }

    containerDireita.appendChild(botaoEditar)
    containerDireita.appendChild(botaoExcluir)

    item.appendChild(containerEsquerda)
    item.appendChild(containerDireita)
    listaTarefas.appendChild(item)
  })

  atualizarFiltroVisual()
}

function limparConcluidas() {
  tarefas = tarefas.filter(function (tarefa) {
    return !tarefa.concluida
  })
  atualizarLista()
}

function atualizarFiltroVisual() {
  let botoes = document.querySelectorAll(".filtros button")
  botoes.forEach(function (botao) {
    botao.classList.remove("active")
  })

  if (filtroAtual === "todas") botoes[0].classList.add("active")
  if (filtroAtual === "pendentes") botoes[1].classList.add("active")
  if (filtroAtual === "concluidas") botoes[2].classList.add("active")
}
