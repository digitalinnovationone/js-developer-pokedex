const botaoAlterarTema = document.getElementById("botao-alterar-tema");
const body = document.querySelector("body");
const imagemBotaoTrocaDeTema = document.querySelector(".imagem-botao");


botaoAlterarTema.addEventListener("click", () => {
    const modoEscuroEstaAtivo = body.classList.contains("modo-escuro");

    body.classList.toggle("modo-escuro");

    if (modoEscuroEstaAtivo) {

        imagemBotaoTrocaDeTema.setAttribute("src", "./assets/img/sun.png");
    } else {

        imagemBotaoTrocaDeTema.setAttribute("src", "./assets/img/moon.png");

    }

});