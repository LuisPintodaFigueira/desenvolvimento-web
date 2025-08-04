// Espera o HTML carregar
document.addEventListener("DOMContentLoaded", function() {

    // Seleciona elementos da página
    const botaoAdicionar = document.querySelector("button"); // botão
    const entradaTarefa = document.getElementById("entradaTarefa"); // input
    const listaTarefas = document.getElementById("listaTarefas"); // lista

    // Ao clicar no botão...
    botaoAdicionar.addEventListener("click", function() {
        const tarefaTexto = entradaTarefa.value.trim(); // pega texto

        if (tarefaTexto !== "") { // se não for vazio
            const li = document.createElement("li"); // cria item
            li.textContent = tarefaTexto; // adiciona texto

            const btnRemover = document.createElement("button"); // botão de remover
            btnRemover.textContent = "remover";

            // Remove o item ao clicar
            btnRemover.addEventListener("click", function() {
                listaTarefas.removeChild(li);
            });

            li.appendChild(btnRemover); // coloca botão no item
            listaTarefas.appendChild(li); // adiciona item à lista
            entradaTarefa.value = ""; // limpa input

        } else {
            alert("Insira uma tarefa válida."); // aviso se vazio
        }
    });
});
