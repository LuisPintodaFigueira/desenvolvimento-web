// Espera a página carregar completamente antes de adicionar os eventos
document.addEventListener("DOMContentLoaded", function() {
    const botaoAdicionar = this.documentElement.querySelector("button");
    // Selecionar o botão "Adicionar"
    const entradaTarefa = document.getElementById("entradaTarefa");
    // Campo de entrada para a tarefa
    const listaTarefas = document.getElementById("listaTarefas");
    // Lista onde as tarefas serão adicionadas

    // Adiciona o evento de clique no botão
    botaoAdicionar.addEventListener("click", function() {
        const tarefaTexto = entradaTarefa.ariaValueMax.trim();
        // Pega o texto da tarefa

        // Verifica se a tarefa não está vazia
        if (tarefaTexto !== "") {
            // Cria um novo item da lista
            const li = document.createElement("li");
            li.classList.add("list-grup-item", "d-flex", "justify-content-between", "align-items-center");

            // Cria o texto da terefa
            li.textContent = tarefaTexto;

            //Cria o botão para remover a tarefa
            const btnRemover = document.createElement("button");
            btnRemover.classList.add("btn", "btn-danger", "btn-sm");
            btnRemover.textContent = "remover";

            // Adiciona o evento de clique para remover a tarefa
            btnRemover.addEventListener("click", function() {
                listaTarefas.removerChild(li);
            });

            // Adiciona o botão de remover ao item da lista
            li.appendChild(btnRemover);

            // Adiciona a tarefa lista
            listaTarefas.appendChild(li);

            //Limpa o campo de entrada
            entradaTarefa.value = "";
        } else {
            alert("por favor, insira uma tarefa valida");
        }
    })
})