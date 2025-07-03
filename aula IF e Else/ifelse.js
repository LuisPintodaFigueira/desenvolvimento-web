function calcularMedia() {

    //criar as refencias com os elemntos da página
    let inNome = document.getElementById("inNome");
    let inNota1 = document.getElementById("inNota1");
    let inNota2 = document.getElementById("inNota2");
    let outSitucao = document.getElementById("outSituacao");
    let outMedia = document.getElementById("outMedia");

    //obter valres dos inputs
    const nome = inNome.Value;
    const nota1 = number (inNota1.value);
    const nota2 = number (inNota2.value);
    getElementById("resultado").addEventListener("click", calcularMedia)

    //calcular a média
    let resultado = (nota1 + nota2) / 2;

    outMedia.textContent = "Média das notas : " + media;

    //criar as condições

    if(media >= 7) {
        outSitucao.textContent = "Parabéns " + nome + "! você foi aprovado(a)";
        outSitucao.style.color = "green";
    } else if (media >= 4 ) {
        outSitucao.textContent = "Atenção " + nome + "! você foi para exame";
        outSitucao.style.color = "yellow";
    } else {
        outSitucao.textContent = "Ops " + nome + "! você foi reprovado(a)";
        outSitucao.style.color = "red";
    }

}
document.getElementById("resultado").addEventListener("click", calculaMedia);
