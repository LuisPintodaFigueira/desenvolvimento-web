// vetor para armazenar as tarefas
let tarefas = [];

// Variável para controlar o filtro atual
let filtroAtual = 'todas';

// Carrega as tarefas do LocalStorage ao iniciar
function carregarTarefas() {
  const tarefasSalvas = localStorage.getItem('tarefas');
  if (tarefasSalvas) {
    tarefas = JSON.parse(tarefasSalvas);
  }
}

// Salva as tarefas no LocalStorage
function salvarTarefas() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Atualiza a lista no HTML de acordo com o filtro e o status das tarefas
function atualizarLista() {
  const lista = document.getElementById('listaTarefas');
  lista.innerHTML = '';

  // Atualiza o estado dos botões de filtro
  document.querySelectorAll('.btn-group.filtros button').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase() === filtroAtual);
  });

  // Filtra tarefas conforme filtroAtual
  const tarefasFiltradas = tarefas.filter(tarefa => {
    if (filtroAtual === 'todas') return true;
    if (filtroAtual === 'pendentes') return tarefa.status === 'pendente';
    if (filtroAtual === 'concluidas') return tarefa.status === 'concluida';
  });

  // Cria os elementos li para cada tarefa filtrada
  tarefasFiltradas.forEach((tarefa, index) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

    // Aplica a classe para cor de fundo opaco conforme status
    if (tarefa.status === 'concluida') {
      li.classList.add('tarefa-concluida');
    } else {
      li.classList.add('tarefa-pendente');
    }

    // Texto da tarefa
    li.textContent = tarefa.nome;

    // Botão para alternar status da tarefa
    const btnToggle = document.createElement('button');
    btnToggle.classList.add('btn', 'btn-sm', tarefa.status === 'concluida' ? 'btn-warning' : 'btn-success');
    btnToggle.textContent = tarefa.status === 'concluida' ? 'Voltar' : 'Concluir';

    btnToggle.onclick = () => {
      const idx = tarefas.indexOf(tarefa);
      tarefas[idx].status = tarefas[idx].status === 'concluida' ? 'pendente' : 'concluida';
      salvarTarefas();
      atualizarLista();
    };

    li.appendChild(btnToggle);
    lista.appendChild(li);
  });
}

// Adiciona uma nova tarefa
function adicionarTarefa() {
  const input = document.getElementById('entradaTarefa');
  const nomeTarefa = input.value.trim();

  if (nomeTarefa === '') return alert('Digite o nome da tarefa!');

  // Cria tarefa pendente por padrão
  tarefas.push({
    nome: nomeTarefa,
    status: 'pendente'
  });

  salvarTarefas();
  atualizarLista();

  input.value = '';
  input.focus();
}

// Limpa as tarefas concluídas
function limparConcluidas() {
  tarefas = tarefas.filter(tarefa => tarefa.status !== 'concluida');
  salvarTarefas();
  atualizarLista();
}

// Define o filtro e atualiza a lista
function setFiltro(filtro) {
  filtroAtual = filtro;
  atualizarLista();
}

// Inicializa o site
function iniciar() {
  carregarTarefas();
  atualizarLista();

  // Inicializa o sortable para ordenar tarefas
  Sortable.create(document.getElementById('listaTarefas'), {
    animation: 150,
    onEnd: function(evt) {
      // Atualiza a ordem no array tarefas
      const [moved] = tarefas.splice(evt.oldIndex, 1);
      tarefas.splice(evt.newIndex, 0, moved);
      salvarTarefas();
      atualizarLista();
    }
  });
}

// Chama iniciar quando a página carrega
window.onload = iniciar;
