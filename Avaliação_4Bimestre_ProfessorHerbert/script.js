let transacoes = [];

let editando = false;

document.getElementById("formTransacao").addEventListener("submit", (e) => {
    e.preventDefault();
    if (editando) {
        salvarEdicao();
    } else {
        adicionarTransacao();
    }
});

function adicionarTransacao() {
    const descricao = document.getElementById("descricao").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const tipo = document.getElementById("tipo").value;
    const data = document.getElementById("data").value;
    const novaTransacao = {
        id: transacoes.length ? transacoes[transacoes.length - 1].id + 1 : 1,
        descricao,
        valor,
        tipo,
        data
    };
    transacoes.push(novaTransacao);
    renderizarTabela();
    document.getElementById("formTransacao").reset();
    fetch('https://api.exemplo.com/transacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaTransacao)
    })
    .then(response => response.json())
    .then(data => console.log('Transação adicionada:', data))
    .catch(error => console.error('Erro na chamada da API:', error));
}

function renderizarTabela() {
    const tabela = document.getElementById("tabelaTransacoes");
    tabela.innerHTML = "";
    transacoes.forEach((t) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${t.id}</td>
            <td>${t.descricao}</td>
            <td>R$ ${t.valor.toFixed(2)}</td>
            <td>${t.tipo}</td>
            <td>${t.data}</td>
            <td>
                <button onclick="editarTransacao(${t.id})">Editar</button>
                <button onclick="deletarTransacao(${t.id})">Excluir</button>
            </td>
        `;
        tabela.appendChild(tr);
    });
    fetch('https://api.exemplo.com/transacoes')
        .then(response => response.json())
        .then(data => console.log('Transações carregadas:', data))
        .catch(error => console.error('Erro na chamada da API:', error));
}

function editarTransacao(id) {
    const transacao = transacoes.find(t => t.id === id);
    if (!transacao) return;
    document.getElementById("idTransacao").value = transacao.id;
    document.getElementById("descricao").value = transacao.descricao;
    document.getElementById("valor").value = transacao.valor;
    document.getElementById("tipo").value = transacao.tipo;
    document.getElementById("data").value = transacao.data;
    document.getElementById("btnSalvar").textContent = "Salvar Edição";
    editando = true;
}

function salvarEdicao() {
    const id = parseInt(document.getElementById("idTransacao").value);
    const transacao = transacoes.find(t => t.id === id);
    transacao.descricao = document.getElementById("descricao").value;
    transacao.valor = parseFloat(document.getElementById("valor").value);
    transacao.tipo = document.getElementById("tipo").value;
    transacao.data = document.getElementById("data").value;
    renderizarTabela();
    document.getElementById("formTransacao").reset();
    document.getElementById("btnSalvar").textContent = "Adicionar Transação";
    editando = false;
    fetch(`https://api.exemplo.com/transacoes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transacao)
    })
    .then(response => response.json())
    .then(data => console.log('Transação atualizada:', data))
    .catch(error => console.error('Erro na chamada da API:', error));
}

function deletarTransacao(id) {
    if (!confirm("Deseja realmente excluir esta transação?")) return;
    transacoes = transacoes.filter(t => t.id !== id);
    renderizarTabela();
    fetch(`https://api.exemplo.com/transacoes/${id}`, {
        method: 'DELETE'
    })
    .then(response => console.log('Transação removida com sucesso'))
    .catch(error => console.error('Erro na chamada da API:', error));
}

renderizarTabela();