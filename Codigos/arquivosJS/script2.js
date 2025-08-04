function adicionarTarefa() {

      // recebe o valor input do usuário.
      // let: declara uma variável que pode mudar de valor depois.
      // document: representa o documento HTML carregado na página.
      // .getElementById: método que busca um elemento pelo seu ID.
      let inputTarefa = document.getElementById("inputTarefa");
      // .value: pega o valor digitado no campo <input>.
      let tarefa = inputTarefa.value;

      // cria novo item (li) e insere na (lista ul).
      let listaTarefas = document.getElementById("listaTarefas");
      // document.createElement("li"): cria um novo elemento <li> (list item).
      let novaTarefa = document.createElement("li");
      // .textContent: define o texto visível dentro da <li>.
      novaTarefa.textContent = tarefa;
      // .appendChild(...): adiciona um novo elemento filho.
      listaTarefas.appendChild(novaTarefa);

      // imprime a mensagem de que a tarefa foi adicionada com sucesso.
      let mensagem = "Tarefa adicionada com sucesso!";
      document.getElementById("mensagem").textContent = mensagem;

      // limpa a barra de escrita.
      inputTarefa.value = "";
    }