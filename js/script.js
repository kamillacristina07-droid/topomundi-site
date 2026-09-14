// =====================================================
// TOPOMUNDI TOPOGRAFIA LTDA
// JavaScript principal
// =====================================================


// =====================================================
// MENU MOBILE
// =====================================================

const menuMobile =
    document.getElementById("menuMobile");

const menuPrincipal =
    document.getElementById("menuPrincipal");


if (menuMobile && menuPrincipal) {

    menuMobile.addEventListener(
        "click",
        function () {

            menuPrincipal.classList.toggle("ativo");

            const menuAberto =
                menuPrincipal.classList.contains("ativo");

            menuMobile.setAttribute(
                "aria-expanded",
                menuAberto
            );

            menuMobile.textContent =
                menuAberto ? "✕" : "☰";
        }
    );


    const linksMenu =
        document.querySelectorAll(
            ".menu-principal a"
        );


    linksMenu.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    menuPrincipal.classList.remove(
                        "ativo"
                    );

                    menuMobile.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuMobile.textContent = "☰";
                }
            );

        }
    );
}


// =====================================================
// CALCULADORA DE ÁREA
// =====================================================

const listaPontos =
    document.getElementById("listaPontos");

const botaoAdicionar =
    document.getElementById("adicionarPonto");

const botaoCalcular =
    document.getElementById("calcularArea");

const resultadoM2 =
    document.getElementById("resultadoM2");

const resultadoHa =
    document.getElementById("resultadoHa");

const resultadoPerimetro =
    document.getElementById(
        "resultadoPerimetro"
    );

const mensagemCalculadora =
    document.getElementById(
        "mensagemCalculadora"
    );


// =====================================================
// ATUALIZA NUMERAÇÃO DOS PONTOS
// =====================================================

function atualizarNumeracao() {

    const linhas =
        document.querySelectorAll(
            ".linha-coordenada"
        );


    linhas.forEach(
        function (linha, indice) {

            const numero =
                linha.querySelector(
                    ".numero-ponto"
                );

            numero.textContent =
                "P" + (indice + 1);

        }
    );
}


// =====================================================
// ADICIONA NOVO PONTO
// =====================================================

function adicionarPonto() {

    const linha =
        document.createElement("div");

    linha.className =
        "linha-coordenada";


    linha.innerHTML = `

        <span class="numero-ponto"></span>

        <input
            type="number"
            step="any"
            class="coordenada-e"
            placeholder="Coordenada E"
        >

        <input
            type="number"
            step="any"
            class="coordenada-n"
            placeholder="Coordenada N"
        >

        <button
            type="button"
            class="botao-remover"
            aria-label="Remover ponto"
        >
            ×
        </button>

    `;


    listaPontos.appendChild(linha);

    atualizarNumeracao();
}


// =====================================================
// REMOVE PONTO
// =====================================================

listaPontos.addEventListener(
    "click",
    function (evento) {

        if (
            evento.target.classList.contains(
                "botao-remover"
            )
        ) {

            const linhas =
                document.querySelectorAll(
                    ".linha-coordenada"
                );


            if (linhas.length <= 3) {

                mensagemCalculadora.textContent =
                    "É necessário manter pelo menos três pontos.";

                return;
            }


            evento.target
                .closest(".linha-coordenada")
                .remove();


            atualizarNumeracao();


            mensagemCalculadora.textContent =
                "";
        }

    }
);


// =====================================================
// FORMATAÇÃO NUMÉRICA
// =====================================================

function formatarNumero(
    valor,
    casas = 2
) {

    return valor.toLocaleString(
        "pt-BR",
        {
            minimumFractionDigits: casas,
            maximumFractionDigits: casas
        }
    );
}


// =====================================================
// CALCULAR ÁREA E PERÍMETRO
// =====================================================

function calcularArea() {

    mensagemCalculadora.textContent =
        "";


    const linhas =
        document.querySelectorAll(
            ".linha-coordenada"
        );


    const pontos = [];


    for (const linha of linhas) {

        const campoE =
            linha.querySelector(
                ".coordenada-e"
            );

        const campoN =
            linha.querySelector(
                ".coordenada-n"
            );


        const e =
            parseFloat(campoE.value);

        const n =
            parseFloat(campoN.value);


        if (
            Number.isNaN(e) ||
            Number.isNaN(n)
        ) {

            mensagemCalculadora.textContent =
                "Preencha todas as coordenadas antes de calcular.";

            return;
        }


        pontos.push({
            x: e,
            y: n
        });
    }


    if (pontos.length < 3) {

        mensagemCalculadora.textContent =
            "Informe pelo menos três pontos.";

        return;
    }


    let somaArea = 0;

    let perimetro = 0;


    for (
        let i = 0;
        i < pontos.length;
        i++
    ) {

        const atual =
            pontos[i];

        const proximo =
            pontos[
                (i + 1) %
                pontos.length
            ];


        somaArea +=
            atual.x * proximo.y -
            proximo.x * atual.y;


        const deltaX =
            proximo.x - atual.x;

        const deltaY =
            proximo.y - atual.y;


        perimetro +=
            Math.sqrt(
                deltaX * deltaX +
                deltaY * deltaY
            );
    }


    const areaM2 =
        Math.abs(somaArea) / 2;

    const areaHa =
        areaM2 / 10000;


    resultadoM2.textContent =
        formatarNumero(areaM2);

    resultadoHa.textContent =
        formatarNumero(areaHa, 4);

    resultadoPerimetro.textContent =
        formatarNumero(perimetro);


    mensagemCalculadora.textContent =
        "Cálculo realizado com sucesso.";
}


// =====================================================
// EVENTOS
// =====================================================

if (botaoAdicionar) {

    botaoAdicionar.addEventListener(
        "click",
        adicionarPonto
    );
}


if (botaoCalcular) {

    botaoCalcular.addEventListener(
        "click",
        calcularArea
    );
}
