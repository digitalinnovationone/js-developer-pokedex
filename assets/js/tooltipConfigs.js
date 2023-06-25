window.onload = function () { tooltip() }

function tooltip() {
    // Inicializar tooltip
    tippy(document.querySelectorAll('.tooltip'), {
        content: 'Clique para exibir os detalhes!',
        animation: 'shift-away-extreme',
    });
}
  // More options and info in: https://atomiks.github.io/tippyjs/v6/getting-started/
